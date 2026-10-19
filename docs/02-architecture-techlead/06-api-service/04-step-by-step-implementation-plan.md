# 04 — Step-by-Step Implementation Plan

Increment: E3 api-service (baseline 06 §2). Order: BE-06-01 → BE-06-03, then read surfaces
BE-06-04..BE-06-06, then proxies BE-06-07..BE-06-09, then BE-06-10..BE-06-11; DO-06-01 starts with
BE-06-01, DO-06-03 closes E3. Every task follows the DoD (baseline 06 §4): tests + Testcontainers
integration + metrics/logs + docs touch + image build.

| Task ID | Subsystem (BE/DevOps) | Step Description | Dependency | Acceptance Goal |
|---|---|---|---|---|
| BE-06-01 | BE | Flyway `V001__read_models.sql`: source_summary, article_index, job_view, projection_offset, projection_event, 3 secondary indexes, offset seed row (file 02) | E0 scaffold; baseline 03 | Fresh DB applies V001; upgrade boot applies V001 only (G-H); `EXPLAIN` recorded on a 10k-row article fixture |
| BE-06-02 | BE | ProjectionConsumer: XREADGROUP group `api-projections` (batch ≤100, block 2 s), XACK post-commit, XAUTOCLAIM min-idle 60 s every 30 s, offset/lag update, unknown type or `version`≠1 → WARN + skip | BE-06-01; crawler emits `tb:events` (E2) | Event applied to api_db ≤10 s after XADD; consumer restart mid-batch → redelivery, 0 duplicate rows (NFR-14) |
| BE-06-03 | BE | ProjectionWriter: per-event transaction (dedupe insert + upserts with monotonic guard), payload→column mapping for the 4 event types | BE-06-02 | 1,000-event fixture applied twice → identical state; injected duplicate eventId changes 0 rows |
| BE-06-04 | BE | Read endpoints: GET /sources, /sources/{key}, PATCH /sources/{key} (proxy + optimistic update), GET /articles, /articles/{id}; Bean Validation + pagination | BE-06-01 | p95 ≤200 ms over 10k articles (NFR-13); size 0 and 201 → 400 CFG-INVALID-REQUEST |
| BE-06-05 | BE | Search: sanitized tokens → prefix tsquery on `search_tsv`, source filter, total count | BE-06-04 | AC-07: title search over ≥1,000 archived articles ≤500 ms with correct page/size/total |
| BE-06-06 | BE | Job endpoints: GET /jobs, /jobs/{id} (newest-first, counters), GET /jobs/{id}/failures via crawler internal query | BE-06-04 | AC-10: newest-first list with counters and duration; JobFailure fields match BA 04 §2 |
| BE-06-07 | BE | CommandProxy: POST /crawl-jobs, /crawl-jobs/{id}/cancel, /articles/{id}/retry; connect 2 s / read 5 s; 1 retry on 5xx with 200 ms jitter; no retry on 4xx; mapping per file 03 §5 | BE-06-04 | AC-09: job visible ≤2 s; crawler stopped → 503 OPS-DEPENDENCY-DOWN; 404/409 mappings byte-exact |
| BE-06-08 | BE | ContentProxy: content + asset passthrough, TTL 300 s, bodies ≤200 KB cached, ≤200 entries, filename validation | BE-06-04 | AC-08: all images render from local assets; content byte-identical to crawler payload; cache hit ≤50 ms; >200 KB body bypasses cache |
| BE-06-09 | BE | OpsSummaryService + GET /ops/summary (HealthSummary list), `X-Projection-Lag` header on all responses, `api_projection_lag_seconds` gauge | BE-06-02, BE-06-04 | Lag header (integer seconds) on 100% of `/api/v1` responses; WARN logged ≤30 s after lag crosses 30 s |
| BE-06-10 | BE | OpenAPI wiring (springdoc 3.x): 14 endpoints, DTO schemas, ProblemDetail schema, `/v3/api-docs` served | BE-06-06, BE-06-07, BE-06-08, BE-06-09 | Spec lists 14 endpoints; DTO field names match BA 04 §2 exactly (schema snapshot test) |
| BE-06-11 | BE | Contract tests for event payloads: fixtures for article.archived, article.failed, job.updated, source.stats; unknown type and `version`≠1 paths | BE-06-03 | 4 fixtures applied to api_db; unknown type does not block the stream (next event processed ≤1 s) |
| DO-06-01 | DevOps | Compose wiring: api-service depends_on postgres healthy, redis healthy, crawler-service started; env `API_DB_URL`, `SPRING_DATASOURCE_*`, `REDIS_URL`, `CRAWLER_INTERNAL_BASE_URL`; bind `127.0.0.1:8081:8080`; no crawler_db credentials in this service | DO compose baseline 04; BE-06-01 | `compose up`: readiness 200 ≤45 s cold (NFR-22); api-service env contains 0 crawler_db references |
| DO-06-02 | DevOps | Readiness = api_db + Redis + consumer group present; liveness = process only; PG `server_version` assert 18.6 fail-fast; JDBC settings per baseline 03 §6 | DO-06-01 | AC-11: Redis stopped → readiness 503 naming Redis, liveness 200; PG 18.5 → boot fails with clear error |
| DO-06-03 | DevOps | nginx `/api` proxy smoke script (operator-run): GET `http://127.0.0.1:8090/api/v1/sources` → 200 + `X-Projection-Lag`; GET `/api/v1/sources/nope` → 404 ProblemDetail; assert `/api` responses are not cached | DO-06-01; baseline 04 nginx conf | G-G: smoke green on Docker and Podman with identical results |

## Notes

- E3 exit criteria (baseline 06 §2): BA 04 DTOs served, projection lag ≤10 s typical, AC-07 passes,
  contract tests for events green — nothing else closes E3.
- BE-06-02 accepts events emitted by E2 crawler work; before that lands, integration tests publish
  fixture events directly to `tb:events` with a Testcontainers Redis 7.4.
- BE-06-05 must not introduce extensions (baseline 03 §1): only the generated `search_tsv` column and
  its GIN index.
- DO-06-02 keeps Redis out of the liveness path so a Redis restart never kills the container
  (single-instance, compose restart policy `unless-stopped`).
