<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Cart;
use App\Models\City;
use App\Models\Country;
use App\Models\Order;
use App\Models\ProductStock;
use App\Models\StorefrontPaymentAttempt;
use App\Models\User;
use App\Services\Checkout\CheckoutService;
use App\Services\Checkout\CheckoutShippingCalculator;
use App\Services\Checkout\StorefrontPurchaseService;
use App\Services\Payment\RazorpayGateway;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Mockery;
use Tests\CheckoutTestCase;

class V3RazorpayPurchaseTest extends CheckoutTestCase
{
    public function test_preloaded_carrier_shipping_matches_legacy_rate_with_fewer_queries(): void
    {
        DB::beginTransaction();
        try {
            DB::table('business_settings')->where('type', 'shipping_type')->update(['value' => 'carrier_wise_shipping']);
            Cache::forget('business_settings');
            $country = Country::findOrFail(101);
            $address = new Address(['country_id' => $country->id]);
            $address->setRelation('country', $country);
            $carrierId = DB::table('carriers')->insertGetId(['name' => 'Checkout Test Courier', 'transit_time' => 'Test', 'status' => 1, 'free_shipping' => 0]);
            $rangeId = DB::table('carrier_ranges')->insertGetId([
                'carrier_id' => $carrierId, 'billing_type' => 'weight_based', 'delimiter1' => 0, 'delimiter2' => 100,
            ]);
            DB::table('carrier_range_prices')->insert([
                'carrier_id' => $carrierId, 'carrier_range_id' => $rangeId, 'zone_id' => $country->zone_id, 'price' => 45,
            ]);
            $items = new Collection();
            foreach ([6, 7] as $id) {
                $cart = new Cart(['product_id' => $id, 'variation' => '', 'quantity' => 1]);
                $cart->setRelation('product', \App\Models\Product::with('stocks')->findOrFail($id));
                $items->add($cart);
            }
            $calculator = new CheckoutShippingCalculator($items, $address, 'carrier_wise_shipping');

            DB::connection()->enableQueryLog();
            DB::connection()->flushQueryLog();
            $option = collect($calculator->calculate(false, $carrierId)['options'])->firstWhere('id', $carrierId);
            $preloadedQueries = count(DB::getQueryLog());
            DB::connection()->flushQueryLog();
            $legacy = getShippingCost($items, 0, ['country_id' => $country->id], $carrierId)
                + getShippingCost($items, 1, ['country_id' => $country->id], $carrierId);
            $legacyQueries = count(DB::getQueryLog());
            DB::connection()->disableQueryLog();

            $this->assertEqualsWithDelta($legacy, $option['cost'], 0.01);
            $this->assertLessThan($legacyQueries, $preloadedQueries);
        } finally {
            DB::connection()->disableQueryLog();
            DB::rollBack();
            Cache::forget('business_settings');
        }
    }

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
