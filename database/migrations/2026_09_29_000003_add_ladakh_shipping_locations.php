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
        $stateId = DB::table('states')->where('country_id', $india->id)->where('name', 'Ladakh')->value('id');
        if (!$stateId) {
            $stateId = DB::table('states')->insertGetId([
                'country_id' => $india->id, 'name' => 'Ladakh', 'status' => 1,
                'created_at' => now(), 'updated_at' => now(),
            ]);
        }
        foreach (['Leh', 'Kargil'] as $city) {
            if (!DB::table('cities')->where('state_id', $stateId)->where('name', $city)->exists()) {
                DB::table('cities')->insert([
                    'country_id' => $india->id, 'state_id' => $stateId, 'name' => $city,
                    'cost' => 0, 'status' => 1, 'created_at' => now(), 'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        // Shipping addresses may reference these locations; keep them on rollback.
    }
};
