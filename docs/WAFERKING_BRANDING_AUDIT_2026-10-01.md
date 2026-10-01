# Wafer King branding cleanup — 2026-10-01

Website Setup now has a Wafer King settings page and a Wafer King homepage option. Selecting it redirects Laravel's homepage to `STOREFRONT_URL`; the local selection points to `http://127.0.0.1:3001`. Existing appearance, logo and CMS editors remain the source of business settings. The separate frontend owns its layout; legacy Blade layout controls do not redesign it.

| Area | Action |
| --- | --- |
| Admin Website Setup | Replaced the RudraSpirit settings link and preview; removed Mukhi and legacy hero-slide controls. The old settings URL redirects to the new page with the same admin permissions. |
| Homepage and authentication selectors | Added the working Wafer King homepage option; removed RudraSpirit choices and reject attempts to save them. Generic ecommerce layouts remain available. |
| Appearance | Removed obsolete RudraSpirit color presets and their JavaScript. Standard branding and SEO editors remain. |
| Stored identity and SEO | `waferking:sync-branding` fills missing settings and replaces legacy Rudra/Shiva/Mukhi/Zolo Cart values. It preserves other admin values, including localized settings. `--dry-run` previews changes. |
| Branding commands | Fixed creation of missing business settings at the model. The legacy `shivarudraksha:sync` command now aliases the safe Wafer King sync and cannot delete catalog data or restore the old brand. |
| Local logos | Registered the existing Wafer King SVG through `brand:logo` for header, footer, admin logos and favicon. |
| Customer routes | Shop, FAQ, About and Contact redirect to the configured Wafer King frontend. Removed Rudraksha detail, guide, knowledge, maintenance, Lord Shiva and recommendation routes. |
| Defaults and feeds | Application and mail sender defaults use Wafer King. Product feed branding falls back to the application name. Root catalog fallback is `wafer-biscuits`. |
| Deployment | `deploy.sh` runs the safe branding sync. Direct PowerShell deployment requires an explicit SSH host and user, replacing the old hard-coded server. The workflow uses existing SSH secrets; configure those for the Wafer King host before production deployment. |
| Crawlers | Removed the previous brand and old-domain sitemap URL from `public/robots.txt`. Add the approved production storefront sitemap URL at cutover. |
| Legacy internal code and data | Retained dormant controllers, models, theme views/assets, migration names, table names, seed data and compatibility route/helper identifiers. Removed their active admin exposure and dedicated customer routes; no tables, products or orders were deleted. |
| V2 API and licensing | Unchanged. Internal engine/repository naming is retained. |

Before changing local settings, saved the existing branding rows to `storage/app/waferking-branding-before-2026-10-01.json`. The original local motto, `Black rice wafers`, is preserved. Local stored settings and CMS pages contained no Rudra/Shiva branding.

Validation: targeted branding and route safety tests use SQLite in memory, leaving the store database untouched. Checks cover dry-run, preservation of edits and translations, repeat execution, the legacy command alias, missing setting creation, public redirects, disabled routes, admin permission and rejection of obsolete selectors. Changed Blade views compile and pass PHP syntax checks. No V2 source files changed.

Eight targeted tests pass with 53 assertions. Authenticated browser verification confirms the Wafer King settings page, menu navigation, selected homepage and successful save. The save shows its success message with no browser console errors. The Laravel homepage returns a redirect to the configured local storefront. The existing PHPUnit XML emits one deprecation notice.
