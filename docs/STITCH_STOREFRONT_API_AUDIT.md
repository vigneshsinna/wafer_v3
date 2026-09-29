# Stitch storefront to Laravel V3 API map

Stitch project `8109637399058163454`. Source files and screenshots are in `.stitch/designs`; one Markdown record per screen is in `docs/stitch-screens`.

| Stitch screen | Live data source | Integration rule |
| --- | --- | --- |
| Homepage | `GET /settings`, `GET /products`, product review summary | Product cards, stock, prices, images, ratings and cart actions use API data. Editorial design copy is static. |
| Product detail | `GET /products/{slug}`, reviews endpoints, wishlist and cart endpoints | Product description, price, stock, images, reviews and related products come from API. |
| One-page checkout | Authenticated cart, addresses, `POST /checkout/summary`, payment config, Razorpay start/confirm | Totals, GST, shipping, discounts and payment methods come from server. No client-calculated charges or fake coupon success. |
| Order tracking | `GET /track/{code}` | Public API currently supplies code, status and creation date. Courier scans, location and ETA are unavailable. |
| Brand story | `GET /pages/about` | Managed content comes from admin. Editorial layout follows Stitch. |
| Contact | `GET /settings`, `POST /contact` | Contact details come from settings; submission uses contact endpoint. |
| Customer dashboard | `GET /user/profile`, `/user/addresses`, `/orders`, `/user/wishlist` | Name, counts, addresses and orders come from authenticated API. |
| Order success | `GET /orders/{code}` | Show only paid order data owned by current user. Suggested products use `/products`. |
| Registration | `POST /auth/register` | Email registration with an optional phone number is supported. Delivery PIN is managed through addresses; notification consent is unavailable. |
| Sign in | `POST /auth/login`, forgot/reset password endpoints | Email and phone password login supported. One-time passcode is unavailable. |
| FAQ | `GET /pages/faq` | Admin-managed FAQ HTML is returned as structured categories and questions for search and accordions. The seed only fills an empty page. |
| Logo | Imported Stitch SVG at `storefront/public/images/logo.svg` | Header and footer render the exact 240 × 60 vector. |

Unsupported Stitch actions remain visible with honest disabled or help states until an engine endpoint exists: one-time passcode, subscriptions, saved cards, courier scan timeline, PDF invoice, reorder, and coupon validation. Product, order, address, rating, price, tax, and shipping values come from the Laravel V3 engine. The screen's sample names, order IDs, prices, and health claims are reference data, never live storefront data.
