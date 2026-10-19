# 02 — Database Schema Design (Crawl Orchestration)

Owner: `crawler_db` (baseline 03). `V001__core_tables.sql` creates `source`, `article`,
`crawl_job`, `fetch_log`; this file fixes `crawl_job` and the `article` columns orchestration
writes. `source`, article identity/content and `fetch_log` belong to specs 01-03. Conventions per
baseline 03 §3: TEXT UUIDv7 ids, snake_case, `timestamptz` UTC, CHECK enums, `ck_`/`uq_`/`fk_`/`ix_`
prefixes.

## 1. `crawl_job` (V001)

```sql
create table crawl_job (
  id               text        primary key,
  source_id        text        not null,
  job_type         text        not null,
  status           text        not null default 'pending',
  cursor           text,
  requested_at     timestamptz not null default now(),
  started_at       timestamptz,
  finished_at      timestamptz,
  discovered_count integer     not null default 0,
  archived_count   integer     not null default 0,
  skipped_count    integer     not null default 0,
  failed_count     integer     not null default 0,
  last_error       text,
  constraint fk_crawl_job_source foreign key (source_id) references source (id),
  constraint ck_crawl_job_type check (job_type in ('backfill','incremental')),
  constraint ck_crawl_job_status check (
    status in ('pending','running','paused','completed','failed','cancelled')),
  constraint ck_crawl_job_terminal check (
    (status in ('completed','failed','cancelled')) = (finished_at is not null)),
  constraint ck_crawl_job_counters check (discovered_count >= 0 and archived_count >= 0
    and skipped_count >= 0 and failed_count >= 0)
);
```

| Column | Rule |
|---|---|
| `job_type` | `backfill` or `incremental`; drives the discovery strategy (file 01 §7) |
| `status` | 1 of 6 job states (file 01 §2) |
| `cursor` | resume token: page offset, sitemap index position, or last item timestamp; written per discovery page |
| `started_at` | NULL while pending; set at first claim |
| `finished_at` | non-NULL exactly when `status` is terminal |
| counters | monotonic: `discovered/archived/skipped/failed`, never decremented |
| `last_error` | BA 05 code + 1-line reason |

## 2. `article` orchestration columns (V001 excerpt)

```sql
  status          text        not null default 'discovered',
  attempt_count   smallint    not null default 0,
  next_attempt_at timestamptz,
  claimed_at      timestamptz,
  failure_code    text,
  failure_reason  text,
  archived_at     timestamptz,
  constraint ck_article_status check (status in ('discovered','queued',
    'processing','archived','skipped','needs_review','failed')),
  constraint ck_article_attempts check (attempt_count between 0 and 5),
  constraint ck_article_next_attempt check (status <> 'queued' or next_attempt_at is not null)
```

| Column | Rule |
|---|---|
| `status` | 1 of 7 article states (file 01 §3) |
| `attempt_count` | 0-5 inclusive; 5 -> FETCH-BACKOFF-EXHAUSTED; reset only by manual retry |
| `next_attempt_at` | NOT NULL while queued; mirrored as the `tb:retry` score |
| `claimed_at` | stale when `now() - claimed_at > 600 s`, then reclaimed |
| `failure_code` | stable BA 05 code, set on failed/needs_review |
| `archived_at` | set at the atomic-rename commit |

## 3. Constraints and indexes

| Name | Definition | Purpose |
|---|---|---|
| `fk_crawl_job_source` | `crawl_job(source_id) -> source(id)`, on delete restrict | no orphan jobs |
| `ck_crawl_job_type` | `job_type in ('backfill','incremental')` | 2 job types |
| `ck_crawl_job_status` | `status in ('pending','running','paused','completed','failed','cancelled')` | 6 job states |
| `ck_crawl_job_terminal` | terminal <=> `finished_at` set | no half-closed jobs |
| `ck_crawl_job_counters` | 4 counters >= 0 | monotonic counters |
| `ck_article_status` | `status in ('discovered','queued','processing','archived','skipped','needs_review','failed')` | 7 article states |
| `ck_article_attempts` | `attempt_count between 0 and 5` | retry cap of 5 |
| `ck_article_next_attempt` | queued requires `next_attempt_at` | promoter invariant |
| `uq_crawl_job_active_source` | unique index `(source_id) where status in ('pending','running','paused')` | BR-18 single-flight, 1 active job per source |
| `ix_crawl_job_source_status` | `crawl_job(source_id, status)` | job history per source |
| `ix_crawl_job_status_requested` | `crawl_job(status, requested_at desc)` | boot reclaim, active-job lookup |
| `ix_article_status` | `article(status)` | queue rebuild scan |
| `ix_article_next_attempt` | `article(next_attempt_at) where status='queued'` (partial) | retry rebuild after restart |
| `ix_article_claimed_at` | `article(claimed_at) where status='processing'` (partial) | stale-lease reclaim >600 s |

`uq_article_canonical_url` (spec 01-03) stays the identity basis (BR-06).

## 4. Migration order

| Step | SQL |
|---|---|
| 1 | `source` registry incl. `enabled` flag (spec 01) |
| 2 | `article` incl. §2 columns and the 3 `ck_article_*` constraints (spec 03) |
| 3 | `crawl_job` (this file) and `fetch_log` (spec 02) |
| 4 | all `fk_`/`ck_`/`uq_`/`ix_` objects of §3 |
| 5 | 20 source rows in `V005__seed_sources.sql` (DoorDash `enabled = false`) |

## 5. Write rules

| Rule | Detail |
|---|---|
| Transition guard | `UPDATE ... WHERE id=? AND status=?`; 0 rows updated -> duplicate message, ignore |
| Counter coupling | counter bump and status write share 1 transaction |
| Cursor cadence | written per discovery page, so a restart re-walks <=1 page |
| Rebuild | `tb:q:*`, `tb:hosts`, `tb:retry` are reconstructible from `article` + `crawl_job`; Redis is never the only copy |
| No cross-DB writes | `api_db` is never touched (BR-16) |
| Retention | `crawl_job` kept forever; `fetch_log` pruned at 90 days (NFR-12) |
