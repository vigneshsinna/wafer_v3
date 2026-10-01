# Checkout CI and dependency review

## Database-backed tests

CI starts MySQL 8.0 with an empty `waferking_checkout_test` database and runs:

```sh
php artisan test --testsuite=Unit
php artisan test tests/Feature/ReleaseRouteSafetyTest.php
php artisan test tests/Feature/V3CheckoutShippingTest.php tests/Feature/V3RazorpayPurchaseTest.php
```

`Tests\CheckoutTestCase` rebuilds the checkout tables from the schema-only
`tests/Fixtures/checkout-schema.sql` and inserts synthetic products, stock,
locations, settings and an admin. The fixture contains no store records or
credentials. It always selects `waferking_checkout_test`, regardless of the
store database in `.env`, and uses an in-memory cache. Razorpay is mocked.
Provision that separate database before running these tests locally, using
the usual `DB_HOST`, `DB_PORT`, `DB_USERNAME` and `DB_PASSWORD` environment
variables. Do not run these two tests concurrently against the same database.

The tests exercise courier selection, PIN validation, shipping band edges,
seller groups without rates, legacy shipping equivalence and query reduction,
captured payment, duplicate confirmation, stock updates and refund after a
cart changes during payment.

## npm audit review (2026-10-01)

All eight previously reported packages were reviewed and updated explicitly.
No `npm audit fix --force` was used.

| Package | Reported severity / risk | Resolved lockfile version |
| --- | --- | --- |
| next | Critical: server and image optimizer advisories | 15.5.27 |
| sharp | High: vulnerable native image decoders | 0.35.5 |
| postcss | High: attacker-controlled source maps can read files; CSS output XSS | 8.5.28 |
| browserslist | High: query cache and malformed statistics inputs | 4.29.3 |
| nanoid | High: invalid sizes / custom generators | 3.3.19 |
| picomatch | High: pattern injection and excessive regex work | 2.3.2 / 4.0.7 |
| baseline-browser-mapping | Moderate: invalid input crashes | 2.11.26 |
| postcss-selector-parser | Low: uncontrolled AST recursion | 6.1.4 |

Next 14 has no patch for the reported critical advisory. Next 15.5.27 clears
that range while retaining the existing React dependency. Dynamic route
parameters and blog search parameters now use Next 15's asynchronous API.
The standalone output root is explicitly the storefront directory.

Next 15 still pins PostCSS 8.4.31. A scoped npm override uses the patched
direct PostCSS dependency for Next as well; both use PostCSS 8's public API.
The build and TypeScript checks verify this combination. Other transitive
packages were updated within their existing dependency ranges.

CI now runs `npm audit --audit-level=high` after `npm ci`, before the build.
The resolved dependency tree reports **zero vulnerabilities**.

Maintainer references: [Next security advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36),
[Sharp security advisory](https://github.com/lovell/sharp/security/advisories/GHSA-rgj7-g3m4-5g8c),
[Next 15 migration guide](https://nextjs.org/docs/app/guides/upgrading/version-15).
