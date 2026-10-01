<?php

namespace Tests\Feature;

use App\Http\Controllers\BusinessSettingsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\WebsiteController;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class WaferKingBrandingTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['database.default' => 'sqlite', 'database.connections.sqlite.database' => ':memory:',
            'cache.default' => 'array', 'headless.storefront_url' => 'https://store.example/']);
        DB::purge('sqlite');
        Schema::create('business_settings', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type');
            $table->text('value')->nullable();
            $table->string('lang')->nullable();
            $table->timestamps();
        });
        Cache::flush();
    }

    public function test_sync_preserves_edits_and_migrates_legacy_settings_without_catalog_tables(): void
    {
        DB::table('business_settings')->insert([
            ['type' => 'website_name', 'value' => 'Rudra Spirit', 'lang' => null],
            ['type' => 'website_name', 'value' => 'Custom local name', 'lang' => 'ta'],
            ['type' => 'site_motto', 'value' => 'Black rice wafers', 'lang' => null],
            ['type' => 'homepage_select', 'value' => 'rudraspirit', 'lang' => null],
            ['type' => 'authentication_layout_select', 'value' => 'rudraspirit', 'lang' => null],
            ['type' => 'rudraspirit_root_category', 'value' => 'rudraksha-beads', 'lang' => null],
        ]);
        Cache::put('business_settings', collect());
        $this->artisan('waferking:sync-branding')->assertSuccessful();

        $this->assertSame('Wafer King', get_setting('website_name'));
        $this->assertSame('Custom local name', get_setting('website_name', null, 'ta'));
        $this->assertSame('Black rice wafers', get_setting('site_motto'));
        $this->assertSame('waferking', get_setting('homepage_select'));
        $this->assertSame('boxed', get_setting('authentication_layout_select'));
        $this->assertSame('wafer-biscuits', get_setting('rudraspirit_root_category'));
        $before = DB::table('business_settings')->orderBy('id')->get()->toJson();
        $this->artisan('shivarudraksha:sync')->expectsOutput('Updated 0 settings.')->assertSuccessful();
        $this->assertSame($before, DB::table('business_settings')->orderBy('id')->get()->toJson());
    }

    public function test_dry_run_keeps_settings_and_cache_untouched(): void
    {
        DB::table('business_settings')->insert(['type' => 'site_name', 'value' => 'Shiva Rudraksha']);
        Cache::put('business_settings', 'cached-settings');
        $this->artisan('waferking:sync-branding', ['--dry-run' => true])->assertSuccessful();
        $this->assertSame('Shiva Rudraksha', DB::table('business_settings')->value('value'));
        $this->assertSame(1, DB::table('business_settings')->count());
        $this->assertSame('cached-settings', Cache::get('business_settings'));
    }

    public function test_white_label_command_can_create_missing_brand_settings(): void
    {
        $this->artisan('brand:set', ['name' => 'Wafer King', '--motto' => 'Black rice wafers'])->assertSuccessful();
        $this->assertSame('Wafer King', get_setting('site_name'));
        $this->assertSame('Black rice wafers', get_setting('site_motto'));
    }

    public function test_customer_pages_use_configured_storefront_and_legacy_features_are_disabled(): void
    {
        $this->withoutMiddleware();
        $this->assertSame('https://store.example', (new HomeController())->index()->getTargetUrl());
        foreach (['faq' => '/faq', 'shop' => '/#flavours', 'about' => '/about', 'contact' => '/contact'] as $uri => $path) {
            $this->get('/'.$uri)->assertRedirect('https://store.example'.$path);
        }
        foreach (['mukhi.info', 'mukhi-info.index', 'hero-slides.index', 'rudraspirit.guide',
            'rudraspirit.knowledge', 'rudraspirit.maintenance', 'rudraspirit.lord_shiva',
            'rudraspirit.recommendations'] as $name) {
            $this->assertFalse(Route::has($name), $name);
        }
        $this->assertTrue(Route::has('api.v3.products.index'));
    }

    public function test_website_settings_exist_and_keep_admin_permission(): void
    {
        $controller = new WebsiteController();
        $this->assertTrue(view()->exists($controller->waferking_settings(new Request())->name()));
        $this->assertSame(route('website.waferking-settings'), $controller->rudraspirit_settings(new Request())->getTargetUrl());
        $middleware = Route::getRoutes()->getByName('website.waferking-settings')->gatherMiddleware();
        $this->assertContains('auth', $middleware);
        $this->assertContains('admin', $middleware);
        $this->assertContains('permission:select_homepage', $middleware);
    }

    public function test_legacy_homepage_cannot_be_selected_again(): void
    {
        $this->expectException(ValidationException::class);
        (new BusinessSettingsController())->update(new Request([
            'types' => ['homepage_select'], 'homepage_select' => 'rudraspirit',
        ]));
    }

    public function test_legacy_authentication_layout_cannot_be_selected_again(): void
    {
        $this->expectException(ValidationException::class);
        (new BusinessSettingsController())->update(new Request([
            'types' => ['authentication_layout_select'], 'authentication_layout_select' => 'rudraspirit',
        ]));
    }
}
