# 01 — Architecture and Tech Stack

Scope: structured logs, metrics, health endpoints, staleness detection, and retention for
crawler-service and api-service. Optional Grafana/Prometheus server stack is explicitly out of
scope — metrics are scrape-ready text endpoints only; deployable count stays 3 images + pinned
infra, gate G-G unchanged.

DEVIATION CARRIED (resolved 2026-10-19): baseline 04 section 2 originally listed no bind mounts
for api-service, while baseline 05 section 1 places `data/logs/api-service.jsonl` on disk and
NFR-12 mandates file rotation (14 days / 100 MB). Amended: api-service gets one logs-only mount
`../data/logs:/app/data/logs`; it never sees archive content. Budget: +1 bind mount, 0 images,
0 databases. Rationale: NFR-12 + baseline 05 file layout require a writable log path.

## 1. Component inventory

| Concern | Choice | Deployment |
|---|---|---|
| Structured logging | logstash-logback-encoder 8.0 (baseline 02 pin) -> JSON lines | both services |
| Log files | `/app/data/logs/<service>.jsonl`, rotate 100 MB, keep 14 days | both services |
| Metrics | Micrometer + Prometheus registry at `/actuator/prometheus` | both services |
| Health | explicit controllers `/health/liveness`, `/health/readiness` | both services |
| Staleness attribute | computed on read (ops summary, dashboard) from last-success age, 72 h threshold | crawler-service + api-service |
| Retention purge | maintenance passes at boot + after each job end (section 6); no timers | crawler-service |
| Scrape contract | scrape-ready text endpoints; operator polls via `curl` (no scraper deployed) | both services |

## 2. JSON log contract (frozen fields)

| Field | Source | Set when |
|---|---|---|
| ts | logback, ISO-8601 UTC, ms precision | every line |
| level | logback | every line |
| service | fixed value | every line |
| logger | logback | every line |
| msg | logback | every line |
| code | MDC | operation carries a BA 05 code, else `-` |
| host | MDC | crawl threads (host gate work) |
| articleId | MDC | article-scoped work |
| jobId | MDC | job-scoped work |

MDC rules: a servlet filter (api-service) and task decorators (crawler-service) set MDC at
unit-of-work start and clear it in a `finally` block; pooled threads never inherit stale keys
(unit test asserts). Level policy: INFO default; every WARN/ERROR line carries `code`. Stdout
mirror stays enabled for `docker compose logs` / `podman logs`.

## 3. Metric inventory (Prometheus names)

Meters are registered as Micrometer `crawler.*` / `api.*`; label sets are closed (file 05,
section 4).

| Area | Metric | Type | Labels |
|---|---|---|---|
| discovery | crawler_discovery_items_total | counter | source, discovery_type |
| discovery | crawler_discovery_runs_total | counter | source, result |
| discovery | crawler_discovery_failures_total | counter | source, code |
| fetch | crawler_fetch_requests_total | counter | host, status_class |
| fetch | crawler_fetch_duration_seconds | histogram | host |
| fetch | crawler_fetch_bytes_total | counter | host |
| fetch | crawler_fetch_failures_total | counter | source, code |
| fetch | crawler_host_paused | gauge | host |
| extract | crawler_extract_duration_seconds | histogram | source |
| extract | crawler_extract_failures_total | counter | source, code |
| jobs | crawler_job_items_total | counter | source, job_type, result |
| jobs | crawler_job_duration_seconds | histogram | job_type |
| jobs | crawler_jobs_active | gauge | job_type |
| queues | crawler_queue_depth | gauge | host |
| queues | crawler_queue_leased | gauge | — |
| queues | crawler_retry_zset_size | gauge | — |
| events | crawler_events_published_total | counter | type |
| events | api_events_consumed_total | counter | type |
| events | api_events_failed_total | counter | type, reason |
| ops | crawler_source_stale | gauge | source |
| ops | crawler_purge_rows_total | counter | table |
| ops | crawler_tmp_purged_files_total | counter | — |
| ops | api_projection_lag_seconds | gauge | — |
| API http | http_server_requests_seconds | timer | method, uri, status, outcome |
| JVM default | jvm_memory_used_bytes, jvm_gc_pause_seconds, process_cpu_usage, hikaricp_connections | defaults | Micrometer defaults |

Forbidden label keys on any series: `url`, `canonical_url`, `article_id`, `slug`, `job_id`,
`event_id`, `title` (enforced by allowlist test, file 05 section 4).

## 4. Health semantics

| Endpoint | Question | Dependency checks | 200 body | Down |
|---|---|---|---|---|
| `/health/liveness` | process alive? | none | `{"status":"UP","service":"<name>","checkedAt":"<ts>"}` | no response (dead process) |
| `/health/readiness` | ready to serve? | db ping, redis ping, flyway current, disk guard — 2 s timeout each | status UP | 503 `{"status":"DOWN","reasons":[...]}` |

| Rule | Detail |
|---|---|
| Independence | readiness never calls the other service: api-service checks own db (api_db) + Redis only |
| Crawler reachability | visible in ops summary (file 03), never in api-service readiness |
| Flyway current | applied version == jar-embedded latest; pending -> reason `flyway` |
| Disk guard | <5 GB free on the filesystem behind `/app/data` -> reason `disk`; crawler-service also pauses jobs (`STORE-DISK-FULL`) |
| Compose healthcheck | hits `/health/readiness` (baseline 04); interval 15 s wired by DO-05-01 |
| Actuator | `/actuator` exposes health, info, prometheus; loopback/compose-internal only, never proxied by nginx |

## 5. Staleness attribute (crawler-service)

DEVIATION CARRIED (2026-10-19): manual-only operation; staleness is a read-time attribute, not a
scheduled check, and never creates jobs (first use: 04-crawl-orchestration file 01).

| Aspect | Value |
|---|---|
| Computation | on read of the ops summary / dashboard; no background job |
| Scope | enabled sources with discovery_type = feed |
| Stale condition | `last_archived_at` IS NULL OR older than 72 h |
| Effects | ops summary + dashboard show `stale`; `crawler_source_stale{source}` gauge = 1 while stale; WARN code OPS-SOURCE-STALE at most once per stale episode; `source.stats` on job terminal status carries latest health |
| Recovery | next successful archive -> `fresh`; gauge returns to 0 |
| Refresh | manual only: UI bulk action "Refresh stale" (72 h) posts `sourceKeys` to `POST /api/v1/crawl-jobs`; no auto-refresh |
| Inputs | V004 source_health view (file 02); threshold from `CRAWLER_STALE_AFTER_H` default 72 |
| Test seam | injected Clock; boundary tested at 71 h 59 m and 72 h 01 m |

## 6. Retention maintenance (crawler-service)

| Job | Trigger | Action | Metric |
|---|---|---|---|
| fetch_log purge | boot + after each job end (operator-triggered jobs; no timer) | delete rows older than 90 days, batches of 10,000 | crawler_purge_rows_total{table="fetch_log"} |
| http_cache purge | boot + after each job end | delete rows last checked >30 days ago, batches of 10,000 | crawler_purge_rows_total{table="http_cache"} |
| tmp purge | boot + after each job end | delete `/app/data/tmp` entries older than 1 h | crawler_tmp_purged_files_total |
| app logs | continuous (logback) | rotate 100 MB, keep 14 days | — |
| archive content | never | manual deletion only | — |

Each purge run logs start/end counts at INFO with its `code`; batched deletes use indexed range
scans (file 02 section 3) and commit per batch, so no long locks (lock_timeout 5 s, baseline 03).
