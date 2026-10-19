# 04 — Step-by-Step Implementation Plan (Crawl Orchestration)

Layout: `api/` (internal REST), `domain/` (state machines), `data/` (repositories, queue client),
`config/` (Redis, trigger validation, roles). Tasks land in `services/crawler-service` unless marked
DevOps; each follows the Definition of Done of baseline 06 §4 (Testcontainers test, metrics/logs,
image still builds).

DEVIATION CARRIED (2026-10-19): manual-only operation; no scheduled crawls (first use:
04-crawl-orchestration file 01).

## 1. Task table

| Task ID | Subsystem (BE/DevOps) | Step Description | Dependency | Acceptance Goal |
|---|---|---|---|---|
| BE-04-01 | BE | JobManager + job state machine: create/claim/pause/complete/fail/cancel; counters in the transition transaction | E0 scaffold, baseline 03 V001 | 9 legal transitions of file 01 §2 covered; illegal -> 409 JOB-INVALID-STATE |
| BE-04-02 | BE | QueuePublisher + per-host routing: canonical-URL admission, `SADD tb:hosts`, `RPUSH tb:q:{host}`, Lua `SREM` when empty | BE-04-01, spec 01 discovery | 1000 candidates over 20 hosts -> 20 queues; duplicate URL -> 1 entry |
| BE-04-03 | BE | HostQueueConsumer + reliable claims: host lock (`SET NX PX 60000`, renew 20 s), `BLMOVE` claim, ack via `LREM`, requeue on failure | BE-04-02 | 1 in-flight request per host (AC-15); kill -9 leaves the claim reclaimable |
| BE-04-04 | BE | RetryPromoter: 5 s poll, `ZRANGEBYSCORE 0 now LIMIT 0 500`, atomic promote, backoff 30 s/2 m/10 m/1 h/6 h | BE-04-03, spec 02 codes | 5th failure goes terminal, not re-queued; 0 duplicate promotions with 2 promoters |
| BE-04-05 | BE | ManualTriggerService: validate + enqueue operator-requested backfill/incremental jobs from `/internal/v1/jobs`; no timers; disabled source -> 409 JOB-INVALID-STATE | BE-04-01 | operator request for an enabled source -> 202 + 1 queue path; disabled source (DoorDash) -> 409; 0 timers present in the service |
| BE-04-06 | BE | Single-flight guard: `uq_crawl_job_active_source`, 409 mapping, duplicate-trigger guard path | BE-04-01, BE-04-05 | 50 parallel job requests on 1 source -> 1 row and 49 x 409 (BR-18) |
| BE-04-07 | BE | Cursor resume: `crawl_job.cursor` written per discovery page, read on claim | BE-04-01, spec 01 paging | kill -9 mid-backfill loses <=1 page and 0 articles (NFR-11) |
| BE-04-08 | BE | EventPublisher: envelope v1, 4 payload types, `XADD MAXLEN ~ 10000`, 5 s counter throttle | BE-04-01 | payloads match file 03 §3; terminal status always emits |
| BE-04-09 | BE | ShutdownCoordinator: SIGTERM -> stop leasing, finish article, requeue unacked, exit | BE-04-03, BE-04-07 | exit within 60 s (NFR-19); readiness DOWN within 2 s; 0 lost claims |
| BE-04-10 | BE | Integration tests on PG 18.6 + Redis 7.4 Testcontainers: states, queue protocol, promoter, single-flight, recovery | BE-04-01..09 | every file 01 §2/§3 edge and §6 boot step covered; G-B green |
| BE-04-11 | BE | End-to-end pilot: 1 feed source via `POST /internal/v1/jobs` -> archive -> events | BE-04-10, spec 03 | E1 exit criteria; counters equal the files on disk |
| DO-04-01 | DevOps | Manual-trigger config docs: UI/REST trigger paths, `CRAWLER_GLOBAL_HOSTS=4`, `CRAWLER_ROLE`, env names | BE-04-05 | `.env.example` lists all crawler keys with defaults; 0 secrets committed |
| DO-04-02 | DevOps | Torture test: `kill -9` mid-job x20 at random 5-120 s, restart, assert disk + DB | BE-04-09 | 20/20 recover; 0 partial final files; 0 duplicate canonical URLs |
| DO-04-03 | DevOps | Metrics wiring (`crawler_jobs_total`, `crawler_queue_depth`, `crawler_job_duration_seconds`, `crawler_events_published_total`) + scrape check | BE-04-08 | 4 metrics visible within 30 s of a job start; queue depth returns to 0 after a drain |

## 2. Waves

| Wave | Tasks | Exit check |
|---|---|---|
| W1 queue core | BE-04-01, BE-04-02, BE-04-03 | pilot source backfills through the real queue path locally |
| W2 reliability | BE-04-04, BE-04-06, BE-04-07, BE-04-09 | restart and duplicate-race tests pass |
| W3 triggers and events | BE-04-05, BE-04-08, DO-04-01 | operator triggers 1 incremental per enabled source; events read by a stub consumer |
| W4 proof | BE-04-10, BE-04-11, DO-04-02, DO-04-03 | E1 exit criteria + G-B + G-D green |

## 3. Test matrix

| Level | Scope | Tooling | Assertion |
|---|---|---|---|
| Unit | state machines, backoff table | JUnit 5 + Kotlin | cancel inside the finishing window -> JOB-CANCEL-REFUSED |
| Integration | lists/locks/zset, PG transitions | Testcontainers (PG 18.6, Redis 7.4) | 2 consumers on 1 host never overlap a claim |
| Race | parallel job creation, parallel promoters | 50-thread executor | 1 job row, 49 conflicts, 0 orphan queue entries |
| Recovery | kill -9, restart reclaim | DO-04-02 script | 0 duplicate canonical URLs, 0 partial files |
| Contract | event payloads, internal REST | springdoc + schema assertions | every emitted event validates against file 03 §3 |

## 4. Risks

| Risk | Mitigation |
|---|---|
| Redis flush loses in-flight work | all facts rebuildable from `article`/`crawl_job` (file 02 §5); boot step 2 requeues |
| Double trigger after config reload | single-flight index turns the second trigger into a 409 (logged no-op) |
| Poison message loop | attempt cap 5 + reclaim cap 3 -> terminal `failed` (file 01 §3) |
| Disk full during backfill | pause below 5 GB free, resume at >=6 GB (file 01 §2) |
| Metrics cardinality | `host` label only: 20 sources, <=25 hosts |
