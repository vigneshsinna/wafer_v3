<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Cart;
use App\Models\City;
use App\Models\Order;
use App\Models\ProductStock;
use App\Models\StorefrontPaymentAttempt;
use App\Models\User;
use App\Services\Checkout\CheckoutService;
use App\Services\Checkout\StorefrontPurchaseService;
use App\Services\Payment\RazorpayGateway;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Mockery;
use Tests\TestCase;

class V3RazorpayPurchaseTest extends TestCase
{
    public function test_captured_payment_creates_one_paid_order_and_updates_stock_once(): void
    {
        DB::beginTransaction();
        try {
            DB::table('business_settings')->where('type', 'shipping_type')->update(['value' => 'flat_rate']);
            DB::table('business_settings')->where('type', 'flat_rate_shipping_cost')->update(['value' => '30']);
            Cache::forget('business_settings');
            $user = User::create(['name' => 'Checkout Test', 'email' => 'checkout-test-'.uniqid().'@example.invalid']);
            $city = City::where('state_id', 35)->where('name', 'Erode')->firstOrFail();
            $address = new Address();
            $address->user_id = $user->id;
            $address->address = 'Test address';
            $address->country_id = 101;
            $address->state_id = 35;
            $address->city_id = $city->id;
            $address->postal_code = '638001';
            $address->phone = '9788090895';
            $address->save();
            Cart::create(['user_id' => $user->id, 'owner_id' => 1, 'product_id' => 6,
                'variation' => '', 'quantity' => 1, 'status' => 1, 'discount' => 0]);
            $stockBefore = ProductStock::where('product_id', 6)->where('variant', '')->value('qty');

            $gateway = Mockery::mock(RazorpayGateway::class);
            $gateway->shouldReceive('isAvailable')->once()->andReturn(true);
            $gateway->shouldReceive('createOrder')->once()->andReturnUsing(fn ($amount) => [
                'id' => 'order_test_'.uniqid(), 'amount' => $amount, 'currency' => 'INR',
            ]);
            $gateway->shouldReceive('publicKey')->once()->andReturn('rzp_test_public');
            $gateway->shouldReceive('verifyCheckoutSignature')->twice();
            $gateway->shouldReceive('payment')->once()->andReturnUsing(fn () => [
                'order_id' => $this->razorOrderId, 'id' => 'pay_test_123',
                'amount' => $this->amountPaise, 'currency' => 'INR', 'status' => 'captured',
            ]);
            $service = new StorefrontPurchaseService(new CheckoutService(), $gateway);
            $started = $service->start($user->id, $address->id);
            $this->razorOrderId = $started['razorpay_order_id'];
            $this->amountPaise = $started['amount'];
            $order = $service->confirm($user->id, $this->razorOrderId, 'pay_test_123', 'signed');
            $second = $service->confirm($user->id, $this->razorOrderId, 'pay_test_123', 'signed');

            $this->assertSame($order->id, $second->id);
            $this->assertSame('paid', $order->payment_status);
            $this->assertSame((float) ($this->amountPaise / 100), (float) $order->grand_total);
            $this->assertSame(1, Order::where('user_id', $user->id)->count());
            $this->assertSame(0, Cart::where('user_id', $user->id)->count());
            $this->assertSame((int) $stockBefore - 1, (int) ProductStock::where('product_id', 6)->where('variant', '')->value('qty'));

            $changedCart = Cart::create(['user_id' => $user->id, 'owner_id' => 1, 'product_id' => 6,
                'variation' => '', 'quantity' => 1, 'status' => 1, 'discount' => 0]);
            $refundingGateway = Mockery::mock(RazorpayGateway::class);
            $refundingGateway->shouldReceive('isAvailable')->once()->andReturn(true);
            $refundingGateway->shouldReceive('createOrder')->once()->andReturnUsing(fn ($amount) => [
                'id' => 'order_changed_'.uniqid(), 'amount' => $amount, 'currency' => 'INR',
            ]);
            $refundingGateway->shouldReceive('publicKey')->once()->andReturn('rzp_test_public');
            $refundingService = new StorefrontPurchaseService(new CheckoutService(), $refundingGateway);
            $changed = $refundingService->start($user->id, $address->id);
            $refundingGateway->shouldReceive('verifyCheckoutSignature')->once();
            $refundingGateway->shouldReceive('payment')->once()->andReturn([
                'order_id' => $changed['razorpay_order_id'], 'id' => 'pay_changed_123',
                'amount' => $changed['amount'], 'currency' => 'INR', 'status' => 'captured',
            ]);
            $refundingGateway->shouldReceive('refund')->once();
            $changedCart->update(['quantity' => 2]);
            try {
                $refundingService->confirm($user->id, $changed['razorpay_order_id'], 'pay_changed_123', 'signed');
                $this->fail('Changed cart should not create an order.');
            } catch (\InvalidArgumentException $e) {
                $this->assertStringContainsString('refund', strtolower($e->getMessage()));
            }
            $this->assertSame('refunded', StorefrontPaymentAttempt::where('razorpay_order_id', $changed['razorpay_order_id'])->value('status'));
            $this->assertSame(1, Order::where('user_id', $user->id)->count());
        } finally {
            DB::rollBack();
            Cache::forget('business_settings');
        }
    }

    private string $razorOrderId;
    private int $amountPaise;
}
