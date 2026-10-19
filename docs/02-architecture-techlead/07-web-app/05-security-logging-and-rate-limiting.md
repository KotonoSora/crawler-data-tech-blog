# 05 — Security, Logging and Rate Limiting

## 1. Exposure and headers

| Item | Value | Where |
|---|---|---|
| Binding | `127.0.0.1:8090` loopback only (NFR-24); no auth by design (NFR-25) | compose (baseline 04 §2) |
| CSP | `default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'` | nginx web image, all responses |
| MFE compliance | remotes load as same-origin `/mfe/*.js` files, so `script-src 'self'` covers them; 0 external script origins | file 03 §1 |
| `'unsafe-inline'` | never added: styles come from the single external Tailwind stylesheet; components emit 0 inline `style=` attributes | this doc |
| Dev servers | Vite dev (5173/5181-5183) sends no CSP (HMR websocket); CSP applies to the built image only | file 04 |
| Other headers | `X-Content-Type-Options: nosniff`; `Referrer-Policy: no-referrer`; `client_max_body_size 1m` (no uploads) | baseline 04 §4 |

## 2. Content sanitization (reader MFE)

| Rule | Detail |
|---|---|
| Input | crawled Markdown is untrusted; `ArticleDetail.contentMarkdown` (≤2 MB, BA 04) |
| Pipeline | react-markdown + remark-gfm + rehype-sanitize; runs on every render; 0 cache of rendered HTML |
| Raw HTML | never enabled (`rehype-raw` forbidden); script/iframe/style/object/embed/form are dropped |
| `dangerouslySetInnerHTML` | 0 uses; sanitized react-markdown output is the only permitted alternative |
| Links | http/https only, `rel="noopener noreferrer"`; other schemes render as text |
| Images | only `/api/v1/articles/{id}/assets/{file}`; name allowlist `^[A-Za-z0-9._-]{1,80}$`; other refs render alt text, 0 remote requests |
| Raw view | "Raw Markdown" opens `GET /api/v1/articles/{id}/content` in a new tab |

## 3. No third-party delivery

| Rule | Detail |
|---|---|
| CDNs | none: all JS, CSS, fonts and images are self-hosted same-origin; system font stack (no Google Fonts) |
| Fetch base | relative `/api/v1` only; 0 absolute hosts in source or `web/dist` |
| Env | only `import.meta.env.DEV`/`PROD` are read; no secrets in bundles (scan in DO-07-02) |

## 4. Logging

| Item | Rule |
|---|---|
| Production | 0 `console` calls in `web/dist` (scan in DO-07-02) |
| Development | `console.error` only, behind `import.meta.env.DEV`; max 1 line per failed request (method, path, status, error code) |
| Remote loader | 1 dev line per failed remote load; the shell error state + retry is the user-visible signal |
| Never logged | article content, response bodies, job payloads |
| Server-side | requests are logged by nginx and api-service (baseline 05 §4); the web image adds no logging |

## 5. Client-side rate limiting

| Control | Rule |
|---|---|
| Trigger buttons | disabled while a request is in flight; at most 1 `POST /api/v1/crawl-jobs` per 10 s window (extra clicks dropped) |
| Cancel / retry | disabled in flight; re-enabled by the poll result |
| Duplicate handling | `JOB-DUPLICATE-ACTIVE` links the running job; the button stays disabled until a terminal status |
| Search | 300 ms debounce; an older in-flight query is aborted; only the last query is sent |
| Polling | dashboard 60 s; jobs 30 s while `pending`/`running`; stops at terminal status (file 02 §2) |

## 6. Manual ops and dependency hygiene

| Rule | Value |
|---|---|
| CI/CD and cron | none: no pipeline and no scheduled job drives the web build/deploy; the operator runs every command by hand (file 04) |
| Lockfile | `web/package-lock.json` committed; install once at `web/` |
| Pins | exact versions only; no ranges, no `latest`; bumps recorded in baseline 02 §5 and rerun G-A/G-B |
| Audit | `npm audit` runs manually at each release; 0 critical findings required (G-E) |
| New dependency | needs a row here plus baseline 02 §3 with status |
