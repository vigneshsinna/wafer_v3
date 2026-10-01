<?php

namespace App\Services\Checkout;

use App\Models\Cart;
use App\Models\Address;
use App\Models\Pincode;
use App\Services\Cart\CartService;
use Illuminate\Database\Eloquent\Collection;

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

    public function summary(int $userId, int $addressId, ?int $carrierId = null): array
    {
        return $this->summaryWithCart($userId, $addressId, $carrierId)['summary'];
    }

    /** @return array{summary: array, items: Collection} */
    public function summaryWithCart(int $userId, int $addressId, ?int $carrierId = null): array
    {
        $items = $this->loadCart($userId);
        $this->validateItems($items);
        $address = Address::where('id', $addressId)->where('user_id', $userId)
            ->with(['country', 'state'])->firstOrFail();
        if (strtoupper((string) $address->country?->code) !== 'IN' || !$address->state || !$address->city_id) {
            throw new \InvalidArgumentException('Select a complete Indian shipping address.');
        }
        if (!Pincode::matchesIndianAddress(trim((string) $address->postal_code), (string) $address->state->name)) {
            throw new \InvalidArgumentException('Enter an active Indian PIN code matching the selected state.');
        }
        $shippingType = get_setting('shipping_type');
        if (!$shippingType) {
            throw new \InvalidArgumentException('Configure Laravel shipping rates before checkout.');
        }
        $base = (new CartService())->getSummary($userId, $items);
        $merchandiseTotal = $base['sub_total'] + $base['tax'] - $base['discount'];
        $freeShipping = self::qualifiesForFreeShipping($address->state->name, $merchandiseTotal);
        $shippingResult = (new CheckoutShippingCalculator($items, $address, $shippingType))
            ->calculate($freeShipping, $carrierId);
        $shipping = $shippingResult['cost'];
        $carrierId = $shippingResult['carrier_id'];
        $shippingOptions = $shippingResult['options'];

        return ['items' => $items, 'summary' => [
            'address_id' => $addressId,
            'carrier_id' => $carrierId,
            'shipping_options' => $shippingOptions,
            'sub_total' => $base['sub_total'],
            'tax' => $base['tax'],
            'shipping_cost' => round($shipping, 2),
            'discount' => $base['discount'],
            'grand_total' => round($merchandiseTotal + $shipping, 2),
            'total_items' => $base['total_items'],
        ]];
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
        return $this->validateItems($this->loadCart($userId));
    }

    private function loadCart(int $userId): Collection
    {
        return Cart::where('user_id', $userId)->active()->orderBy('id')
            ->with('product.stocks')->get();
    }

    private function validateItems(Collection $cartItems): array
    {
        if ($cartItems->isEmpty()) {
            throw new \Exception('Cart is empty.');
        }

        // Check minimum order amount
        if (get_setting('minimum_order_amount_check') == 1) {
            $subtotal = 0;
            foreach ($cartItems as $cartItem) {
                $product = $cartItem->product;
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
            $product = $cartItem->product;
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
