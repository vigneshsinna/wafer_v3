<?php

namespace Tests\Feature;

use App\Http\Controllers\BusinessSettingsController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\WebsiteController;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;
use Tests\TestCase;

class WebsiteRoutingTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        config(['database.default' => 'sqlite', 'database.connections.sqlite.database' => ':memory:', 'cache.default' => 'array']);
        DB::purge('sqlite');
        foreach (['business_settings', 'elements', 'element_types', 'element_styles', 'languages', 'pages', 'translations', 'app_translations', 'uploads'] as $name) {
            Schema::create($name, function (Blueprint $table) use ($name) {
                $table->increments('id');
                $table->timestamps();
                if ($name === 'business_settings') {
                    $table->string('type'); $table->text('value')->nullable(); $table->string('lang')->nullable();
                } elseif ($name === 'element_types') {
                    $table->integer('element_id'); $table->string('name'); $table->boolean('is_default')->default(false);
                } elseif ($name === 'element_styles') {
                    $table->integer('element_type_id'); $table->string('name'); $table->text('value')->nullable();
                } elseif ($name === 'languages') {
                    $table->string('code');
                } elseif ($name === 'pages') {
                    $table->string('slug'); $table->string('type');
                    $table->string('title')->nullable(); $table->text('content')->nullable();
                } elseif ($name === 'uploads') {
                    $table->text('file_name'); $table->text('external_link')->nullable(); $table->softDeletes();
                } elseif (in_array($name, ['translations', 'app_translations'])) {
                    $table->string('lang'); $table->string('lang_key'); $table->text('lang_value');
                } else {
                    $table->string('name');
                }
            });
        }
        Cache::flush();
        DB::table('element_types')->insert(['id' => 37, 'element_id' => 1, 'name' => 'Wafer King', 'is_default' => 1]);
        DB::table('business_settings')->insert([
            ['type' => 'header_element', 'value' => '37'], ['type' => 'homepage_select', 'value' => 'waferking'],
        ]);
    }

    public function test_header_selector_handles_orphaned_seed_and_uses_actual_layout_id(): void
    {
        app('view')->getFinder()->prependLocation(base_path('tests/Fixtures/views'));
        $html = (new WebsiteController())->select_header(new Request())->render();
        $this->assertMatchesRegularExpression('/name="header_element"\s+value="37"\s+checked/', $html);
        $this->assertStringContainsString('waferking-logo.svg', $html);
        $this->assertStringNotContainsString('Active Ecommerce', $html);
    }

    public function test_invalid_header_save_preserves_current_selection(): void
    {
        DB::table('element_types')->insert(['id' => 38, 'element_id' => 2, 'name' => 'header2']);
        DB::table('element_types')->insert(['id' => 39, 'element_id' => 1, 'name' => 'missing-header']);
        foreach ([null, 999, 38, 39] as $id) {
            try {
                (new BusinessSettingsController())->select_header(new Request(['header_element' => $id]));
                $this->fail('Invalid header must be rejected');
            } catch (ValidationException $e) {
                $this->assertArrayHasKey('header_element', $e->errors());
                $this->assertSame('37', DB::table('business_settings')->where('type', 'header_element')->value('value'));
            }
        }
    }

    public function test_valid_header_save_applies_styles_and_requires_permission(): void
    {
        DB::table('element_styles')->insert(['element_type_id' => 37, 'name' => 'top_header_bg_color', 'value' => '#ffffff']);
        (new BusinessSettingsController())->select_header(new Request(['header_element' => 37]));
        $this->assertSame('#ffffff', get_setting('top_header_bg_color'));
        $this->assertContains('permission:select_header', Route::getRoutes()->getByName('settings.select-header')->gatherMiddleware());
    }

    public function test_waferking_home_editor_redirects_without_a_legacy_page_record(): void
    {
        $response = (new PageController())->edit(new Request(['page' => 'home']), 'home');
        $this->assertSame(route('website.waferking-settings'), $response->getTargetUrl());
    }

    public function test_resource_page_routes_support_ids_and_locale_defaults(): void
    {
        DB::table('pages')->insert(['id' => 9, 'slug' => 'about', 'type' => 'custom_page']);
        $controller = new PageController();
        $view = $controller->edit(new Request(), '9');
        $this->assertSame(9, $view->getData()['page']->id);
        $this->assertSame(app()->getLocale(), $view->getData()['lang']);
        $this->assertSame(route('website.pages'), $controller->index()->getTargetUrl());
        $this->assertSame(route('custom-pages.edit', ['id' => 'about']), $controller->show(9)->getTargetUrl());
        DB::table('pages')->insert(['id' => 10, 'slug' => 'contact-us', 'type' => 'contact_us_page']);
        $this->assertSame('backend.website_settings.pages.contact_us_page_edit', $controller->edit(new Request(), '10')->name());
    }

    public function test_portfolio_header_uses_existing_editor_and_permission(): void
    {
        $this->assertSame(route('website.header'), (new WebsiteController())->portfolio_header(new Request())->getTargetUrl());
        $this->assertContains('permission:header_setup', Route::getRoutes()->getByName('website.portfolioheader')->gatherMiddleware());
    }

    public function test_stale_header_selection_redirects_to_selector(): void
    {
        DB::table('business_settings')->where('type', 'header_element')->update(['value' => '999']);
        Cache::flush();
        $this->assertSame(route('website.select-header'), (new WebsiteController())->header(new Request())->getTargetUrl());
        $this->assertSame('waferking', get_element_type_by_id(999));
    }

    public function test_header_parent_repair_is_idempotent_and_preserves_existing_name(): void
    {
        $migration = require database_path('migrations/2026_10_01_000001_restore_header_element.php');
        $migration->up();
        $this->assertSame('Header', DB::table('elements')->where('id', 1)->value('name'));
        DB::table('elements')->where('id', 1)->update(['name' => 'Custom Header']);
        $migration->up();
        $this->assertSame('Custom Header', DB::table('elements')->where('id', 1)->value('name'));
        $this->assertSame(1, DB::table('elements')->count());
    }

    public function test_website_route_names_are_unique_and_legacy_urls_stay_compatible(): void
    {
        $names = [];
        foreach (Route::getRoutes() as $route) {
            if (str_starts_with($route->uri(), 'admin/website') && $route->getName()) {
                $this->assertNotContains($route->getName(), $names, $route->uri());
                $names[] = $route->getName();
            }
        }
        $this->assertStringEndsWith('/admin/website/custom-pages/edit/about', route('custom-pages.edit', ['id' => 'about']));
        $this->assertStringEndsWith('/admin/website/custom-pages/destroy/9', route('custom-pages.destroy', 9));
    }

    public function test_headless_homepage_keeps_legacy_blade_routes_on_an_available_theme(): void
    {
        $this->assertSame('classic', get_frontend_layout());
        $this->assertSame('frontend.product_details', view()->first(['frontend.'.get_frontend_layout().'.product_details', 'frontend.product_details'])->name());
        foreach (['partials.product_box_1', 'partials.last_view_product_box_1', 'partials.newest_products_section'] as $view) {
            $this->assertTrue(view()->exists('frontend.'.get_frontend_layout().'.'.$view), $view);
        }
        foreach (['classic', 'metro', 'minima', 'megamart', 'reclassic', 'thecore'] as $layout) {
            DB::table('business_settings')->where('type', 'homepage_select')->update(['value' => $layout]);
            Cache::flush();
            $this->assertSame($layout, get_frontend_layout());
        }
    }

    public function test_legacy_homepage_editor_has_an_idempotent_baseline_without_overwriting_content(): void
    {
        DB::table('business_settings')->where('type', 'homepage_select')->update(['value' => 'classic']);
        Cache::flush();
        $migration = require database_path('migrations/2026_10_01_000002_restore_home_page.php');
        $migration->up();
        $view = (new PageController())->edit(new Request(['page' => 'home']), 'home');
        $this->assertSame('backend.website_settings.pages.classic.home_page_edit', $view->name());
        $this->assertNotNull($view->getData()['page']->id);
        DB::table('pages')->where('slug', 'home')->update(['title' => 'Custom Home', 'content' => 'Keep this content']);
        $migration->up();
        $this->assertSame(1, DB::table('pages')->count());
        $this->assertSame('Keep this content', DB::table('pages')->where('slug', 'home')->value('content'));
    }

    public function test_uninstalled_portfolio_page_editor_returns_not_found_instead_of_server_error(): void
    {
        DB::table('pages')->insert(['slug' => 'about', 'type' => 'custom_page']);
        $this->expectException(\Symfony\Component\HttpKernel\Exception\NotFoundHttpException::class);
        (new PageController())->edit(new Request(['page' => 'portfolio']), 'about');
    }

    public function test_rebranding_replaces_legacy_header_without_overwriting_waferking_edits(): void
    {
        DB::table('element_types')->insert(['id' => 40, 'element_id' => 1, 'name' => 'header1', 'is_default' => 1]);
        DB::table('business_settings')->where('type', 'header_element')->update(['value' => '40']);
        $migration = require database_path('migrations/2026_10_01_000003_rebrand_header_layout.php');
        $migration->up();
        $this->assertSame('37', (string) DB::table('business_settings')->where('type', 'header_element')->value('value'));
        $this->assertSame('#fdf9f3', DB::table('business_settings')->where('type', 'middle_header_bg_color')->value('value'));
        $this->assertSame(0, DB::table('element_types')->where('id', 40)->value('is_default'));
        DB::table('business_settings')->where('type', 'middle_header_bg_color')->update(['value' => '#ffcc00']);
        $migration->up();
        $this->assertSame('#ffcc00', DB::table('business_settings')->where('type', 'middle_header_bg_color')->value('value'));
        $this->assertSame(1, DB::table('element_types')->where('name', 'Wafer King')->count());
        Cache::flush();
        $this->assertSame([37], (new WebsiteController())->select_header(new Request())->getData()['element_types']->pluck('id')->all());
    }

    public function test_header_logo_preview_uses_uploaded_asset_urls(): void
    {
        config(['filesystems.default' => 'local']);
        DB::table('uploads')->insert(['id' => 1, 'file_name' => 'uploads/all/logo.svg']);
        $controller = new WebsiteController();
        $data = $controller->getFileName(new Request(['id' => 1]))->getData(true);
        $this->assertSame(uploaded_asset(1), $data['image_url']);
        $this->assertStringNotContainsString('/public/uploads', $data['image_url']);
        DB::table('uploads')->where('id', 1)->update(['external_link' => 'https://assets.example/logo.svg']);
        $this->assertSame('https://assets.example/logo.svg', $controller->getFileName(new Request(['id' => 1]))->getData(true)['image_url']);
    }
}
