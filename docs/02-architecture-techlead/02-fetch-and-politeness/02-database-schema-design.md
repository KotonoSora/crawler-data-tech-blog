# 02 — Database Schema Design

Scope: `crawler_db` (PostgreSQL 18.6, baseline 03 conventions: TEXT UUIDv7 ids, snake_case,
`ck_`/`uq_`/`fk_`/`ix_` prefixes, `timestamptz`, TEXT + CHECK enums). This spec contributes
`fetch_log` to `V001__core_tables.sql`, owns `V002__http_cache.sql`, and documents the article
fetch-state columns it writes. Flyway is forward-only; applied files are immutable.

## 1. Migration inventory

| Migration | Contents | Owner |
|---|---|---|
| `V001__core_tables.sql` | source, article (+ fetch-state columns), crawl_job, **fetch_log** | specs 01/04; fetch_log by this spec |
| `V002__http_cache.sql` | http_cache | this spec |

## 2. fetch_log

```sql
create table fetch_log (
  id           bigint generated always as identity primary key,
  article_id   text,  -- null: discovery / robots.txt fetches
  job_id       text,  -- null: fetches outside a job
  host         text        not null,
  url          text        not null,
  method       text        not null default 'GET',
  status_code  integer,
  outcome      text        not null,
  duration_ms  integer     not null,
  bytes        bigint      not null default 0,
  attempt      integer     not null,
  occurred_at  timestamptz not null default now(),
  constraint fk_fetch_log_article foreign key (article_id) references article (id),
  constraint fk_fetch_log_job     foreign key (job_id)     references crawl_job (id),
  constraint ck_fetch_log_outcome check (outcome in
    ('ok','not_modified','robots_denied','http_error','timeout',
     'network_error','parse_error','too_large','blocked')),
  constraint ck_fetch_log_method  check (method = 'GET'),
  constraint ck_fetch_log_attempt check (attempt between 1 and 5),
  constraint ck_fetch_log_metrics check (duration_ms >= 0 and bytes >= 0)
);
create index ix_fetch_log_host_time on fetch_log (host, occurred_at desc);
create index ix_fetch_log_article   on fetch_log (article_id, occurred_at desc)
  where article_id is not null;
```

`article_id` and `job_id` are null for discovery/robots.txt fetches and for fetches outside a job.
Foreign keys do not cascade: fetch history survives article or job removal.

| Column | Rule |
|---|---|
| `outcome` | 9 frozen values; maps to failure codes per file 03 §5 |
| `status_code` | null when no HTTP status exists (timeout, network_error, robots_denied) |
| `duration_ms` | wall time from request send to last body byte, cap abort included |
| `bytes` | body bytes after decompression; 0 for timeout, network_error, robots_denied |
| `attempt` | 1..5 inside the current bounded window; frozen in the row, never updated |
| Mutability | append-only: the app role holds no UPDATE grant on fetch_log |

## 3. http_cache

```sql
create table http_cache (
  url           text primary key,
  etag          text,
  last_modified text,
  status_code   integer not null,
  checked_at    timestamptz not null default now(),
  constraint ck_http_cache_status check (status_code between 100 and 599)
);
```

| Rule | Detail |
|---|---|
| Key | canonical URL: fragments and tracking params stripped (BR-06) |
| Write after 200 | `status_code = 200`; validators stored as received |
| Write after 304 | `status_code = 304`; validators kept; `checked_at` refreshed |
| Header reuse | `If-None-Match` / `If-Modified-Since` sent only when `etag` or `last_modified` is non-null |
| Upsert | `on conflict (url) do update set etag = excluded.etag, last_modified = excluded.last_modified, status_code = excluded.status_code, checked_at = excluded.checked_at` |
| Not cached | 4xx, 5xx, timeout, network_error rows |
| Retention | no automatic purge in v1; row count is bounded by distinct canonical URLs |

## 4. article fetch-state columns (referenced; defined in V001 by spec 01/04)

| Column | Type / constraint | Written by |
|---|---|---|
| `status` | text not null; `ck_article_status`: discovered, queued, processing, archived, skipped, failed, needs_review | OutcomeMapper (file 03 §5) |
| `attempt_count` | integer not null default 0; `ck_article_attempt_count`: 0..5 | RetryPolicy; set to 0 by manual retry (file 03 §3) |
| `next_attempt_at` | timestamptz, null = no retry scheduled | RetryPolicy |
| `failure_code` | text, null on success; frozen codes (BA 05) | OutcomeMapper |
| `failure_reason` | text, length <=500 characters | OutcomeMapper |
| `fetched_at` | timestamptz, null until first success | FetchLogWriter |

```sql
create index ix_article_next_attempt on article (next_attempt_at)
  where status = 'queued' and next_attempt_at is not null;
```

The partial index serves the due-retry scan (`status = 'queued' and next_attempt_at <= now()`)
run by the retry promoter (spec 04). It stays small because archived and failed rows are excluded.

## 5. Retention, grants, evidence

| Item | Rule |
|---|---|
| fetch_log retention | rows older than 90 days purged by the maintenance pass at boot + job end, batches of 10,000 (NFR-12) |
| Purge execution | per host (`host = ? and occurred_at < cut-off`), batches of 10 000 rows per statement, so `ix_fetch_log_host_time` serves each range scan |
| Purge metric | `crawler_fetch_log_purged_total` (file 05 §6) |
| Grants | `techblog_crawler_app`: SELECT, INSERT, DELETE on fetch_log; SELECT/INSERT/UPDATE/DELETE on http_cache |
| Transaction rule | fetch_log insert and article state update commit in one transaction; the queue acknowledge follows the commit (file 01 §4 step 7) |
| Migration evidence | G-H: fresh and upgrade boots apply V001/V002; `EXPLAIN` on `ix_article_next_attempt` recorded on a 10 000-row fixture |
