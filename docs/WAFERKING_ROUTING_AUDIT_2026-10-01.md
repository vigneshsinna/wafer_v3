# Wafer King routing audit — 2026-10-01

## Fixed causes

- Catalog setup created header layouts without their parent `elements` record. The seed now creates the parent; an idempotent migration repairs existing installations without changing names.
- Select Header depended on that missing parent and submitted loop positions instead of layout IDs. It now loads available templates independently and submits actual IDs. Missing layouts produce an empty state; stale selections lead to the selector.
- Header saves accepted invalid IDs and wrote settings before checking the layout. Saves now require `select_header`, validate header ownership and template availability, and commit the selection and styles together.
- The Next.js homepage value `waferking` was used as a Blade directory. `get_frontend_layout()` resolves an installed Blade theme for retained Laravel pages. Updated 49 view references across 35 files, including header previews, product lists, and recently viewed products. Product details use Laravel's existing generic view when a theme has no dedicated view.
- Homepage Settings requested a legacy page that was absent. Wafer King mode redirects to its existing settings overview. A separate migration and seed baseline restore the legacy home record for the other supported layouts, preserving existing content.
- Custom page resource URLs and legacy URLs shared route names. Resource edit/delete names are now distinct; both URL formats remain registered. Editors handle numeric IDs, slug URLs, default language, and Contact correctly. Empty index/show actions redirect to existing screens.
- Portfolio Header points to the existing protected header editor. Unavailable addon page templates now return 404 instead of a missing-view server error.
- Removed all six Active Ecommerce header templates and preview images. The selector and retained Laravel customer pages now use the Wafer King header. A migration switches legacy selections to the branded layout and colours while preserving later edits on reruns.
- Header logo updates now use `uploaded_asset()` URLs, fixing the broken `/public/uploads/` preview path and supporting external uploads.
- Admin sidebar scroll position is saved per browser tab and restored after menu initialization, so navigation and form submissions retain the position.

## Verification

- All 129 admin links collected from the authenticated page match registered routes with existing controller actions. No duplicate names remain in Website Setup.
- Browser checks covered every rendered Website Setup link, all seven CMS page editors, page creation, header settings, homepage redirects, and numeric page editing.
- Header selection was checked in the browser. Semantic Save automation lost its browser connection; using the visible Save button returned to the selector with its selection intact. Isolated tests cover valid saves, invalid saves, styles, and permission registration.
- The customer product URL failed with a missing-view 500 before the fix and now loads in the browser with no console errors. Category, search, in-house, best-selling, and featured-product URLs return 200.
- All seven Next.js CMS links return 200. An unknown backend URL returns 404.
- Browser checks confirmed the branded header and logo at a narrow viewport. Clicking Header Settings, navigating, reloading, and saving the header retained the sidebar offset of 770.4 pixels.
- `php vendor/phpunit/phpunit/phpunit tests/Feature/WebsiteRoutingTest.php tests/Feature/WaferKingBrandingTest.php tests/Feature/ReleaseRouteSafetyTest.php`: 22 tests, 134 assertions pass. The existing PHPUnit configuration has one deprecation notice.
- `node --test tests/Unit/AdminSidebarScrollTest.cjs`: two tests pass, covering restoration, navigation persistence, invalid stored values, and unavailable browser storage.
- Changed PHP passes syntax checks; `git diff --check` passes.

## Scope and rollout

All three migrations were applied to the local database. Deployments must run `php artisan migrate`. Their rollback deliberately retains repaired records and the branded layout so later admin edits are not deleted.

This audit covers rendered admin navigation, Website Setup, and the customer routes affected by homepage theme selection. The historical registry also contains optional addon endpoints whose controllers are not installed. Those endpoints are absent from rendered navigation; addons and the historical V2 API were not changed. No deployment or push was performed.
