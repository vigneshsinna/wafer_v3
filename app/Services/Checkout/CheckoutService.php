<?php

namespace App\Services\Checkout;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Address;
use App\Services\Cart\CartService;

/**
 * CheckoutService — Shipping calculation and order placement.
 *
 * Extracted from: App\Http\Controllers\Api\V2\CheckoutController
 *   and App\Http\Controllers\CheckoutController
 */
class CheckoutService
{
    /**
     * Calculate shipping costs for the user's cart.
     */
    public function calculateShipping(int $userId, int $addressId): array
    {
        $summary = $this->summary($userId, $addressId);

        return [
            'shipping_cost' => $summary['shipping_cost'],
            'address_id'    => $addressId,
            'items_count'   => $summary['total_items'],
        ];
    }

    public function summary(int $userId, int $addressId): array
    {
        $this->validateCheckout($userId);
        $address = Address::where('id', $addressId)->where('user_id', $userId)
            ->with(['country', 'state'])->firstOrFail();
        if (strtoupper((string) $address->country?->code) !== 'IN' || !$address->state || !$address->city_id) {
            throw new \InvalidArgumentException('Select a complete Indian shipping address.');
        }
        if (!preg_match('/^[1-9][0-9]{5}$/', trim((string) $address->postal_code))) {
            throw new \InvalidArgumentException('Enter a valid six-digit Indian postal code.');
        }
        $shippingType = get_setting('shipping_type');
        if (!$shippingType) {
            throw new \InvalidArgumentException('Configure Laravel shipping rates before checkout.');
        }
        if ($shippingType === 'carrier_wise_shipping') {
            throw new \InvalidArgumentException('Carrier selection is not available in storefront checkout.');
        }

        $items = Cart::where('user_id', $userId)->active()->get();
        $base = (new CartService())->getSummary($userId);
        $merchandiseTotal = $base['sub_total'] + $base['tax'] - $base['discount'];
        $freeShipping = self::qualifiesForFreeShipping($address->state->name, $merchandiseTotal);
        $shipping = 0;
        $itemShipping = [];
        $location = ['country_id' => $address->country_id, 'city_id' => $address->city_id, 'area_id' => $address->area_id];
        if (!$freeShipping) {
            foreach ($items as $index => $item) {
                $itemShipping[$index] = getShippingCost($items, $index, $location);
                $shipping += $itemShipping[$index];
            }
            if ($shipping <= 0) {
                throw new \InvalidArgumentException('No shipping rate is configured for this address.');
            }
        }

        return [
            'address_id' => $addressId,
            'sub_total' => $base['sub_total'],
            'tax' => $base['tax'],
            'shipping_cost' => round($shipping, 2),
            'discount' => $base['discount'],
            'grand_total' => round($merchandiseTotal + $shipping, 2),
            'total_items' => $base['total_items'],
        ];
    }

    public static function qualifiesForFreeShipping(string $state, float $merchandiseTotal): bool
    {
        return $merchandiseTotal >= (strcasecmp(trim($state), 'Tamil Nadu') === 0 ? 499 : 699);
    }

    /**
     * Validate cart before checkout.
     *
     * @throws \Exception
     */
    public function validateCheckout(int $userId): array
    {
        $cartItems = Cart::where('user_id', $userId)->active()->get();

        if ($cartItems->isEmpty()) {
            throw new \Exception('Cart is empty.');
        }

        // Check minimum order amount
        if (get_setting('minimum_order_amount_check') == 1) {
            $subtotal = 0;
            foreach ($cartItems as $cartItem) {
                $product = Product::find($cartItem['product_id']);
                if ($product) {
                    $subtotal += cart_product_price($cartItem, $product, false, false) * $cartItem['quantity'];
                }
            }
            $minimumAmount = (float) get_setting('minimum_order_amount');
            if ($subtotal < $minimumAmount) {
                throw new \Exception("Order amount is less than the minimum order amount of {$minimumAmount}.");
            }
        }

        // Validate stock availability
        foreach ($cartItems as $cartItem) {
            $product = Product::find($cartItem->product_id);
            if (!$product || !$product->published) {
                throw new \Exception("Product no longer available.");
            }

            if ($cartItem->quantity < $product->min_qty) {
                throw new \Exception("Minimum {$product->min_qty} item(s) required for {$product->name}.");
            }

            if ($product->digital != 1) {
                $stock = $product->stocks->where('variant', $cartItem->variation)->first();
                if (!$stock || $stock->qty < $cartItem->quantity) {
                    throw new \Exception("Insufficient stock for {$product->name}.");
                }
            }
        }

        return [
            'valid'       => true,
            'items_count' => $cartItems->count(),
        ];
    }
}
