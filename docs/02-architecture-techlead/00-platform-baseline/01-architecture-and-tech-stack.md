# 01 — Architecture and Tech Stack

## 1. Verdict

DEVIATION FLAGGED (carried): brief section 2.1 chose a modular monolith; the user ordered
microservices on 2026-10-19. Rationale: explicit user requirement. Budget: +2 images, +1 database,
+1 event path, +1 frontend toolchain. This document is the authoritative topology.

Topology: **4 deployables + 2 data services** — crawler-service, api-service, web (SPA),
nginx (edge) — on one Docker/Podman compose network with Postgres 18.6 (two databases) and Redis 7.4.

## 2. Service catalog

| Service | Responsibility | Database | Redis usage | Port (container) |
|---|---|---|---|---|
| crawler-service | discovery, fetch (polite), extraction, archive, scheduler, backfill/incremental jobs | crawler_db | queues, locks, retry zset, robots cache, events stream (producer) | 8080 |
| api-service | public REST for the SPA, admin commands, read-model projections | api_db | events stream (consumer) | 8080 |
| web | React SPA (static) | none | none | — (static files) |
| nginx | edge: serves SPA, proxies `/api` | none | none | 80 |

## 3. Interaction model

| Path | Protocol | Contract owner |
|---|---|---|
| web -> nginx -> api-service `/api/v1/**` | REST/JSON (sync) | spec 06-api-service, file 03 |
| api-service -> crawler-service `/internal/v1/**` (commands: start job, cancel, retry article; queries: job status) | REST/JSON (sync, compose-internal only) | spec 04-crawl-orchestration, file 03 |
| crawler-service -> Redis Stream `tb:events` -> api-service | async events (at-least-once) | spec 04, file 03 (envelope) |
| api-service -> crawler-service | never via DB; no cross-database access | this doc |

Event envelope (frozen): `{eventId, type, occurredAt, version: 1, payload}`.
Types: `article.archived`, `article.failed`, `job.updated`, `source.stats`.

## 4. Technology choices

| Layer | Choice | Notes |
|---|---|---|
| Backend framework | Spring Boot 4.1.1 + Kotlin 2.4.21 | both Spring services, same build |
| API docs | OpenAPI (springdoc pinned in catalog) | generated per service |
| Feed parsing | ROME | crawler-service only |
| robots.txt + sitemaps | crawler-commons | crawler-service only |
| HTML/XML parsing | jsoup | crawler-service only |
| Main-content extraction | readability4j + per-source overrides | crawler-service only |
| HTML -> Markdown | copy-down (jsoup-based) | crawler-service only |
| Queueing | Redis lists + zset retry + SET NX locks | no external broker |
| DB access | Spring Data JPA + Flyway | one schema owner per database |
| Frontend | React 19.3.1 + TypeScript + Vite | web only |
| Routing | react-router | web only |
| Edge | nginx (pinned image) | SPA + reverse proxy |

## 5. Boundary rationale

- Split axis = failure profile + data ownership: ingest (long-running, rate-limited, disk-heavy)
  vs serve (low-latency reads of projections). The UI never blocks on crawl work.
- Not split further: discovery/fetch/extraction remain modules inside crawler-service — they share
  one rate-limit gate and one archive writer; splitting would add hops without isolation benefit.
- No API gateway service: nginx is the edge (routing + static); a gateway adds no auth/rate
  features this single-user system needs.

## 6. Consistency model

| Concern | Approach |
|---|---|
| Source of truth | crawler_db (crawl facts) |
| UI reads | api_db projections, refreshed from `tb:events` (at-least-once, idempotent upserts) |
| Lag budget | <=10 s typical, warning >30 s (NFR-14) |
| Reconciliation | api-service stores `projection_offset`; a daily consistency check re-projects drift |

## 7. Rejected alternatives

| Option | Why rejected |
|---|---|
| Modular monolith (brief 2.1) | overridden by user mandate (see DEVIATION FLAGGED) |
| 5+ services split by pipeline stage | no independent scaling/failure need; +3 ops surfaces, no benefit |
| API gateway (own service) | nginx covers routing/static; single user, no auth surface |
| Separate broker (Kafka/RabbitMQ) | Redis already present; stream semantics sufficient at this volume |
| Shared database for both services | breaks data ownership; projections keep reads decoupled |
