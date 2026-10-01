<?php

namespace Tests;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/** Isolated legacy schema and synthetic data for the checkout feature tests. */
abstract class CheckoutTestCase extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // Never reset the developer's store database, even when .env is loaded.
        $connection = config('database.connections.mysql');
        $connection['database'] = 'waferking_checkout_test';
        $connection['url'] = null;
        config(['cache.default' => 'array', 'database.connections.checkout_testing' => $connection,
            'database.default' => 'checkout_testing']);
        DB::purge('checkout_testing');
        DB::unprepared(file_get_contents(__DIR__.'/Fixtures/checkout-schema.sql'));
        Cache::flush();

        DB::table('business_settings')->insert(collect([
            'shipping_type' => 'flat_rate', 'flat_rate_shipping_cost' => '30',
            'system_default_currency' => '1', 'minimum_order_amount_check' => '0',
        ])->map(fn ($value, $type) => ['type' => $type, 'value' => $value])->values()->all());
        DB::table('currencies')->insert(['id' => 1, 'name' => 'Indian Rupee',
            'symbol' => '₹', 'code' => 'INR', 'exchange_rate' => 1, 'status' => 1]);
        DB::table('zones')->insert(['id' => 1, 'name' => 'India', 'status' => 1]);
        DB::table('countries')->insert(['id' => 101, 'name' => 'India', 'code' => 'IN', 'zone_id' => 1, 'status' => 1]);
        DB::table('states')->insert([
            ['id' => 35, 'name' => 'Tamil Nadu', 'country_id' => 101, 'status' => 1],
            ['id' => 36, 'name' => 'Kenmore', 'country_id' => 101, 'status' => 1],
        ]);
        DB::table('cities')->insert(['id' => 1, 'name' => 'Erode', 'state_id' => 35, 'status' => 1]);
        DB::table('pincodes')->insert(['pincode' => '638001', 'state' => 'TAMIL NADU', 'district' => 'ERODE']);
        DB::table('users')->insert(['id' => 1, 'name' => 'Fixture admin', 'user_type' => 'admin']);
        foreach ([6, 7] as $id) {
            DB::table('products')->insert(['id' => $id, 'name' => 'Fixture wafer '.$id,
                'slug' => 'fixture-wafer-'.$id, 'user_id' => 1, 'category_id' => 1,
                'unit_price' => 100, 'weight' => 0.5, 'gst_rate' => 18]);
            DB::table('product_stocks')->insert(['product_id' => $id, 'variant' => '', 'price' => 100, 'qty' => 20]);
        }
    }
}
