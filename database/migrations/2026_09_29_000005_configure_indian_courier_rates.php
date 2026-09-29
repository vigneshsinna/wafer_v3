<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::transaction(function () {
            $zoneId = DB::table('countries')->where('code', 'IN')->value('zone_id');
            if (!$zoneId) {
                return;
            }

            foreach (['ST Courier' => 40, 'DTDC' => 80] as $name => $price) {
                $carrier = DB::table('carriers')->where('name', $name)->first();
                if (!$carrier || DB::table('carrier_ranges')->where('carrier_id', $carrier->id)->exists()) {
                    continue;
                }

                // The carrier engine excludes the upper bound; 1.01 covers weights through 1.00 kg.
                $rangeId = DB::table('carrier_ranges')->insertGetId([
                    'carrier_id' => $carrier->id,
                    'billing_type' => 'weight_based',
                    'delimiter1' => 0,
                    'delimiter2' => 1.01,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                DB::table('carrier_range_prices')->insert([
                    'carrier_id' => $carrier->id,
                    'carrier_range_id' => $rangeId,
                    'zone_id' => $zoneId,
                    'price' => $price,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                DB::table('carriers')->where('id', $carrier->id)->update(['status' => 1, 'updated_at' => now()]);
            }

            DB::table('business_settings')->where('type', 'shipping_type')->where(function ($query) {
                $query->whereNull('value')->orWhere('value', '');
            })->update(['value' => 'carrier_wise_shipping']);
        });

        Cache::forget('business_settings');
    }

    public function down(): void
    {
        // Preserve courier rates and any later edits made by an administrator.
    }
};
