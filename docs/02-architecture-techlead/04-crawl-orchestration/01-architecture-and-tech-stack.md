# 01 — Architecture and Tech Stack (Crawl Orchestration)

Scope: per-host work queues, safe claims, bounded retries, progress reporting. Job truth is
`crawler_db.crawl_job` (file 02); in-flight work is in Redis; the stream envelope (file 03) is the
only contract with api-service.

## 1. Components

| Component | Role | Touchpoint |
|---|---|---|
| JobManager | job rows, state machine, counters, BR-18 | `/internal/v1/jobs`, article outcomes, boot |
| ManualTriggerService | validate + enqueue operator-requested jobs; no timers | `/internal/v1/jobs` |
| QueuePublisher | admit canonical URL, then enqueue | `tb:hosts`, `tb:q:{host}` |
| HostQueueConsumer | host lock, 1 claim, pipeline, ack/requeue | queues, locks, 250 ms idle poll |
| RetryPromoter | due retries back to their host queue | `tb:retry`, every 5 s |
| EventPublisher | envelope v1 append | `tb:events` |
| ShutdownCoordinator | SIGTERM sequence, 60 s budget | all components |

`CRAWLER_ROLE`: `api` (REST only), `worker` (components 2-7), `all` (both; single-node default).

DEVIATION FLAGGED (2026-10-19): time-based automatic crawl scheduling removed — user mandate:
manual operation on a local VPS. Budget: −1 scheduler component, 0 new dependencies. Rationale:
every crawl starts from an operator action (UI button or admin REST); no timers remain in the
system. Canonical job creation stays `POST /internal/v1/jobs` (internal) and
`POST /api/v1/crawl-jobs` (public; spec 06 contract).

## 2. Job state machine

| Transition | Trigger | Side effects |
|---|---|---|
| (none) -> pending | accepted `POST /internal/v1/jobs` | row insert, `job.updated` |
| pending -> running | worker claim | `started_at`, cursor read |
| pending -> cancelled | cancel, nothing in flight | `finished_at` |
| running -> paused | disk <5 GB, checked every 30 s (NFR-09) | leasing stops |
| paused -> running | disk >=6 GB for 60 s | resume at `cursor` |
| running -> completed | cursor exhausted, 0 in flight | counters frozen, `source.stats` |
| running -> failed | 5 consecutive discovery failures (BA 03 §6) | `last_error`, `finished_at` |
| pending/running/paused -> cancelled | cancel outside the finishing window | unacked requeued |
| completed/failed/cancelled | terminal; cancel -> 409 JOB-INVALID-STATE | none |

Finishing window (cancel -> 409 JOB-CANCEL-REFUSED): the only in-flight article is past its atomic
rename and all host queues of the job are empty.

## 3. Article state machine

| Transition | Trigger | Effect |
|---|---|---|
| discovered -> queued | admission passes | 1 queue entry |
| discovered -> skipped | DISC-ROBOTS-DENIED, or archived row with equal `content_sha256` | `skipped_count + 1` |
| queued -> processing | atomic claim into processing list | `attempt_count + 1` |
| processing -> archived | atomic rename + DB commit ok | `archived_at`, `archived_count + 1` |
| processing -> skipped | 304, or unchanged `content_sha256` | `skipped_count + 1` |
| processing -> needs_review | EXTRACT-PARSE-FAILED (2 attempts), EXTRACT-EMPTY-CONTENT, FETCH-BLOCKED, STORE-INVALID-SLUG | no file written |
| processing -> failed | FETCH-HTTP-TERMINAL, FETCH-TOO-LARGE, FETCH-BACKOFF-EXHAUSTED, 3rd reclaim | `failed_count + 1` |
| processing -> queued | 5xx/429/000 with `attempt_count <5`, or 600 s stale claim | `tb:retry` member |
| failed/needs_review -> queued | `POST /internal/v1/articles/{id}/retry` | `attempt_count = 0`, 1 entry |
| archived -> archived | changed sha: `article_revision` first (baseline 03 §7) | atomic-rename rewrite |

## 4. Queue topology (frozen key set)

| Key | Type | Semantics | Numbers |
|---|---|---|---|
| `tb:q:{host}` | list | pending per host | `RPUSH`, no TTL |
| `tb:q:{host}:processing` | list | claims; ack = `LREM ... 1` | idle >600 s -> reclaim |
| `tb:hosts` | set | hosts with work | `SADD`; `SREM` in the same Lua script when empty |
| `tb:retry` | zset | member `articleId`, score ready ms | `ZRANGEBYSCORE 0 now LIMIT 0 500` |
| `tb:lock:host:{host}` | string | host ownership | `SET NX PX 60000`, renew every 20 s |
| `tb:lock:article:{id}` | string | article lease | `PX 300000`, heartbeat 60 s |
| `tb:events` | stream | events to api-service | `XADD MAXLEN ~ 10000` |

Claim: hold the host lock, `BLMOVE tb:q:{host} tb:q:{host}:processing LEFT RIGHT` (FIFO, block
<=2000 ms), run the handler, `LREM` on success; a failure either `ZADD`s `tb:retry` or writes a
terminal state.

DEVIATION FLAGGED (first use): the frozen contract names `BRPOPLPUSH`, deprecated since Redis 6.2;
this spec uses `BLMOVE <src> <dst> LEFT RIGHT <timeout>` with identical atomic claim semantics.
Budget: 0 new keys, 0 new dependencies. Rationale: no deprecated API on Redis 7.4.

## 5. Triggering and single-flight

| Rule | Value |
|---|---|
| Trigger source | operator only — UI (Crawl source now / Run incremental / Refresh stale) or REST `POST /api/v1/crawl-jobs` -> `POST /internal/v1/jobs` |
| Timers | 0 scheduled runs; nothing starts a crawl by itself |
| Disabled source | trigger refused -> 409 JOB-INVALID-STATE (BR-13: DoorDash off) |
| Backfill | operator-triggered only; never automatic |
| Single-flight (BR-18) | partial unique index `uq_crawl_job_active_source`; duplicate -> 409 JOB-DUPLICATE-ACTIVE |
| Duplicate guard | active job -> 409 JOB-DUPLICATE-ACTIVE; no second row, no queue write |

## 6. Restart and idempotency

| Boot step | Mechanism | Limit |
|---|---|---|
| Reclaim jobs | `pending`/`running` rows taken by the new process | 1 pass, single node |
| Requeue in-flight | `processing` members back into the host list | `attempt_count` kept |
| Promote retries | promoter runs at boot | score <= now |
| Purge temp | `data/tmp/*` older than 1 h | boot + each job end |
| Resume discovery | next page from `crawl_job.cursor` | 0 pages re-walked |
| Reconcile archive | DB sha/`archived_at` vs disk | 1 pass per boot |

Idempotency: identity is `articleId` + unique `canonical_url` (BR-06/07). The claim
`UPDATE ... WHERE id=? AND status='queued'` makes duplicate messages no-ops; counters bump in that
same transaction.

## 7. Backfill vs incremental

| Aspect | Backfill | Incremental |
|---|---|---|
| Trigger | operator action (UI/REST) via `POST /internal/v1/jobs` | operator action (UI/REST) via `POST /internal/v1/jobs` |
| Discovery | sitemap/listing until exhaustion (BR-14) | feed/sitemap newer than last success |
| Cursor | page offset or sitemap index position | last successful item timestamp |
| Volume | up to 2000 articles per source (NFR-06) | 0-100 items per run |
| Completion | cursor exhausted + counters frozen | same |
| Fairness | 4 host locks (NFR-03), 1 request per host (NFR-01) | never preempts a backfill |

## 8. Rejected alternatives

| Option | Why rejected |
|---|---|
| 1 global FIFO queue | 1 slow host blocks all 19 sources (NFR-05) |
| Redis Streams as work queue | no per-host ordering or host backpressure as a consumer group |
| DB-as-queue (`FOR UPDATE SKIP LOCKED`) | extra round trips per claim at <=500 articles/h; Redis already present |
| Per-source cron scheduler | user mandate 2026-10-19: manual operation on a local VPS; −1 component, 0 timers (DEVIATION FLAGGED above) |
