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
        if (!$india->zone_id || !DB::table('zones')->where('id', $india->zone_id)->exists()) {
            $zoneId = DB::table('zones')->where('name', 'India')->value('id');
            if (!$zoneId) {
                $zoneId = DB::table('zones')->insertGetId([
                    'name' => 'India', 'status' => 1, 'created_at' => now(), 'updated_at' => now(),
                ]);
            }
            DB::table('countries')->where('id', $india->id)->update(['zone_id' => $zoneId]);
        }

        foreach (['DTDC', 'ST Courier'] as $name) {
            if (!DB::table('carriers')->where('name', $name)->exists()) {
                DB::table('carriers')->insert([
                    'name' => $name, 'transit_time' => '', 'status' => 0, 'free_shipping' => 0,
                    'created_at' => now(), 'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        // Keep courier configuration because an admin may have edited its rates.
    }
};
