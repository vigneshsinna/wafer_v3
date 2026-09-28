<?php

namespace App\Services\Checkout;

use App\Models\Address;
use App\Models\Cart;
use App\Models\CombinedOrder;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\StorefrontPaymentAttempt;
use App\Models\User;
use App\Services\Payment\RazorpayGateway;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StorefrontPurchaseService
{
    public function __construct(private CheckoutService $checkout, private RazorpayGateway $gateway) {}

    public function start(int $userId, int $addressId): array
    {
        if (!$this->gateway->isAvailable()) {
            throw new \InvalidArgumentException('Razorpay is not configured in admin yet.');
        }
        if (\App\Models\Currency::find(get_setting('system_default_currency'))?->code !== 'INR') {
            throw new \InvalidArgumentException('Set the store currency to INR before accepting Razorpay payments.');
        }
        $summary = $this->checkout->summary($userId, $addressId);
        $amount = (int) round($summary['grand_total'] * 100);
        if ($amount < 100) {
            throw new \InvalidArgumentException('Order total must be at least ₹1.');
        }
        $items = Cart::where('user_id', $userId)->active()->orderBy('id')->get();
        $shippingRemaining = (int) round($summary['shipping_cost'] * 100);
        $lines = [];
        foreach ($items as $index => $cart) {
            $product = Product::with('stocks')->findOrFail($cart->product_id);
            if ($product->added_by !== 'admin') {
                throw new \InvalidArgumentException('Only Wafer King products can be purchased in this storefront.');
            }
            $shipping = $index === $items->count() - 1 ? $shippingRemaining : (int) round($summary['shipping_cost'] * 100 / $items->count());
            $shippingRemaining -= $shipping;
            $lines[] = [
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'variation' => $cart->variation ?? '',
                'quantity' => (int) $cart->quantity,
                'price_paise' => (int) round(cart_product_price($cart, $product, false, false) * $cart->quantity * 100),
                'tax_paise' => (int) round(cart_product_tax($cart, $product, false) * $cart->quantity * 100),
                'discount_paise' => (int) round($cart->discount * 100),
                'shipping_paise' => $shipping,
                'seller_id' => $product->user_id,
            ];
        }
        $calculated = array_sum(array_map(fn ($line) => $line['price_paise'] + $line['tax_paise'] + $line['shipping_paise'] - $line['discount_paise'], $lines));
        if ($calculated !== $amount) {
            throw new \InvalidArgumentException('Cart totals changed. Refresh checkout and try again.');
        }
        $address = Address::with(['country', 'state', 'city'])->where('id', $addressId)->where('user_id', $userId)->firstOrFail();
        $user = User::findOrFail($userId);
        $shippingAddress = [
            'name' => $user->name, 'email' => $user->email, 'phone' => $address->phone,
            'address' => $address->address, 'country' => $address->country->name,
            'state' => $address->state->name, 'city' => $address->city?->name,
            'postal_code' => $address->postal_code,
        ];
        $fingerprint = $this->fingerprint($lines);
        $razorpay = $this->gateway->createOrder($amount, 'wk-'.Str::uuid());
        if (($razorpay['currency'] ?? null) !== 'INR' || (int) ($razorpay['amount'] ?? 0) !== $amount || empty($razorpay['id'])) {
            throw new \RuntimeException('Razorpay returned an invalid order.');
        }
        $attempt = StorefrontPaymentAttempt::create([
            'user_id' => $userId, 'address_id' => $addressId,
            'razorpay_order_id' => $razorpay['id'], 'amount_paise' => $amount,
            'cart_fingerprint' => $fingerprint,
            'snapshot' => ['items' => $lines, 'shipping_address' => $shippingAddress],
            'status' => 'created',
        ]);
        return ['attempt_id' => $attempt->id, 'razorpay_order_id' => $attempt->razorpay_order_id,
            'key' => $this->gateway->publicKey(), 'amount' => $amount, 'currency' => 'INR',
            'name' => $user->name, 'email' => $user->email, 'phone' => $address->phone];
    }

    public function confirm(int $userId, string $orderId, string $paymentId, string $signature): Order
    {
        $attempt = StorefrontPaymentAttempt::where('user_id', $userId)->where('razorpay_order_id', $orderId)->firstOrFail();
        $this->gateway->verifyCheckoutSignature($orderId, $paymentId, $signature);
        return $this->settle($attempt, $paymentId);
    }

    public function webhook(string $orderId, string $paymentId): void
    {
        $attempt = StorefrontPaymentAttempt::where('razorpay_order_id', $orderId)->first();
        if (!$attempt) return;
        try {
            $this->settle($attempt, $paymentId);
        } catch (\InvalidArgumentException $e) {
            if ($attempt->fresh()->status !== 'refunded') throw $e;
        }
    }

    private function settle(StorefrontPaymentAttempt $attempt, string $paymentId): Order
    {
        if ($attempt->status === 'paid') {
            if ($attempt->razorpay_payment_id === $paymentId) return Order::findOrFail($attempt->order_id);
            $extra = $this->gateway->payment($paymentId);
            if (($extra['order_id'] ?? null) === $attempt->razorpay_order_id &&
                ($extra['currency'] ?? null) === 'INR' && (int) ($extra['amount'] ?? 0) === (int) $attempt->amount_paise &&
                ($extra['status'] ?? null) === 'captured') {
                $this->refundIfNeeded($paymentId, $attempt->amount_paise, $extra);
                return Order::findOrFail($attempt->order_id);
            }
            throw new \InvalidArgumentException('This order was already paid.');
        }
        if ($attempt->status === 'refund_pending' && $attempt->razorpay_payment_id === $paymentId) {
            $this->refundIfNeeded($paymentId, $attempt->amount_paise);
            $attempt->update(['status' => 'refunded']);
        }
        if (in_array($attempt->status, ['refunded', 'refund_pending'], true)) {
            throw new \InvalidArgumentException('This payment cannot create an order.');
        }
        $payment = $this->gateway->payment($paymentId);
        if (($payment['order_id'] ?? null) !== $attempt->razorpay_order_id ||
            ($payment['currency'] ?? null) !== 'INR' || (int) ($payment['amount'] ?? 0) !== (int) $attempt->amount_paise) {
            throw new \InvalidArgumentException('Payment does not match the checkout total.');
        }
        if (($payment['status'] ?? '') === 'authorized') {
            $payment = $this->gateway->capture($paymentId, $attempt->amount_paise);
        }
        if (($payment['status'] ?? '') !== 'captured') {
            throw new \InvalidArgumentException('Payment has not been captured.');
        }
        try {
            return DB::transaction(function () use ($attempt, $paymentId) {
                $locked = StorefrontPaymentAttempt::whereKey($attempt->id)->lockForUpdate()->firstOrFail();
                if ($locked->status === 'paid') return Order::findOrFail($locked->order_id);
                if ($locked->status !== 'created') throw new \InvalidArgumentException('Payment has already been processed.');
                $lines = $locked->snapshot['items'];
                $carts = Cart::where('user_id', $locked->user_id)->whereIn('id', array_column($lines, 'cart_id'))->active()->lockForUpdate()->orderBy('id')->get();
                if ($carts->count() !== count($lines) || $this->fingerprint($this->cartIdentity($carts)) !== $locked->cart_fingerprint) {
                    throw new \InvalidArgumentException('Cart changed during payment. A refund will be issued.');
                }
                $allCarts = Cart::where('user_id', $locked->user_id)->active()->count();
                if ($allCarts !== count($lines)) throw new \InvalidArgumentException('Cart changed during payment. A refund will be issued.');
                foreach ($lines as $line) {
                    $stock = ProductStock::where('product_id', $line['product_id'])->where('variant', $line['variation'])->lockForUpdate()->first();
                    if (!$stock || $stock->qty < $line['quantity']) throw new \InvalidArgumentException('A product sold out during payment. A refund will be issued.');
                    $stock->decrement('qty', $line['quantity']);
                    Product::whereKey($line['product_id'])->increment('num_of_sale', $line['quantity']);
                }
                $address = json_encode($locked->snapshot['shipping_address']);
                $combined = new CombinedOrder();
                $combined->user_id = $locked->user_id;
                $combined->shipping_address = $address;
                $combined->grand_total = $locked->amount_paise / 100;
                $combined->save();
                $order = new Order();
                $order->combined_order_id = $combined->id;
                $order->user_id = $locked->user_id;
                $order->seller_id = $lines[0]['seller_id'];
                $order->shipping_address = $address;
                $order->billing_address = $address;
                $order->shipping_type = 'home_delivery';
                $order->order_from = 'app';
                $order->payment_type = 'razorpay';
                $order->payment_status = 'paid';
                $order->delivery_status = 'pending';
                $order->payment_details = json_encode(['razorpay_order_id' => $locked->razorpay_order_id, 'razorpay_payment_id' => $paymentId]);
                $order->grand_total = $locked->amount_paise / 100;
                $order->coupon_discount = array_sum(array_column($lines, 'discount_paise')) / 100;
                $order->code = now()->format('Ymd-His').'-'.$locked->id;
                $order->date = now()->timestamp;
                $order->delivery_viewed = 0;
                $order->payment_status_viewed = 0;
                $order->save();
                foreach ($lines as $line) {
                    $detail = new OrderDetail();
                    $detail->order_id = $order->id;
                    $detail->seller_id = $line['seller_id'];
                    $detail->product_id = $line['product_id'];
                    $detail->variation = $line['variation'];
                    $detail->quantity = $line['quantity'];
                    $detail->price = $line['price_paise'] / 100;
                    $detail->tax = $line['tax_paise'] / 100;
                    $detail->shipping_cost = $line['shipping_paise'] / 100;
                    $detail->coupon_discount = $line['discount_paise'] / 100;
                    $detail->shipping_type = 'home_delivery';
                    $detail->payment_status = 'paid';
                    $detail->delivery_status = 'pending';
                    $detail->save();
                }
                Cart::whereIn('id', array_column($lines, 'cart_id'))->delete();
                $locked->order_id = $order->id;
                $locked->razorpay_payment_id = $paymentId;
                $locked->status = 'paid';
                $locked->save();
                return $order;
            });
        } catch (\Throwable $e) {
            $attempt->status = 'refund_pending';
            $attempt->razorpay_payment_id = $paymentId;
            $attempt->save();
            try {
                $this->refundIfNeeded($paymentId, $attempt->amount_paise, $payment);
                $attempt->update(['status' => 'refunded']);
            } catch (\Throwable $refundError) {
                report($refundError);
            }
            throw $e;
        }
    }

    private function refundIfNeeded(string $paymentId, int $amountPaise, ?array $payment = null): void
    {
        $payment ??= $this->gateway->payment($paymentId);
        $remaining = $amountPaise - (int) ($payment['amount_refunded'] ?? 0);
        if ($remaining > 0) $this->gateway->refund($paymentId, $remaining);
    }

    private function cartIdentity($carts): array
    {
        return $carts->map(fn ($cart) => [
            'cart_id' => $cart->id, 'product_id' => $cart->product_id,
            'variation' => $cart->variation ?? '', 'quantity' => (int) $cart->quantity,
        ])->all();
    }

    private function fingerprint(array $lines): string
    {
        return hash('sha256', json_encode(array_map(fn ($line) => [
            $line['cart_id'], $line['product_id'], $line['variation'], $line['quantity'],
        ], $lines)));
    }
}
