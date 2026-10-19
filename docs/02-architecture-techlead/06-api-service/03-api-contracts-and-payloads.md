# 03 — API Contracts and Payloads

Authoritative contract for the public API of api-service. DTO names/fields follow BA 04 §2; error
codes and HTTP mappings follow BA 05 §3; proxy/cache policy: file 01. JSON examples show trimmed
strings; wire values are complete.

## 1. Conventions

| Item | Rule |
|---|---|
| Base | `/api/v1`; container port 8080; browser path via nginx `127.0.0.1:8090/api/...` |
| Encoding | UTF-8 JSON, camelCase; timestamps ISO 8601 UTC (`2026-10-19T09:15:00Z`) |
| Lists | `{"items":[...],"page":<n>,"size":<n>,"total":<n>}`; `page >= 0`; `size 1..200` default 50; newest-first unless stated |
| Errors | RFC 9457 `application/problem+json`; `type=urn:tech-blog:error:<CODE>` |
| Freshness | `X-Projection-Lag: <integer seconds>` on every `/api/v1` response |
| `contentSha256` | first 12 hex chars (display form; full value in `meta.json`) |

## 2. Endpoints

| Method | Path | Served from | Success | Errors |
|---|---|---|---|---|
| GET | /sources | api_db | 200 `{"items":[SourceSummary]}` (unpaginated; ≤20 sources) | — |
| GET | /sources/{key} | api_db | 200 SourceSummary | 404 CFG-SOURCE-NOT-FOUND |
| PATCH | /sources/{key} | crawler command + optimistic api_db update | 200 SourceSummary | 404, 400 CFG-INVALID-REQUEST, 503 OPS-DEPENDENCY-DOWN |
| GET | /articles?q=&source=&page=&size= | api_db | 200 ListResponse(ArticleSummary) | 400 |
| GET | /articles/{id} | api_db + ContentProxy | 200 ArticleDetail | 404 ART-NOT-FOUND |
| GET | /articles/{id}/content | crawler proxy (cached) | 200 markdown ≤2 MB | 404, 503 |
| GET | /articles/{id}/assets/{file} | crawler proxy | 200 image | 404, 503 |
| GET | /jobs?page=&size= | api_db | 200 ListResponse(JobSummary) | 400 |
| GET | /jobs/{id} | api_db | 200 JobSummary | 404 JOB-NOT-FOUND |
| GET | /jobs/{id}/failures?page=&size= | crawler internal query | 200 ListResponse(JobFailure) | 404 JOB-NOT-FOUND, 503 |
| POST | /crawl-jobs | crawler command | 202 `{"items":[JobSummary]}`, one per source (≤19 with `all:true`) | 400, 404 CFG-SOURCE-NOT-FOUND, 409 JOB-DUPLICATE-ACTIVE, 429, 503 |
| POST | /crawl-jobs/{id}/cancel | crawler command | 202 JobSummary | 404, 409 JOB-CANCEL-REFUSED, 409 JOB-INVALID-STATE, 503 |
| POST | /articles/{id}/retry | crawler command | 202 ArticleSummary (status `queued`) | 404, 409 JOB-INVALID-STATE (not retryable), 429, 503 |
| GET | /ops/summary | api_db + probes | 200 OpsSummary | 503 (api_db unreachable only) |

PATCH body: `{"enabled": <boolean>}`. Retry is refused unless article status is `failed` or
`needs_review`. Cancel is refused for terminal jobs (`JOB-INVALID-STATE`) and for running jobs past
the finishing window (`JOB-CANCEL-REFUSED`). Non-archived articles return 404 ART-NOT-FOUND with the
current status in `detail` (BA 05 §3).

UI convenience "Refresh stale": the SPA collects keys with `health=stale` (72 h) from
`GET /sources` and posts them as `sourceKeys` to `POST /crawl-jobs`; there is no separate endpoint
and no background auto-refresh.

## 3. Examples

GET /api/v1/sources → 200
```json
{"items":[{"key":"slack","name":"Slack Engineering","enabled":true,"discoveryType":"feed",
"articleCount":312,"archivedCount":308,"failedCount":4,"lastSuccessAt":"2026-10-19T03:12:44Z",
"health":"fresh","updatedAt":"2026-10-19T03:12:46Z"}]}
```

GET /api/v1/articles?q=logs&source=cloudflare&page=0&size=50 → 200
```json
{"items":[{"id":"0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341","sourceKey":"cloudflare",
"title":"How we moved 40 PB of logs","slug":"how-we-moved-40-pb-of-logs","author":"A. Engineer",
"publishedAt":"2026-09-30T12:00:00Z","archivedAt":"2026-10-01T03:05:22Z","status":"archived",
"contentSha256":"9f2c1d4e8a7b"}],"page":0,"size":50,"total":308}
```

GET /api/v1/articles/{id} → 200
```json
{"id":"0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341","sourceKey":"cloudflare",
"title":"How we moved 40 PB of logs","slug":"how-we-moved-40-pb-of-logs","author":"A. Engineer",
"publishedAt":"2026-09-30T12:00:00Z","archivedAt":"2026-10-01T03:05:22Z","status":"archived",
"contentSha256":"9f2c1d4e8a7b","contentMarkdown":"# How we moved 40 PB of logs\n...(trimmed)",
"assetBasePath":"/api/v1/articles/0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341/assets",
"originalUrl":"https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/?utm_source=rss",
"sourceUrl":"https://blog.cloudflare.com/rss/","fetchedAt":"2026-10-01T03:05:20Z"}
```

POST /api/v1/crawl-jobs → 202; request `{"sourceKeys":["slack","cloudflare"],"jobType":"backfill"}`
or `{"all":true,"jobType":"incremental"}`
```json
{"items":[{"id":"0192f0c9-1b77-7a2e-8c10-4d9e5b2a0011","sourceKey":"slack","jobType":"backfill",
"status":"pending","requestedAt":"2026-10-19T09:20:01Z","startedAt":null,"finishedAt":null,
"discoveredCount":0,"archivedCount":0,"skippedCount":0,"failedCount":0}]}
```

GET /api/v1/ops/summary → 200
```json
{"checkedAt":"2026-10-19T09:20:05Z","projectionLagSeconds":3,
"services":[{"service":"api-service","status":"UP","checkedAt":"2026-10-19T09:20:05Z",
"details":["api_db: UP","redis: UP","consumer: api-projections, lag 3 s"]},
{"service":"crawler-service","status":"UP","checkedAt":"2026-10-19T09:20:05Z",
"details":["internal-api: UP 14 ms"]}]}
```

## 4. ProblemDetail examples

```json
{"type":"urn:tech-blog:error:CFG-SOURCE-NOT-FOUND","title":"Unknown source","status":404,
"detail":"No source with key 'nope'.","instance":"/api/v1/sources/nope"}
{"type":"urn:tech-blog:error:JOB-DUPLICATE-ACTIVE","title":"Job already active","status":409,
"detail":"Source 'slack' has an active job (0192f0c9-1b77-...).","instance":"/api/v1/crawl-jobs"}
{"type":"urn:tech-blog:error:JOB-INVALID-STATE","title":"Invalid job state","status":409,
"detail":"Job '0192f0c9-1b77-...' is 'completed'; cancel is not allowed.",
"instance":"/api/v1/crawl-jobs/0192f0c9-1b77-.../cancel"}
```

## 5. Command proxy mapping

| API call | crawler `/internal/v1` call | Result mapping (crawler → API) |
|---|---|---|
| PATCH /sources/{key} | source enable/disable | 404 source → CFG-SOURCE-NOT-FOUND; 409 invalid state → JOB-INVALID-STATE |
| POST /crawl-jobs | start job(s) | 409 duplicate active → JOB-DUPLICATE-ACTIVE; 404 source → CFG-SOURCE-NOT-FOUND |
| POST /crawl-jobs/{id}/cancel | cancel job | 404 job → JOB-NOT-FOUND; 409 → JOB-CANCEL-REFUSED or JOB-INVALID-STATE |
| POST /articles/{id}/retry | retry article | 404 article → ART-NOT-FOUND; 409 → JOB-INVALID-STATE |
| GET /jobs/{id}/failures | job failures query | 404 job → JOB-NOT-FOUND |

Policy for all five: connect 2 s / read 5 s; exactly 1 retry on 5xx after 200 ms jitter; no retry on
4xx; 5xx, timeout, or connection refused → 503 OPS-DEPENDENCY-DOWN. After a successful PATCH,
api-service sets `source_summary.enabled` optimistically to the requested value; the next
`source.stats` event or the next reconciliation pass corrects any mismatch.

## 6. Validation

| Input | Rule | Violation |
|---|---|---|
| q | ≤200 chars trimmed; blank → no filter | 400 CFG-INVALID-REQUEST |
| page | ≥0 | 400 |
| size | 1..200, default 50 | 400 |
| source filter, {key} | `^[a-z0-9][a-z0-9-]{0,63}$` | 400 / 404 |
| sourceKeys | 1..20 entries; exactly one of `sourceKeys` / `all:true` | 400 |
| jobType | `backfill` or `incremental` | 400 |
| enabled | boolean, required in body | 400 |
| Body | ≤16 KB, valid JSON; unknown fields ignored | 400 |
| {file} | `^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$`; no `/`, no `..` | 404 ART-NOT-FOUND |

## 7. Content and asset proxy

| Item | Rule |
|---|---|
| Fetch path | content: crawler `/internal/v1/articles/{id}/content` (`text/markdown`, ≤2 MB); assets: `/internal/v1/articles/{id}/assets/{file}` (binary, ≤50 MB) |
| Cache | TTL 300 s; only bodies ≤200 KB cached per article; ≤200 entries total (≤40 MB); assets not cached |
| Cache-Control | content `no-store`; assets `private, max-age=86400` |
| ArticleDetail | `contentMarkdown` filled from the same cache/passthrough path (single fetch source) |
| Failure | crawler 404 → 404 ART-NOT-FOUND; crawler down/timeout → 503 OPS-DEPENDENCY-DOWN |
