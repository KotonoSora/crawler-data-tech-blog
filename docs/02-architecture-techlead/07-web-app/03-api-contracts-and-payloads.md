# 03 — API Contracts and Payloads

Spec 06 owns the server contract; this file freezes (a) how the MFE bundles are hosted at the
nginx edge, (b) route → MFE mapping, (c) the element/event composition contract, and (d) which
`/api/v1` endpoints each MFE calls. A path or field change in spec 06 lands here and in file 02 in
the same change.

DEVIATION CARRIED (2026-10-19): single SPA → microfrontends (file 01); the hosting and composition
contracts below are new.

## 1. MFE hosting contract (nginx web image, same origin)

| Location | Serves | Fallback | Cache |
|---|---|---|---|
| `/` (all unmatched paths) | shell app from `web/dist` | `try_files $uri /index.html` (SPA history) | `index.html` no-cache; hashed assets immutable 30 d |
| `/mfe/<app>/tb-<app>.js` | remote prod bundle, static file only | none — a missing bundle is 404, never `index.html` | `no-cache` (fixed names, manual deploys; ETag revalidate) |
| `/api/` | api-service:8080 proxy (spec 06; unchanged) | — | no caching |

All responses: CSP `'self'` only (file 05); remotes are same-origin local bundles, so
`script-src 'self'` covers them; 0 CDN origins. Build layout: `web/dist/` = shell (`index.html`,
`assets/*`) + `mfe/catalog/tb-catalog.js`, `mfe/reader/tb-reader.js`, `mfe/admin/tb-admin.js`.

## 2. Route → MFE mapping (frozen; BA 04 §1)

| Route | Owner | Element (attributes) | Notes |
|---|---|---|---|
| `/` | catalog | tb-catalog-app (`view=dashboard`) | sources overview |
| `/sources/:key` | catalog | tb-catalog-app (`view=source`, `source-key`) | source detail + article list |
| `/articles` | catalog | tb-catalog-app (`view=articles`) | searchable table; URL query `q`, `source`, `page`, `size` |
| `/articles/:id` | reader | tb-reader-app (`article-id`) | Markdown reader + raw link |
| `/jobs` | admin | tb-admin-app (no `job-id`) | jobs table + manual triggers |
| `/jobs/:id` | admin | tb-admin-app (`job-id`) | detail incl. cancel |
| any other path | shell | — | shell 404 route |

Shell owns header/nav on every route.

## 3. Element attribute + event contract

| Element | Attributes read | Emits |
|---|---|---|
| tb-catalog-app | `view`, `source-key`, `q`, `page`, `size` | `tb:navigate` |
| tb-reader-app | `article-id` | `tb:navigate` |
| tb-admin-app | `job-id` | `tb:navigate` |

Attribute semantics: file 02 §3. Event payload (bubbling + composed; the only way up):

```ts
detail: { to: string; replace?: boolean }   // to = app-root-relative path incl. query
```

| Rule | Detail |
|---|---|
| Event name | `tb:navigate` (constant `MF_NAVIGATE` in `@techblog/shared/mfe`) |
| Dispatch | `requestNavigate(el, to, replace?)`; remotes never touch history/router |
| Handling | shell listens at its root, calls `navigate(to, {replace})`; unknown path → 404 |

## 4. REST usage per MFE (single client: `@techblog/shared` `api.ts`)

Paths and payloads mirror spec 06 file 03 §2 one-to-one; the typed client is the only fetch path.

| MFE | Call | Used for |
|---|---|---|
| catalog | `GET /api/v1/sources` | dashboard source table |
| catalog | `GET /api/v1/sources/{key}` | source detail |
| catalog | `PATCH /api/v1/sources/{key}` | enable/disable (AC-04) |
| catalog | `GET /api/v1/articles?q=&source=&page=&size=` | article list/search/pagination |
| reader | `GET /api/v1/articles/{id}` | ArticleDetail incl. `contentMarkdown` |
| reader | `GET /api/v1/articles/{id}/content` | "Raw Markdown" link (new tab) |
| reader | `GET /api/v1/articles/{id}/assets/{file}` | images via `img src` |
| admin | `GET /api/v1/sources` | trigger source picker |
| admin | `GET /api/v1/jobs?page=&size=` | jobs table (newest-first, AC-10) |
| admin | `GET /api/v1/jobs/{id}` | job detail counters/status |
| admin | `POST /api/v1/crawl-jobs` | crawl/refresh triggers |
| admin | `POST /api/v1/crawl-jobs/{id}/cancel` | cancel running job |
| admin | `POST /api/v1/articles/{id}/retry` | retry failed article |
| shell | `GET /api/v1/ops/summary` | service banner (OPS-* codes) |

Only `/content` and `/assets/{file}` are loaded directly by the browser; 100% of other calls go
through the wrapper (10 s timeout, ProblemDetail `urn:tech-blog:error:<CODE>` → `UiError`).

Admin trigger payloads:

| Action | Request | Response |
|---|---|---|
| Crawl source now | `POST /api/v1/crawl-jobs` `{"sourceKeys":["cloudflare"],"jobType":"backfill"}` | 202 `{"items":[JobSummary]}` |
| Refresh stale | same path, `{"sourceKeys":[...sources shown stale...],"jobType":"incremental"}` | 202; button disabled when 0 are `stale`; ≤20 keys |
| Cancel | `POST /api/v1/crawl-jobs/{id}/cancel`, no body | 202 JobSummary |
| Retry | `POST /api/v1/articles/{id}/retry`, no body | 202 ArticleSummary (status `queued`) |

## 5. Error display

| Code | UI behaviour |
|---|---|
| CFG-SOURCE-NOT-FOUND | "Unknown source" + link back to sources |
| CFG-INVALID-REQUEST | highlight the invalid field |
| JOB-DUPLICATE-ACTIVE | "A job for this source is already running" + link to job |
| JOB-NOT-FOUND | refresh jobs list |
| JOB-INVALID-STATE | disable action button; show current state |
| JOB-CANCEL-REFUSED | "Too late to cancel — job finishing" |
| ART-NOT-FOUND | article may not be archived yet (status shown in list) |
| OPS-DEPENDENCY-DOWN | shell banner names the dependency |
| OPS-PROJECTION-LAG | shell banner while lag >30 s (`X-Projection-Lag`) |

Messages/actions are frozen in `@techblog/shared` `describe()` (BA 05 §3); client-side codes
`UI-TIMEOUT`, `UI-UNREACHABLE`, `UI-BAD-PAYLOAD`, `UI-UNKNOWN` show a retry action.
