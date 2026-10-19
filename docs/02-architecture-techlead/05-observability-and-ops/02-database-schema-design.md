# 02 — Database Schema Design

Ops-supporting schema objects in `crawler_db`, plus the retention SQL. Ownership: the
`source_health` view and both indexes are owned by this spec (migration V004); `fetch_log` and
`http_cache` DDL is owned by spec 02; `article` DDL by spec 04. `api_db` is untouched here.

## 1. V004__source_health_view.sql (crawler_db)

Purpose: one row per source with archival facts for the on-read staleness computation and the ops
summary. The view exposes timestamps + counts only; staleness is computed by the app (section 4).

```sql
create view source_health as
select s.id                                                    as source_id,
       s.key                                                   as key,
       s.enabled                                               as enabled,
       s.discovery_type                                        as discovery_type,
       max(a.archived_at) filter (where a.status = 'archived') as last_archived_at,
       count(*) filter (where a.status = 'archived')           as archived_count,
       count(*) filter (where a.status = 'failed')             as failed_count
from source s
left join article a on a.source_id = s.id
group by s.id, s.key, s.enabled, s.discovery_type;

create index ix_article_archived_at    on article (archived_at);
create index ix_fetch_log_occurred_at  on fetch_log (occurred_at);
```

| Column | Type | Notes |
|---|---|---|
| source_id | text | UUIDv7 of `source.id` (baseline 03) |
| key | text | source key, e.g. `cloudflare` |
| enabled | boolean | `source.enabled` |
| discovery_type | text | feed / sitemap / listing (spec 01) |
| last_archived_at | timestamptz | null = never archived |
| archived_count | bigint | articles with status `archived` |
| failed_count | bigint | articles with status `failed` |

`article.status` value list is owned by spec 04's DDL; only `archived` and `failed` are filtered
here. Applied migrations are immutable: a later column change on the view is a new forward
migration (baseline 03).

## 2. Index rationale

| Index | Serves | Why it suffices |
|---|---|---|
| ix_article_archived_at | `max(archived_at)` per source on each staleness read | article volume <=50k rows; seq-scan fallback is milliseconds |
| ix_fetch_log_occurred_at | purge DELETE range predicate `occurred_at < now() - 90 days` | bounded batches keep index churn low; 0 full scans |

Measured trigger: if the staleness read p95 exceeds 200 ms at >50k article rows, add composite
`ix_article_source_id_archived_at (source_id, archived_at)` in a new migration — with EXPLAIN
before/after on a 10k-row fixture (baseline 07, schema-change gates).

## 3. Why staleness is computed in the app, not the view

| Reason | Detail |
|---|---|
| Deterministic reads | a view calling `now()` returns different values per scan; tests and G-H replays become flaky |
| Policy is config | the 72 h threshold lives in `CRAWLER_STALE_AFTER_H`; changing it needs no migration |
| Testability | app compares `last_archived_at` against an injected Clock (boundary tests at 71 h 59 m / 72 h 01 m) |
| Simplicity | the view stays a pure projection of facts; app owns policy (baseline 01 section 6) |

## 4. Purge SQL (crawler-service, maintenance pass: boot + job end)

One statement per batch, committed per batch; loop until a batch affects fewer than 10,000 rows.
`lock_timeout` 5 s / `statement_timeout` 30 s per baseline 03 bound each iteration.

```sql
-- fetch_log: keep 90 days (NFR-12)
delete from fetch_log
where id in (select id from fetch_log
             where occurred_at < now() - interval '90 days'
             limit 10000);
-- loop until rows_affected < 10000

-- http_cache: keep rows checked within 30 days (spec 02 DDL: last_checked_at)
delete from http_cache
where id in (select id from http_cache
             where last_checked_at < now() - interval '30 days'
             limit 10000);
-- loop until rows_affected < 10000
```

| Property | Value |
|---|---|
| Batch size | 10,000 rows |
| fetch_log retention | 90 days |
| http_cache retention | 30 days |
| Trigger | boot and after each job end; batched statements keep lock windows short |
| Metric per run | crawler_purge_rows_total{table} (file 01 section 6) |
| tmp files | filesystem purge at boot + job end, handled in file 01 — no DB writes |
| Archive content | never deleted by any job, SQL or otherwise (baseline 03 section 7) |

## 5. api_db boundary

| Item | Rule |
|---|---|
| projection_offset | owned and migrated by spec 06 (api_db V001); this spec reads only the `api_projection_lag_seconds` gauge and the `X-Projection-Lag` header |
| Cross-db queries | forbidden: crawler-service reads only crawler_db, api-service reads only api_db (baseline 03 isolation rule) |
| Ops aggregation path | HTTP only: api-service calls crawler `GET /internal/v1/ops/summary` (file 03); never a SQL join across databases |
| Why | one schema owner per database keeps migration histories, roles, and `pg_dump`/restore (gate G-H, G-I) independent; a cross-db query would couple them with no benefit at 20 sources |
