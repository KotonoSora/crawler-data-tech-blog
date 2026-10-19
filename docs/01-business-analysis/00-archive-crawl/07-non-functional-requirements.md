# 07 — Non-Functional Requirements

All numbers are per the pinned stack (AGENTS.md) and apply to a single local machine.

## 1. Crawl performance and politeness

| ID | Requirement | Value |
|---|---|---|
| NFR-01 | Per-host concurrency | exactly 1 request |
| NFR-02 | Inter-request delay per host | >=2000 ms (Medium-family >=3000 ms) |
| NFR-03 | Global concurrent hosts | 4 (configurable `CRAWLER_GLOBAL_HOSTS`) |
| NFR-04 | Fetch timeouts | connect 10 s; read 30 s; total 60 s |
| NFR-05 | Aggregate backfill throughput | >=500 articles/h across 4 hosts (typical article <=2 MB) |
| NFR-06 | Full backfill of one source (<=2000 articles) | completes in <=8 h once started (no babysitting; the job continues until done) |
| NFR-07 | Retry policy | max 5 attempts; waits 30 s/2 m/10 m/1 h/6 h; Retry-After honored <=24 h |

## 2. Storage and integrity

| ID | Requirement | Value |
|---|---|---|
| NFR-08 | Per-article disk budget | <=50 MB total (content <=2 MB; assets <=50 MB) |
| NFR-09 | Full-archive budget | 50 GB reserved; write refused and job paused below 5 GB free |
| NFR-10 | Write atomicity | temp file + atomic rename; 0 partial final files observable |
| NFR-11 | Dedup guarantee | unique canonical_url; 0 duplicate articles after any restart |
| NFR-12 | Log retention | app logs 14 days (rotate at 100 MB); fetch_log rows 90 days |

## 3. API and UI

| ID | Requirement | Value |
|---|---|---|
| NFR-13 | Read endpoint latency | p95 <=200 ms local for list/detail endpoints |
| NFR-14 | Projection freshness | UI-visible state <=10 s behind crawl events (warning >30 s) |
| NFR-15 | UI initial load | <=2 s on localhost; list pages default 50 items (max 200) |
| NFR-16 | UI availability | SPA served by nginx; no offline-first/PWA requirement |
| NFR-17 | Error contract | 100% of API errors are RFC 9457 ProblemDetail with stable `code` |

## 4. Operations and delivery

| ID | Requirement | Value |
|---|---|---|
| NFR-18 | Health endpoints | `/health/liveness` and `/health/readiness` per Spring service, checked <=30 s interval |
| NFR-19 | Graceful shutdown | SIGTERM: stop leasing, finish in-flight article, exit <=60 s |
| NFR-20 | Container images | one per deployable; tags `:<semver>-<gitsha>`; non-root users |
| NFR-21 | Docker/Podman parity | identical behavior; parity check is a release gate |
| NFR-22 | Startup time | each Spring service ready <=45 s cold on reference hardware |
| NFR-23 | Config | 100% from environment; no secrets in images or repo |

## 5. Security and privacy

| ID | Requirement | Value |
|---|---|---|
| NFR-24 | Network exposure | admin API, metrics, health bound to 127.0.0.1 or compose-internal network |
| NFR-25 | Auth | none required (single local user); no public exposure allowed |
| NFR-26 | Crawling ethics | robots honored; identified UA with contact; per NFR-01..NFR-07 |
| NFR-27 | Data handling | no personal data collected; only public article content + metadata |

## 6. Maintainability

| ID | Requirement | Value |
|---|---|---|
| NFR-28 | Test coverage | integration tests with Testcontainers (PG 18.6, Redis 7.4) on every service |
| NFR-29 | Dependency policy | closed pins; no dynamic versions; bumps recorded in baseline doc 02 |
| NFR-30 | Observability | 100% of fetches logged (url, status, duration, bytes); metrics exposed per service |
