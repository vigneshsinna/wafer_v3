<?php

namespace App\Services\Checkout;

use App\Models\Address;
use App\Models\Area;
use App\Models\Carrier;
use App\Models\City;
use App\Models\Shop;
use Illuminate\Database\Eloquent\Collection;

/** Shipping for a validated, preloaded V3 cart. */
class CheckoutShippingCalculator
{
    private array $groups = [];

    public function __construct(private Collection $items, private Address $address, private string $type)
    {
        foreach ($items as $item) {
            $product = $item->product;
            $owner = $product->added_by === 'admin' ? 'admin' : 'seller:'.$product->user_id;
            $group = $this->groups[$owner] ?? ['user_id' => $product->user_id, 'count' => 0, 'physical' => 0, 'weight' => 0, 'price' => 0];
            $group['count']++;
            $group['physical'] += $product->digital == 1 ? 0 : 1;
            if ($this->type === 'carrier_wise_shipping') {
                $group['weight'] += $product->weight * $item->quantity;
                $group['price'] += cart_product_price($item, $product, false, false) * $item->quantity;
            }
            $this->groups[$owner] = $group;
        }
    }

    public function calculate(bool $freeShipping, ?int $carrierId): array
    {
        if ($this->type !== 'carrier_wise_shipping') {
            $cost = $freeShipping ? 0 : $this->nonCarrierCost();
            if (!$freeShipping && $cost <= 0) {
                throw new \InvalidArgumentException('No shipping rate is configured for this address.');
            }
            return ['cost' => $cost, 'carrier_id' => null, 'options' => []];
        }

        $options = [];
        $zoneId = $this->address->country->zone_id;
        foreach (Carrier::active()->with(['carrier_ranges.carrier_range_prices', 'carrier_range_prices'])->get() as $carrier) {
            if (!$carrier->free_shipping && (!$zoneId || !$carrier->carrier_range_prices->contains('zone_id', $zoneId))) {
                continue;
            }
            $rate = $carrier->free_shipping ? 0 : $this->carrierCost($carrier, $zoneId);
            if (!$carrier->free_shipping && ($rate === null || $rate <= 0)) {
                continue;
            }
            $options[] = [
                'id' => $carrier->id,
                'name' => $carrier->name,
                'transit_time' => $carrier->transit_time,
                'cost' => round($freeShipping ? 0 : $rate, 2),
            ];
        }
        if (!$options) {
            throw new \InvalidArgumentException('No courier rate is configured for this address and cart.');
        }
        $chosen = collect($options)->firstWhere('id', $carrierId ?? $options[0]['id']);
        if (!$chosen) {
            throw new \InvalidArgumentException('Select an available courier.');
        }
        return ['cost' => $chosen['cost'], 'carrier_id' => $chosen['id'], 'options' => $options];
    }

    private function nonCarrierCost(): float
    {
        $physical = array_sum(array_column($this->groups, 'physical'));
        if ($this->type === 'flat_rate') {
            return (float) get_setting('flat_rate_shipping_cost') * $physical / $this->items->count();
        }
        if (!in_array($this->type, ['seller_wise_shipping', 'area_wise_shipping'], true)) {
            return (float) $this->items->sum(function ($item) {
                $product = $item->product;
                return $product->digital == 1 ? 0 : $product->shipping_cost * ($product->is_quantity_multiplied ? $item->quantity : 1);
            });
        }

        $areaCost = 0;
        $shops = collect();
        if ($this->type === 'area_wise_shipping') {
            $area = $this->address->area_id
                ? Area::find($this->address->area_id) : City::find($this->address->city_id);
            $areaCost = (float) ($area?->cost ?? 0);
        } elseif ($this->type === 'seller_wise_shipping') {
            $sellerIds = collect($this->groups)->except('admin')->pluck('user_id');
            $shops = Shop::whereIn('user_id', $sellerIds)->get()->keyBy('user_id');
        }

        $cost = 0;
        foreach ($this->groups as $owner => $group) {
            if (!$group['physical']) continue;
            $rate = match ($this->type) {
                'area_wise_shipping' => $areaCost,
                'seller_wise_shipping' => $owner === 'admin'
                    ? (float) get_setting('shipping_cost_admin')
                    : (float) ($shops->get($group['user_id'])?->shipping_cost ?? 0),
                default => 0,
            };
            $cost += $rate * $group['physical'] / $group['count'];
        }
        return $cost;
    }

    private function carrierCost(Carrier $carrier, int $zoneId): ?float
    {
        $billingType = $carrier->carrier_ranges->first()?->billing_type;
        if (!$billingType) return null;
        $cost = 0;
        foreach ($this->groups as $group) {
            if (!$group['physical']) continue;
            $measure = $billingType === 'weight_based' ? $group['weight'] : $group['price'];
            $range = $carrier->carrier_ranges->first(fn ($range) =>
                $measure >= $range->delimiter1 && $measure < $range->delimiter2);
            $price = $range?->carrier_range_prices->firstWhere('zone_id', $zoneId)?->price;
            if ($price === null || $price <= 0) return null;
            $cost += $price * $group['physical'] / $group['count'];
        }
        return $cost;
    }
}
