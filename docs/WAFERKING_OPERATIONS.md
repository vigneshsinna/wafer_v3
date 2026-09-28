# Wafer King migration handoff

The storefront uses Laravel V3. Razorpay checkout is implemented and remains unavailable until the admin saves a test key, secret, and webhook secret, then activates Razorpay.

Local MySQL uses the separate FlyEnv MySQL 8.4.11 instance on `127.0.0.1:3307` and database `waferking_local`. Core tables came from the historical `69de174:shop.sql` schema; current Laravel migrations alone cannot recreate them. Location reference data came from that dump. A fresh installation needs a supported base schema import before `php artisan migrate`.

## Catalog and media

Run `php artisan waferking:seed-catalog` after creating a Laravel admin user. The command creates missing catalog rows and preserves existing product prices, stock, and admin edits. Initial local stock is 50 units per product. Manage later changes in Laravel admin at `/login` and `/admin`.

The four products have stable slugs:

| Product | Slug |
| --- | --- |
| Hibiscus Wafer Biscuit | `hibiscus-wafer-biscuit` |
| Avarampoo Wafer Biscuit | `avarampoo-wafer-biscuit` |
| Vallarai Wafer Biscuit | `vallarai-wafer-biscuit` |
| Makhana Wafer Biscuit | `makhana-wafer-biscuit` |

Approved listed prices are ₹115 for Hibiscus, Avarampoo, and Vallarai, and ₹120 for Makhana. These prices include 5% GST. V3 cart and checkout extract GST from the listed price; the existing legacy order and invoice path has not been reconciled. Do not use a 5% additive product-tax row for these prices.

Run `php artisan waferking:import-media --dry-run` to check source images, then `php artisan waferking:import-media` to register images through Laravel uploads. The command leaves existing product images untouched. Run it again safely if interrupted. If storefront and Laravel are deployed separately, run it in the migration checkout where `storefront/public/images` exists before splitting deployment artifacts.

The original AIZ admin asset bundle was absent from the available Git history. Replacement CSS and JavaScript support the tested dashboard, settings, catalog, orders, and page editor. Check any additional legacy admin screen before relying on its advanced controls.

## Shipping

Checkout summary uses free shipping at ₹499 or more for Tamil Nadu and ₹699 or more for other Indian states. Below the threshold it calls Laravel's configured shipping rates. Set a shipping type and rate in `/admin/shipping_configuration` before checkout. Missing rates stop checkout. Carrier wise shipping needs a selection flow before it can be offered in the storefront. The local India, state, and city records are enabled. Only 12 sample PIN rows are present; import the full approved dataset before enforcing PIN coverage.

## Environment and operations

- Set `APP_NAME`, `APP_TIMEZONE=Asia/Kolkata`, `STOREFRONT_URL`, and exact `API_CORS_ORIGINS` for the deployment.
- Set the SMTP variables and `MAIL_FROM_NAME="Wafer King"`; verify reset, order, cancellation, and refund mail where enabled.
- Save Razorpay test `RAZOR_KEY`, `RAZOR_SECRET`, and `RAZOR_WEBHOOK_SECRET` in `/admin/payment-method`, then activate Razorpay there. Configure the signed `payment.captured` webhook at `/api/v3/checkout/razorpay/webhook` on the public Laravel origin. Never put secrets in the storefront.
- Run Laravel's scheduler each minute in production. The existing scheduler refreshes currency rates daily. Use a supervised queue worker if production switches from `QUEUE_CONNECTION=sync` to an asynchronous queue.
- Review About, FAQ, Privacy, Terms, Refund, Return, Shipping, and Contact content with the business owner before release.

## Cutover gate

The local schema and V3 payment initialization, signature verification, stock locking, idempotency, refund on changed cart or stock, and signed webhook handling are implemented. Mocked order tests pass. Keep Razorpay inactive until an admin configures shipping rates, SMTP, and Razorpay test keys, then completes a test purchase and refund with Razorpay. Review invoice totals and business page copy before release. Do not push the imported private storefront to the public target repository.
