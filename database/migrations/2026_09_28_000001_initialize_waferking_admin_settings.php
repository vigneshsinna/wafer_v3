<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InitializeWaferkingAdminSettings extends Migration
{
    public function up(): void
    {
        $defaults = [
            'website_name' => 'Wafer King',
            'site_name' => 'Wafer King',
            'site_motto' => 'Black rice wafers',
            'shipping_type' => '',
            'flat_rate_shipping_cost' => '',
            'shipping_cost_admin' => '',
        ];

        foreach ($defaults as $type => $value) {
            if (!DB::table('business_settings')->where('type', $type)->exists()) {
                DB::table('business_settings')->insert([
                    'type' => $type,
                    'value' => $value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        if (!DB::table('payment_methods')->where('name', 'razorpay')->whereNull('addon_identifier')->exists()) {
            DB::table('payment_methods')->insert([
                'name' => 'razorpay',
                'active' => 0,
                'addon_identifier' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
        \Illuminate\Support\Facades\Cache::forget('business_settings');
    }

    public function down(): void
    {
        // Preserve settings that an administrator may have changed after installation.
    }
}
