# Wafer King migration audit — 2026-09-28

## A. Release verdict: NOT READY FOR LIVE PAYMENTS

The local catalog, admin, and storefront render. Razorpay checkout is implemented, but payment is unavailable without test credentials and an enabled payment method. Keep live checkout disabled until a test transaction passes.

## B. Blocking issues

1. V3 now implements Razorpay order creation, signature verification, signed capture webhook, transactional paid-order creation, idempotent stock handling, and refund on changed cart or stock. Mocked purchase tests pass; a real test transaction remains pending.
2. The local database has no Laravel shipping type or paid rate. The approved free shipping thresholds are implemented, and checkout rejects missing rates. Set and test a real rate below each threshold in admin.
3. Razorpay test keys and webhook secret are absent. No end-to-end Razorpay transaction, invoice, payment status, stock deduction, or refund behavior has been verified.
4. The current repository cannot recreate its core schema from Laravel migrations alone. The local schema was recovered from historical `69de174:shop.sql`; a supported, reviewable base schema/bootstrap path is needed for deployment.
5. V3 purchase now writes the GST extracted from listed prices into paid order details. Reconcile the legacy invoice view against an actual Razorpay test order before release.
6. SMTP is unset. Customer email delivery cannot be verified. Legal, shipping, and product claims also need business approval before public cutover.

## C. Non-blocking issues

- Only 12 sample PIN records exist. Format validation works; full address/PIN coverage remains unproven.
- The original location dump may be stale. Imported counts: 246 countries, 4,091 states, 47,940 cities. Test representative Indian addresses against current operational rules.
- Four local products use 50 units each. Admin changes are preserved by `waferking:seed-catalog` on rerun.
- The original AIZ admin asset bundle is absent from the available Git history. Replacement assets restore tested admin screens, but advanced legacy controls across the full admin cannot be certified without further screen-by-screen testing.
- The Laravel Blade storefront still contains legacy content. Deploy Next.js as the customer storefront and review any publicly reachable Laravel web pages.

## D. Security findings

- V3 customer routes use Sanctum; V3 admin routes use Sanctum plus admin middleware. Public tracking returns only paid order code, delivery status, and date.
- 401 and 404 V3 errors use the standard envelope. CORS permits the configured origin. Local `.env` and `storefront/.env.local` are ignored by Git.
- Targeted key scan found no new Razorpay/AWS/private-key values in migrated storefront code. Production secrets and `APP_DEBUG=false` remain deployment requirements.
- The `/success` page now confirms an authenticated paid order before showing success. A guessed or unpaid order code shows order status instead.

## E. Payment integrity findings

V3 Razorpay init, signature verification, signed capture webhook, paid-order transaction, stock locking, and refund on changed cart or stock are implemented. Mocked tests verify one paid order and one stock deduction after repeated confirmation. The local GST/cart check produced ₹115 gross = ₹109.52 net + ₹5.48 GST; five units produced ₹575 gross and free Tamil Nadu shipping. A temporary ₹80 Laravel flat rate produced ₹195 for one unit, then rolled back. These checks do not prove live invoice or Razorpay totals.

## F. V2 regression status

No differences from `main` under `routes/api.php`, `routes/api_seller.php`, `app/Http/Controllers/Api/V2/`, or `app/Http/Resources/V2/`. V2 runtime flows were not exercised.

## G. Frontend build status

`npm run build` passed with Next.js compilation, lint, and type checking. Browser showed four Laravel products at ₹115/₹120 with all four Laravel-hosted images loaded. A bogus `/success?order_id=bogus` did not show payment success. Frontend source has no FastAPI or SQLite runtime reference.

## H. Laravel test status

Earlier full suite passed: 15 tests, 32 assertions. Product API returned four in-stock products and valid media URLs. Current targeted Razorpay purchase and checkout policy tests passed: 3 tests, 27 assertions. Live Razorpay acceptance testing remains pending test credentials.

## I. Remaining FastAPI/SQLite references

None in `storefront/src`. The separate source checkout still contains the old FastAPI/SQLite backend and is not a runtime dependency of this storefront.

## J. Remaining Rudra-specific references

No matching reference in `storefront/src`. About 45 Laravel application/view files retain legacy Rudra/Rudraksha/Shiva/Mukhi references. They include internal compatibility code and legacy customer-facing Blade views; review public Laravel routing before cutover.

## K. Files changed during this audit

- `app/Console/Commands/SeedWaferKingCatalog.php`
- `app/Services/Cart/CartService.php`
- `app/Services/Checkout/CheckoutService.php`
- `tests/Unit/V3CheckoutPolicyTest.php`
- `storefront/src/components/products/ProductCard.tsx`
- `storefront/src/components/products/ProductDetail.tsx`
- `storefront/src/components/cart/CartDrawer.tsx`
- `storefront/src/app/success/page.tsx`
- `docs/WAFERKING_OPERATIONS.md`
- This report
- Ignored local `.env` and `storefront/.env.local` for the isolated MySQL and browser smoke test

## L. Exact commands run

Relevant successful commands: `php artisan migrate:status --no-ansi`; `php artisan waferking:seed-catalog --no-ansi` (repeated to prove idempotence); `php artisan waferking:import-media --no-ansi`; `php artisan optimize:clear --no-ansi`; `php artisan route:list --path=api/v3 --no-ansi`; `php artisan test --no-ansi`; `php artisan test tests/Unit/V3CheckoutPolicyTest.php --no-ansi`; `npm run build` (twice); `git diff --check`; `git diff --name-only main -- routes/api.php routes/api_seller.php app/Http/Controllers/Api/V2 app/Http/Resources/V2`. HTTP and browser smoke checks used local ports 8081 and 3000. Database smoke inserts were rolled back. `npm ci` was not needed because lockfile dependencies were already installed and the production build passed.

## M. Recommended next action

Configure approved Laravel shipping rates, SMTP, and Razorpay test credentials. Run a real Razorpay test purchase, signed webhook, refund, and invoice reconciliation. Import a supported base schema for repeatable deployment; then obtain business approval for content and cutover.
