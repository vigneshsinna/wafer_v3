<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductStock;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedWaferKingCatalog extends Command
{
    protected $signature = 'waferking:seed-catalog';
    protected $description = 'Create the approved Wafer King catalog without overwriting admin edits';

    public function handle(): int
    {
        $admin = User::where('user_type', 'admin')->firstOrFail();
        DB::transaction(function () use ($admin): void {
            if (!DB::table('languages')->where('code', 'en')->exists()) {
                DB::table('languages')->insert([
                    'name' => 'English', 'code' => 'en', 'app_lang_code' => 'en', 'status' => 1,
                ]);
            }
            $currency = DB::table('currencies')->where('code', 'INR')->first();
            if (!$currency) {
                $currencyId = DB::table('currencies')->insertGetId([
                    'name' => 'Indian Rupee', 'code' => 'INR', 'symbol' => '₹',
                    'exchange_rate' => 1, 'status' => 1,
                ]);
            } else {
                $currencyId = $currency->id;
            }
            foreach (['homepage_select' => 'waferking', 'sslcommerz_sandbox' => '1'] as $type => $value) {
                if (!DB::table('business_settings')->where('type', $type)->exists()) {
                    DB::table('business_settings')->insert(['type' => $type, 'value' => $value]);
                }
            }
            if (!DB::table('business_settings')->where('type', 'system_default_currency')->exists()) {
                DB::table('business_settings')->insert([
                    'type' => 'system_default_currency', 'value' => (string) $currencyId,
                ]);
            }
            DB::table('elements')->insertOrIgnore(['id' => 1, 'name' => 'Header']);
            if (!DB::table('pages')->where('slug', 'home')->exists()) {
                DB::table('pages')->insert(['slug' => 'home', 'type' => 'home_page', 'title' => 'Home', 'content' => '[]']);
            }
            $header = DB::table('element_types')->where('element_id', 1)->where('name', 'Wafer King')->first();
            if (!$header) {
                $headerId = DB::table('element_types')->insertGetId([
                    'element_id' => 1, 'name' => 'Wafer King', 'is_default' => 1,
                ]);
            } else {
                $headerId = $header->id;
            }
            if (!DB::table('business_settings')->where('type', 'header_element')->exists()) {
                DB::table('business_settings')->insert([
                    'type' => 'header_element', 'value' => (string) $headerId,
                ]);
            }
            $category = Category::where('slug', 'wafer-biscuits')->first();
            if (!$category) {
                $category = new Category();
                $category->slug = 'wafer-biscuits';
                $category->name = 'Wafer Biscuits';
                $category->save();
            }

            foreach ([
                ['hibiscus-wafer-biscuit', 'Hibiscus Wafer Biscuit', 115, 'WK-HIB-55', 'Black Rice / Karupu Kavuni Wafer infused with natural Hibiscus. 55g pack.'],
                ['avarampoo-wafer-biscuit', 'Avarampoo Wafer Biscuit', 115, 'WK-AVA-55', 'Black Rice / Karupu Kavuni Wafer with Avarampoo herbal goodness. 55g pack.'],
                ['vallarai-wafer-biscuit', 'Vallarai Wafer Biscuit', 115, 'WK-VAL-55', 'Black Rice / Karupu Kavuni Wafer with Vallarai. 55g pack.'],
                ['makhana-wafer-biscuit', 'Makhana Wafer Biscuit', 120, 'WK-MAK-55', 'Black Rice / Karupu Kavuni Wafer with Makhana (Fox Nuts). 55g pack.'],
            ] as [$slug, $name, $price, $sku, $description]) {
                $product = Product::firstOrCreate(['slug' => $slug], [
                    'name' => $name,
                    'added_by' => 'admin',
                    'user_id' => $admin->id,
                    'category_id' => $category->id,
                    'description' => $description,
                    'unit' => '55g pack',
                    'weight' => 0.055,
                    'unit_price' => $price,
                    'current_stock' => 50,
                    'min_qty' => 1,
                    'published' => 1,
                    'approved' => 1,
                    'gst_rate' => 5,
                    'tax' => 0,
                    'tax_type' => 'amount',
                    'meta_title' => $name,
                    'meta_description' => $description,
                ]);
                if (!$product->stocks()->exists()) {
                    ProductStock::create([
                        'product_id' => $product->id,
                        'variant' => '',
                        'sku' => $sku,
                        'price' => $price,
                        'qty' => 50,
                    ]);
                }
                if (!DB::table('product_categories')->where('product_id', $product->id)
                    ->where('category_id', $category->id)->exists()) {
                    DB::table('product_categories')->insert([
                        'product_id' => $product->id,
                        'category_id' => $category->id,
                    ]);
                }
            }
        });
        $this->info('Wafer King catalog ready.');
        return self::SUCCESS;
    }
}
