<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ReleaseRouteSafetyTest extends TestCase
{
    public function test_legacy_entry_points_and_v3_admin_api_are_not_registered(): void
    {
        $uris = array_map(fn ($route) => $route->uri(), Route::getRoutes()->getRoutes());

        foreach (['update', 'update/step1', 'update/step2', 'update/step3', 'purchase_code',
            'admin/update', 'admin/system/update', 'system/sitemap-item-add/{item}'] as $uri) {
            $this->assertNotContains($uri, $uris);
        }

        $this->assertSame([], array_values(array_filter($uris,
            fn ($uri) => str_starts_with($uri, 'api/v3/admin'))));
        $this->assertTrue(Route::has('api.v3.products.index'));
    }
}
