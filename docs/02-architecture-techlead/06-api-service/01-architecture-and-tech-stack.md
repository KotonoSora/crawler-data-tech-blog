# 01 — Architecture and Tech Stack

Scope: api-service (spec 06, increment E3). Authoritative for runtime, components, projection flow,
and consistency model. Public contract: file 03; schema: file 02.

## 1. Runtime stack

| Layer | Choice | Note |
|---|---|---|
| HTTP | Spring MVC (servlet), Spring Boot 4.1.1, Kotlin 2.4.21, JVM 21 | blocking JDBC/JPA; no WebFlux |
| Read models | Spring Data JPA over `api_db` (sole writer) | Flyway `V001__read_models.sql` (file 02) |
| Events | Spring Data Redis (Lettuce) consumer: stream `tb:events`, group `api-projections` | at-least-once; XACK after DB commit |
| Commands | Spring `RestClient` → crawler `/internal/v1/**` (compose-internal) | connect 2 s / read 5 s; 1 retry on 5xx with 200 ms jitter; never on 4xx |
| Content | passthrough from crawler internal content/asset endpoints | TTL 300 s; bodies ≤200 KB cached (file 03 §7) |
| JSON | Jackson 3 (`tools.jackson`) + Kotlin module registered | AGENTS.md rule; camelCase DTOs |
| Errors | RFC 9457 ProblemDetail via `@RestControllerAdvice` | `type=urn:tech-blog:error:<CODE>` |
| API docs | springdoc-openapi (Boot 4 line, catalog pin) | `/v3/api-docs` |
| Tests | Testcontainers PG 18.6 + Redis 7.4 (NFR-28) | integration test per subsystem |
| Deploy | container 8080; host loopback `127.0.0.1:8081`; Temurin JRE 21, non-root uid 10001 | `/health/liveness`, `/health/readiness` |

## 2. Data ownership (hard boundary)

| Rule | Detail |
|---|---|
| Owns | `api_db` only: source_summary, article_index, job_view, projection_offset, projection_event |
| Never | reads `crawler_db`; mounts no archive volume; opens no file under `data/uploads/` |
| Commands out | start job, cancel job, retry article, source enable/disable → `/internal/v1` (spec 04, file 03) |
| Content in | article content + assets fetched on demand from crawler internal content endpoints |
| Truth | `crawler_db` is the system of record; every api_db row is a rebuildable projection |
| Contracts | REST/JSON + Redis Streams payloads only; no shared code module (baseline 01 §5) |

## 3. Components

| Component | Package | Responsibility |
|---|---|---|
| PublicApiControllers | `api` | all `/api/v1` endpoints, Bean Validation, pagination, ProblemDetail advice |
| CommandProxy | `domain` | sync crawler calls + timeout/retry policy + crawler-error → ProblemDetail mapping |
| ProjectionConsumer | `data` | XREADGROUP (≤100 events, block 2 s), XACK after commit, XAUTOCLAIM min-idle 60 s every 30 s |
| ProjectionWriter | `data` | one transaction per event: dedupe insert + target upserts (file 02 §4) |
| ContentProxy | `data` | content/asset passthrough + bounded in-memory cache |
| OpsSummaryService | `domain` | HealthSummary aggregation + projection lag |
| Config | `config` | Redis, RestClient timeouts, Flyway, OpenAPI, Jackson 3 Kotlin module |

## 4. Projection flow

```
crawler-service ─XADD→ tb:events ─XREADGROUP api-projections→ ProjectionConsumer
                                                                     │ one TX per event
                                                                     ▼
                projection_event (dedupe) + upsert(target) + projection_offset update
                                                                     │ commit
                                                                     ▼
                                                                   XACK
boot + every 30 s: XAUTOCLAIM min-idle 60 s → redeliver pending → replay is a no-op
```

| Concern | Value |
|---|---|
| Batch | ≤100 events per read; block 2 s |
| Failure | no XACK; stop the batch, retry next loop (order preserved) |
| Unknown type / `version` ≠ 1 | log WARN with eventId, XACK, skip |
| Lag | `now − occurredAt` of newest applied event → gauge + `X-Projection-Lag: <integer s>` |
| Lag warnings | >30 s WARN (NFR-14); >30 s for >10 min ERROR (BA 05 §4) |
| Dedupe retention | `projection_event` pruned at 7 days by the boot pass and each reconciliation pass (no timer) |
| Reconciliation | at boot and on operator demand (ops action): compare per-source counts and article `content_sha256` against a crawler internal snapshot (read endpoint owned by spec 04, file 03); re-upsert drift, ERROR log with counts |

## 5. Consistency model

| Concern | Decision |
|---|---|
| Freshness | UI-visible state ≤10 s behind events typical; warning >30 s (NFR-14) |
| Read availability | reads keep serving `api_db` when Redis or crawler-service is down; commands fail 503 |
| Idempotency | eventId dedupe + monotonic upsert guard (file 02) |
| Rebuild | drop + migrate + re-project from snapshot; no crawler_db access needed |
| Drift control | re-projection at boot and on operator demand; mismatch → ERROR log with source key and counts |

## 6. Rejected alternatives

| Option | Why rejected |
|---|---|
| Read `crawler_db` directly | breaks per-service DB ownership (AGENTS.md); couples UI latency to crawl transactions |
| Serve content/assets from the archive disk mount | path-traversal surface; makes api-service depend on `data/`; one HTTP contract is cheaper than a shared mount |
| Separate search engine (Elasticsearch/OpenSearch) | +1 JVM image and ~1 GB heap for a single user; AC-07 (≤500 ms over ≥1000 articles) is met by tsvector + GIN with 0 new services and 0 extensions (baseline 03) |
| Recompute read models by polling crawler on demand | full recompute per view; events deliver ≤10 s freshness at 0 extra query load |
