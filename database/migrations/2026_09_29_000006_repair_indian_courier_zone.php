<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $india = DB::table('countries')->where('code', 'IN')->first();
        if (!$india) {
            return;
        }

        $zoneId = $india->zone_id && DB::table('zones')->where('id', $india->zone_id)->exists()
            ? $india->zone_id
            : DB::table('zones')->where('name', 'India')->value('id');
        if (!$zoneId) {
            $zoneId = DB::table('zones')->insertGetId([
                'name' => 'India', 'status' => 1, 'created_at' => now(), 'updated_at' => now(),
            ]);
        }

        foreach (['ST Courier' => 40, 'DTDC' => 80] as $name => $price) {
            $carrierId = DB::table('carriers')->where('name', $name)->value('id');
            if (!$carrierId) {
                continue;
            }
            $rangeId = DB::table('carrier_ranges')->where('carrier_id', $carrierId)
                ->where('billing_type', 'weight_based')->where('delimiter1', 0)->where('delimiter2', 1.01)
                ->value('id');
            if ($rangeId && !DB::table('carrier_range_prices')->where('carrier_range_id', $rangeId)->where('zone_id', $zoneId)->exists()) {
                DB::table('carrier_range_prices')->insert([
                    'carrier_id' => $carrierId, 'carrier_range_id' => $rangeId,
                    'zone_id' => $zoneId, 'price' => $price,
                    'created_at' => now(), 'updated_at' => now(),
                ]);
            }
        }

        if ($india->zone_id != $zoneId) {
            DB::table('countries')->where('id', $india->id)->update(['zone_id' => $zoneId]);
        }
    }

    public function down(): void
    {
        // Keep configured shipping zones and administrator-edited courier rates.
    }
};
