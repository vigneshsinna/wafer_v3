<?php

namespace App\Services\Checkout;

use App\Models\Cart;
use App\Models\Product;
use App\Models\Address;
use App\Models\Carrier;
use App\Models\Pincode;
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

    public function summary(int $userId, int $addressId, ?int $carrierId = null): array
    {
        $this->validateCheckout($userId);
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
        $items = Cart::where('user_id', $userId)->active()->with('product')->get();
        $base = (new CartService())->getSummary($userId);
        $merchandiseTotal = $base['sub_total'] + $base['tax'] - $base['discount'];
        $freeShipping = self::qualifiesForFreeShipping($address->state->name, $merchandiseTotal);
        $shipping = 0;
        $shippingOptions = [];
        $location = ['country_id' => $address->country_id, 'city_id' => $address->city_id, 'area_id' => $address->area_id];
        if ($shippingType === 'carrier_wise_shipping') {
            $zoneId = $address->country->zone_id;
            foreach (Carrier::active()->with('carrier_ranges.carrier_range_prices')->get() as $carrier) {
                if (!$carrier->free_shipping && (!$zoneId || !$carrier->carrier_range_prices()->where('zone_id', $zoneId)->exists())) {
                    continue;
                }
                $rate = 0;
                $unratedPhysicalItem = false;
                if (!$carrier->free_shipping) {
                    foreach ($items as $index => $item) {
                        $itemRate = getShippingCost($items, $index, $location, $carrier->id);
                        if ($itemRate <= 0 && $item->product?->digital != 1) {
                            $unratedPhysicalItem = true;
                            break;
                        }
                        $rate += $itemRate;
                    }
                }
                if (!$carrier->free_shipping && ($unratedPhysicalItem || $rate <= 0)) {
                    continue;
                }
                $shippingOptions[] = [
                    'id' => $carrier->id,
                    'name' => $carrier->name,
                    'transit_time' => $carrier->transit_time,
                    'cost' => round($freeShipping ? 0 : $rate, 2),
                ];
            }
            if (!$shippingOptions) {
                throw new \InvalidArgumentException('No courier rate is configured for this address and cart.');
            }
            $chosen = collect($shippingOptions)->firstWhere('id', $carrierId ?? $shippingOptions[0]['id']);
            if (!$chosen) {
                throw new \InvalidArgumentException('Select an available courier.');
            }
            $carrierId = $chosen['id'];
            $shipping = $chosen['cost'];
        } elseif (!$freeShipping) {
            foreach ($items as $index => $item) {
                $shipping += getShippingCost($items, $index, $location);
            }
            if ($shipping <= 0) {
                throw new \InvalidArgumentException('No shipping rate is configured for this address.');
            }
        }

        return [
            'address_id' => $addressId,
            'carrier_id' => $carrierId,
            'shipping_options' => $shippingOptions,
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
