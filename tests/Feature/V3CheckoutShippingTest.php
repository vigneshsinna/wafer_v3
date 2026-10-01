<?php

namespace Tests\Feature;

use App\Models\Address;
use App\Models\Cart;
use App\Models\City;
use App\Models\User;
use App\Services\Checkout\CheckoutService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\CheckoutTestCase;

class V3CheckoutShippingTest extends CheckoutTestCase
{
    public function test_admin_courier_rates_and_indian_pin_validation(): void
    {
        DB::beginTransaction();
        try {
            DB::table('business_settings')->where('type', 'shipping_type')->update(['value' => 'carrier_wise_shipping']);
            Cache::forget('business_settings');
            DB::table('carriers')->update(['status' => 0]);
            $zoneId = DB::table('countries')->where('id', 101)->value('zone_id');
            $this->assertTrue(DB::table('zones')->where('id', $zoneId)->exists());
            $carriers = [];
            foreach (['DTDC' => 45, 'ST Courier' => 65] as $name => $rate) {
                $id = DB::table('carriers')->insertGetId(['name' => $name, 'transit_time' => 'Test', 'status' => 1, 'free_shipping' => 0]);
                $rangeId = DB::table('carrier_ranges')->insertGetId([
                    'carrier_id' => $id, 'billing_type' => 'weight_based', 'delimiter1' => 0, 'delimiter2' => 1.01,
                ]);
                DB::table('carrier_range_prices')->insert([
                    'carrier_id' => $id, 'carrier_range_id' => $rangeId, 'zone_id' => $zoneId, 'price' => $rate,
                ]);
                $carriers[$name] = $id;
            }
            $user = User::create(['name' => 'Checkout Shipping Test', 'email' => 'shipping-'.uniqid().'@example.invalid']);
            $city = City::where('state_id', 35)->where('name', 'Erode')->firstOrFail();
            $address = new Address();
            $address->user_id = $user->id;
            $address->address = 'Test address';
            $address->country_id = 101;
            $address->state_id = 35;
            $address->city_id = $city->id;
            $address->postal_code = '638001';
            $address->phone = '9788090895';
            $address->save();
            Cart::create(['user_id' => $user->id, 'owner_id' => 1, 'product_id' => 6,
                'variation' => '', 'quantity' => 1, 'status' => 1, 'discount' => 0]);

            $checkout = new CheckoutService();
            $dtdc = $checkout->summary($user->id, $address->id, $carriers['DTDC']);
            $st = $checkout->summary($user->id, $address->id, $carriers['ST Courier']);
            $this->assertSame(45.0, $dtdc['shipping_cost']);
            $this->assertSame(65.0, $st['shipping_cost']);
            $this->assertCount(2, $dtdc['shipping_options']);
            $this->assertSame($carriers['ST Courier'], $st['carrier_id']);
            Sanctum::actingAs($user);
            $this->postJson('/api/v3/checkout/summary', [
                'address_id' => $address->id, 'carrier_id' => $carriers['ST Courier'],
            ])->assertOk()->assertJsonPath('data.shipping_cost', 65);
            $states = $this->getJson('/api/v3/locations/countries/101/states')->assertOk()->json('data');
            $this->assertContains('Tamil Nadu', array_column($states, 'name'));
            $this->assertNotContains('Kenmore', array_column($states, 'name'));

            DB::table('products')->where('id', 7)->update(['added_by' => 'seller', 'user_id' => 2, 'weight' => 1.01]);
            $secondCart = Cart::create(['user_id' => $user->id, 'owner_id' => 2, 'product_id' => 7,
                'variation' => '', 'quantity' => 1, 'status' => 1, 'discount' => 0]);
            try {
                $checkout->summary($user->id, $address->id);
                $this->fail('A second seller without a rate must not receive a partial quote.');
            } catch (\InvalidArgumentException $e) {
                $this->assertSame('No courier rate is configured for this address and cart.', $e->getMessage());
            }
            $secondCart->delete();

            DB::table('products')->where('id', 6)->update(['weight' => 1]);
            $this->assertSame(45.0, $checkout->summary($user->id, $address->id, $carriers['DTDC'])['shipping_cost']);
            DB::table('products')->where('id', 6)->update(['weight' => 1.01]);
            try {
                $checkout->summary($user->id, $address->id);
                $this->fail('A parcel above the configured 1 kg band must not receive a courier quote.');
            } catch (\InvalidArgumentException $e) {
                $this->assertSame('No courier rate is configured for this address and cart.', $e->getMessage());
            }

            $address->postal_code = '999999';
            $address->save();
            $this->expectException(\InvalidArgumentException::class);
            $checkout->summary($user->id, $address->id);
        } finally {
            DB::rollBack();
            Cache::forget('business_settings');
        }
    }
}
