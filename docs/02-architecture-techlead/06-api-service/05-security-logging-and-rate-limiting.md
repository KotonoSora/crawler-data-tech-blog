# 05 — Security, Logging and Rate Limiting

Scope: api-service. Complements BA 05 (error codes), baseline 04 (nginx headers/edge) and baseline 05
(log retention). Numbers here are the enforced configuration values.

## 1. Exposure and authentication

| Item | Rule |
|---|---|
| Auth | none by design (NFR-25; single local user) |
| api-service port | container 8080; host bind `127.0.0.1:8081:8080` (loopback only) |
| Browser entry | nginx `127.0.0.1:8090` → `/api/` → `api-service:8080` (baseline 04 §4) |
| crawler internal | `/internal/v1` reachable on the compose network only; never published |
| Public exposure | forbidden (NFR-24); a non-loopback bind is a misconfiguration, fixed in `deploy/compose.yaml` |
| Security headers | owned by nginx (nosniff, Referrer-Policy, CSP — baseline 04 §4); api-service adds none |
| Accepted risk | any local process on the host can call the command API on `127.0.0.1:8081` (no auth). Accepted for a single-user machine; revisit trigger: any non-loopback exposure or second user, then add auth before shipping |

## 2. CORS

| Context | Policy |
|---|---|
| Production (nginx, same origin `127.0.0.1:8090`) | no CORS headers emitted; cross-origin access is not supported |
| Dev profile (`SPRING_PROFILES_ACTIVE=dev`) | allow exactly `http://localhost:5173` (Vite dev server); methods GET, POST, PATCH, OPTIONS; request header Content-Type; max-age 600 s; credentials off |
| All other origins | rejected; never `*` |

## 3. Action rate limits

| Action | Key | Limit | Over-limit response |
|---|---|---|---|
| POST /crawl-jobs | source key | ≤1 request per 10 s per source | 429 + `Retry-After: <1..10>` seconds |
| POST /articles/{id}/retry | article id | ≤1 request per 1 s per article | 429 + `Retry-After: 1` |
| POST /crawl-jobs/{id}/cancel | — | not limited; guarded by state checks (409) | — |

DEVIATION FLAGGED (2026-10-19): BA 05 §3 defines a closed set of 8 error codes with no
rate-limit code, and this file adds throttling. 429 responses therefore carry
`type=urn:tech-blog:error:CFG-INVALID-REQUEST` plus `Retry-After` in seconds. Rationale: keep the code
set stable and the UI on one "fix the action" branch. Budget: 0 new codes, 1 new HTTP status (429).
No expiry; supersede if BA 05 later defines a throttle code.

Implementation: in-process fixed-window counters (≤1,000 keys resident, windows 10 s / 1 s); single
instance, so no distributed state. The crawler-side duplicate guard (BR-18 → 409
JOB-DUPLICATE-ACTIVE) stays authoritative; the limiter only absorbs burst retries.

## 4. Input validation numbers

| Input | Rule | On violation |
|---|---|---|
| q | ≤200 chars trimmed; blank means no filter | 400 CFG-INVALID-REQUEST |
| page / size | page ≥0; size 1..200, default 50 | 400 |
| source filter, {key} | `^[a-z0-9][a-z0-9-]{0,63}$` | 400 / 404 |
| sourceKeys | 1..20 entries; exactly one of `sourceKeys` / `all:true` | 400 |
| jobType | `backfill` or `incremental` | 400 |
| enabled | boolean, required | 400 |
| Request body | ≤16 KB; valid JSON; unknown fields ignored | 400 |
| {file} asset path | `^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$`; reject `/`, `\`, `..`, percent-encoded separators | 404 ART-NOT-FOUND |
| Passthrough sizes | content ≤2 MB; asset ≤50 MB; ≤100 assets per article (BA 04 §5) | passthrough, no buffering beyond cache cap |

## 5. Logging

| Item | Rule |
|---|---|
| Access line | exactly 1 line per request: method, route template (e.g. `/api/v1/articles/{id}`), status, duration ms, response bytes (NFR-30) |
| Never logged | request/response bodies; article content bytes; secrets or env values; query-string values (q logged truncated to ≤64 chars at DEBUG only) |
| Error lines | WARN/ERROR always carry a stable code string (BA 05 §1) and the request instance path |
| Correlation | `eventId` on projection logs; `jobId`/`articleId` on command logs |
| Format and retention | JSON via logstash-logback-encoder to stdout → `data/logs/api-service.jsonl`; 14 days retention, rotate at 100 MB (NFR-12; baseline 05 §4) |

## 6. Metrics

| Metric | Type | Labels | Use / threshold |
|---|---|---|---|
| `api_http_requests_total` | counter | `endpoint` (route template, ≤20 values), `status` (exact code) | dashboards; error spike detection |
| `api_http_request_duration_seconds` | histogram (0.05/0.1/0.2/0.5/1 s buckets) | `endpoint` | NFR-13 p95 ≤200 ms verified per release |
| `api_projection_lag_seconds` | gauge | `consumer` | WARN >30 s (NFR-14); ERROR if >30 s for >10 min (BA 05 §4) |
| `api_command_proxy_failures_total` | counter | `code` (mapped ProblemDetail code) | review when ≥1 in 15 min |
| Exposure | `/actuator/prometheus` on container 8080, loopback-only via the host bind | — | operator polls manually (no scraper deployed) |

## 7. Dependency-down behavior

| Dependency down | Reads | Commands / content | Surface |
|---|---|---|---|
| Redis | served from api_db (no degradation) | unaffected directly; lag rises | readiness 503 names Redis; lag WARN >30 s |
| crawler-service | served from api_db; stale as lag grows | 503 OPS-DEPENDENCY-DOWN after 1 retry | `/ops/summary` shows `DOWN`; `/api/v1/ops/summary` stays 200 |
| api_db | not available | 503 OPS-DEPENDENCY-DOWN | readiness 503 names api_db; liveness stays 200 |
