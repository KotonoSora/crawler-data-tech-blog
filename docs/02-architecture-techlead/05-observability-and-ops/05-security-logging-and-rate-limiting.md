# 05 — Security, Logging, and Rate Limiting

## 1. Exposure rules

All host ports bind to 127.0.0.1 only (baseline 04 section 2). Nothing in this spec is public.

| Surface | Host binding | Reachable from | Rule |
|---|---|---|---|
| web (SPA + `/api` proxy) | 127.0.0.1:8090 | local browser | the only user-facing surface |
| api-service REST | 127.0.0.1:8081 -> 8080 | loopback + compose network | `/api/v1/**` proxied by nginx; direct access is debug-only |
| crawler-service internal | 127.0.0.1:8082 -> 8080 | loopback + compose network | `/internal/v1/**` called by api-service only |
| health + `/actuator` (both services) | same as their service | loopback + compose network | metrics/actuator are never public: nginx proxies exactly `/` and `/api/` (verify with `nginx -T`) |
| archive nginx (profile `serving`) | 127.0.0.1:8091 | loopback | GET/HEAD only, `autoindex off`, read-only volume |
| postgres / redis | 127.0.0.1:5432 / 6379 | loopback | debug-only access |

Verification: gate G-G smoke asserts `/api/v1` works via 8090 and that `/actuator/prometheus`
returns 404 through nginx.

## 2. Redaction rules

| Item | Rule |
|---|---|
| Secrets | DB passwords, Redis credentials, env values are never logged; error messages name the dependency, not the URL with credentials |
| Request/response headers | `Authorization`, `Cookie`, `Set-Cookie` are never logged |
| Response bodies | never logged; raw HTML is transient and discarded (BR-08) |
| Contact email (`CRAWLER_CONTACT`) | appears only inside the crawler User-Agent (BR-02); never in logs, metrics, or error details |
| Article content | never logged; log lines carry `articleId` / `jobId` only |
| URL handling | logged URLs use the stored identity form: canonical_url with fragments and tracking params stripped (BR-06) |
| ProblemDetail `detail` | names the failing dependency and the 2 s timeout outcome; no stack traces, no internal paths beyond service names |

## 3. Retention and rotation (frozen numbers)

| Item | Policy |
|---|---|
| App logs | rotate at 100 MB, keep 14 days, both services (NFR-12) |
| fetch_log rows | 90 days, purge pass at boot + job end, batches of 10,000 (file 02 section 4) |
| http_cache rows | 30 days since last check, same batch pattern |
| tmp files | purge pass at boot + job end of entries older than 1 h |
| Archive content | never auto-deleted; manual deletion only (baseline 05 section 4) |

## 4. Metrics cardinality rules

Label sets are closed (file 01 section 3). Allowed keys and maxima:

| Label key | Allowed values | Max values |
|---|---|---|
| source | 20 source keys | 20 |
| host | crawled hosts | 20 |
| discovery_type | feed, sitemap, listing | 3 |
| job_type | backfill, incremental | 2 |
| result | archived, skipped, failed | 3 |
| status_class | 2xx, 3xx, 4xx, 5xx | 4 |
| type | 4 event types (baseline 01 section 3) | 4 |
| code | codes defined in BA 05 + OPS-SOURCE-STALE | fixed set |
| table | fetch_log, http_cache | 2 |
| method, uri, status, outcome | route templates only from http_server_requests | fixed set |

Forbidden as labels: `url`, `canonical_url`, `article_id`, `slug`, `job_id`, `event_id`, `title`.
Enforcement: BE-05-09 label-audit test; any new meter without an entry in file 01's inventory is
rejected in review. Scrape-ready: no scraper is deployed; the operator polls manually (section 5).

## 5. Alert thresholds

| Alert | Signal | Threshold | Check | Action |
|---|---|---|---|---|
| Source stale | `crawler_source_stale` gauge, ops summary `stale=true` | no successful archive for 72 h on an enabled feed source | `crawler_source_stale == 1` or `/internal/v1/ops/summary` | open source in UI; verify feed/sitemap reachability; re-probe source; click "Refresh stale" or retry backfill |
| Disk guard | readiness reason `disk`, ops summary `diskFreeGb` | <5 GB free | `diskFreeGb < 5.0` | free space or move archive volume; crawler already paused jobs (`STORE-DISK-FULL`) |
| Readiness down | `/health/readiness` 503 | down >1 min (4 consecutive 15 s checks) | curl both ports (8081, 8082) | read `reasons[]`; fix named dependency (`db`, `redis`, `flyway`, `disk`); restart only if the process is unresponsive |
| Projection lag | `X-Projection-Lag` header, `api_projection_lag_seconds` | warn >30 s; ERROR if >10 min | header inspection or gauge scrape | inspect `tb:events` consumer; run reconciliation (BA 05 section 4) |
| Host paused | `crawler_host_paused{host}`, ops summary `hosts[].paused` | paused >1 h | ops summary hosts block | inspect last fetch status for the host; adjust per-host delay if 429/403; unpause after a successful probe |

No Prometheus server or alerting service is deployed (out of scope); checks are manual or scripted
via the runbook from DO-05-04. OPS-SOURCE-STALE is the only code introduced by this spec beyond
BA 05's table (a WARN needs a stable code per baseline 06 DoD 3).

## 6. Authentication and rate limiting

| Aspect | Decision |
|---|---|
| Auth | none by design (NFR-25): single local user, no accounts, no sessions |
| Rate limiting (own API) | none: the only client is the local SPA; loopback binds (section 1) are the boundary |
| Crawl politeness | owned by spec 02: 1 concurrent request per host, >=2000 ms delay (Medium-family >=3000 ms), bounded backoff — not part of this spec's surface |
| Accepted risk | any local process on the machine can call `/api/v1` and `/internal/v1`; accepted because all binds are 127.0.0.1 (section 1), data is public article content with no personal data (NFR-27), and no public exposure is permitted (NFR-24) |
| Revisit trigger | any bind moving off 127.0.0.1, or a second machine calling the stack, reopens the auth decision |
