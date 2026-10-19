# 05 — Security, Logging and Rate Limiting (Crawl Orchestration)

Small surface by design (single local user, NFR-25): internal queue, loopback-bound API. Real risks:
duplicate work, retry storms, a lost claim at shutdown. Numbers below are authoritative.

## 1. Locks and leases

| Key | Acquire | TTL / number | Renewal | On loss |
|---|---|---|---|---|
| `tb:lock:host:{host}` | `SET key <workerId> NX PX 60000` | 60000 ms | every 20 s while working | abort before any fetch, `RPUSH` the message back, WARN |
| `tb:lock:article:{id}` | `SET key <workerId> NX PX 300000` at claim | 300000 ms | heartbeat every 60 s | another worker may reclaim after stale >600 s |
| claim ownership | value match before `LREM` ack | — | — | ack refused -> message kept for reclaim |

Reclaim: a `processing` member untouched for >600 s is `RPUSH`ed back to `tb:q:{host}` with
`attempt_count` unchanged; the 3rd reclaim of one article becomes `failed` with
FETCH-BACKOFF-EXHAUSTED and reason `reclaim-loop`.

## 2. Single-flight enforcement (BR-18)

DEVIATION CARRIED (2026-10-19): manual-only operation; no scheduled crawls (first use:
04-crawl-orchestration file 01).

| Layer | Mechanism | Race covered |
|---|---|---|
| Database | partial unique index `uq_crawl_job_active_source` (file 02 §3) | 2 handlers claiming 1 source |
| API | active-job pre-check, then insert; constraint violation -> 409 JOB-DUPLICATE-ACTIVE | fast error path, 0 orphan rows |
| Trigger guard | `ix_crawl_job_status_requested` lookup; active job -> 409 JOB-DUPLICATE-ACTIVE, no row | duplicate operator triggers |
| Queue | 1 host lock per host, `CRAWLER_GLOBAL_HOSTS=4` | >1 request per host never happens (NFR-01, AC-15) |

Terminal jobs: consumers skip their messages; no job touches another job's entries.

## 3. Rate limiting and no retry storms

| Control | Value | Owner |
|---|---|---|
| Per-host concurrency | exactly 1 in-flight request | spec 02 HostGate, enforced by the host lock |
| Inter-request delay | >=2000 ms per host; >=3000 ms on Medium-family hosts | spec 02 |
| Global concurrency | 4 hosts (`CRAWLER_GLOBAL_HOSTS=4`) | this spec |
| Article retry schedule | max 5 attempts: 30 s, 2 m, 10 m, 1 h, 6 h (BR-04) | RetryPromoter |
| `Retry-After` | honored up to 24 h, scheduled through `tb:retry` | spec 02 |
| Host circuit breaker | 20 consecutive 5xx/000 on a host -> 30 min pause for that host; half-open: 1 probe, success resets the counter, failure re-opens for 30 min | spec 02 signal, applied here |
| Promoter bound | <=500 promotions per 5 s cycle, <=1 in-flight claim per host, entries never dropped during an outage | this spec |

Worst case per article: 5 attempts + 3 reclaims = 8 fetches, then terminal.

## 4. Internal API exposure

| Aspect | Value |
|---|---|
| Bind | container 8080, host mapping `127.0.0.1:8082:8080` (baseline 04 §2); no other interface |
| Reachability | compose DNS `crawler-service:8080` + host loopback only |
| nginx | never proxies `/internal/`; the SPA edge exposes `/api/` only |
| Auth | none by design (NFR-25): any local process or compose peer can start, cancel, retry — risk accepted and documented |
| Mitigations | loopback bind, no uploads, no credentials, commands idempotent and single-flight guarded |
| Revisit trigger | a second user or non-local exposure -> auth + TLS required before that release |
| Metrics and health | same loopback surface, no public route |

## 5. SIGTERM sequence (budget 60 s, NFR-19)

| Elapsed | Step | Fallback |
|---|---|---|
| 0 s | SIGTERM; readiness -> DOWN within 2 s (liveness stays UP); stop leasing: no new job claims, no new `BLMOVE` | — |
| 0-45 s | finish the current article: fetch, extract, atomic rename, DB commit | not finisable in 45 s: abort before rename, leave the claim in `processing` for reclaim |
| 45-55 s | `RPUSH` unacked claims back to `tb:q:{host}`; release owned locks | boot reclaim covers misses |
| 55-60 s | flush logs, close Hikari + Lettuce pools, exit code 0 | runtime SIGKILL after 60 s |
| next boot | reclaim step (file 01 §6) requeues leftovers | 0 duplicates (NFR-11), 0 partial files (NFR-10) |

## 6. Audit logging

1 JSON line per event (`logstash-logback-encoder`), rotated at 100 MB, kept 14 days (NFR-12).

| Field | Present on | Example |
|---|---|---|
| `ts`, `level`, `service`, `logger` | every line | `2026-10-19T03:04:11.201Z`, `INFO` |
| `jobId`, `sourceKey`, `jobType` | job and article events | `0192f0c1-4b21-...` |
| `articleId`, `host`, `url`, `attempt` | claim, archive, failure | `attempt=1` |
| `transition` | state changes | `running->completed` |
| `counters` | job end, throttled `job.updated` | `{discovered:812,archived:640,skipped:57,failed:3}` |
| `durationMs` | job end, each article pipeline | job 2460000 ms; article p95 <= 10000 ms |
| `code` | failures | `FETCH-TIMEOUT` |
| `workerId` | claims, lock events | `crawler-1/pid-77` |

No HTML bodies (BR-08), no secrets, no DB password; WARN/ERROR always carry a `code`.

## 7. Metrics

| Metric | Type | Labels | Alert threshold |
|---|---|---|---|
| `crawler_jobs_total` | counter | `type`, `status` | any `status="failed"` increment is reviewable |
| `crawler_queue_depth` | gauge | `host` | >0 pending+processing for 30 min with 0 archived |
| `crawler_job_duration_seconds` | histogram | `type` | backfill p95 <= 8 h for 2000 articles (NFR-06) |
| `crawler_events_published_total` | counter | `type` | 0 for 15 min while a job runs |
| `crawler_source_stale` | gauge | `sourceKey` | 1 when stale >72 h (AC-12) |

Cardinality: 20 sources, <=25 hosts; `articleId`/`url` are never labels.
