# 02 — Database Schema Design

Scope: `api_db`, owned by api-service. Migration per baseline 03 §4-5:
`services/api-service/src/main/resources/db/migration/V001__read_models.sql`. Forward-only;
per-database Flyway history; `clean` disabled everywhere.

## 1. Conventions applied

| Item | Value |
|---|---|
| IDs | TEXT storing UUIDv7, generated in app code (baseline 03 §3) |
| Timestamps | `timestamptz`, UTC, `_at` suffix |
| Enums | TEXT + CHECK constraint (no PG enums) |
| Names | snake_case; `ck_` / `uq_` / `ix_` prefixes |
| Extensions | none; search uses built-in `tsvector` with `'simple'` config |
| Session | statement_timeout 30 s, lock_timeout 5 s, Hikari pool 5 (baseline 03 §6) |
| Roles | `techblog_migrator` owns DDL; `techblog_api_app` has DML only |

## 2. DDL (V001)

```sql
create table source_summary (
  source_id       text primary key,
  key             text not null,
  name            text not null,
  enabled         boolean not null default true,
  discovery_type  text not null,
  article_count   integer not null default 0,
  archived_count  integer not null default 0,
  failed_count    integer not null default 0,
  last_success_at timestamptz,
  health          text not null default 'fresh',
  updated_at      timestamptz not null,
  constraint uq_source_summary_key unique (key),
  constraint ck_source_summary_discovery_type
    check (discovery_type in ('feed','sitemap','listing')),
  constraint ck_source_summary_health
    check (health in ('fresh','stale','broken')),
  constraint ck_source_summary_counts
    check (article_count >= 0 and archived_count >= 0 and failed_count >= 0)
);

create table article_index (
  id             text primary key,
  source_key     text not null,
  title          text not null,
  slug           text not null,
  author         text,
  published_at   timestamptz,
  archived_at    timestamptz,
  status         text not null,
  content_sha256 text,
  updated_at     timestamptz not null,
  search_tsv     tsvector generated always as (to_tsvector('simple', title)) stored,
  constraint ck_article_index_status check (status in
    ('discovered','queued','processing','archived','failed','needs_review','skipped')),
  constraint ck_article_index_sha check
    (content_sha256 is null or content_sha256 ~ '^[0-9a-f]{64}$')
);

create table job_view (
  id               text primary key,
  source_key       text not null,
  job_type         text not null,
  status           text not null,
  requested_at     timestamptz not null,
  started_at       timestamptz,
  finished_at      timestamptz,
  discovered_count integer not null default 0,
  archived_count   integer not null default 0,
  skipped_count    integer not null default 0,
  failed_count     integer not null default 0,
  updated_at       timestamptz not null,
  constraint ck_job_view_job_type check (job_type in ('backfill','incremental')),
  constraint ck_job_view_status check (status in
    ('pending','running','completed','failed','cancelled')),
  constraint ck_job_view_counters check (discovered_count >= 0 and archived_count >= 0
    and skipped_count >= 0 and failed_count >= 0)
);

create table projection_offset (
  consumer         text primary key,
  last_event_id    text,
  last_occurred_at timestamptz,
  lag_seconds      integer not null default 0,
  updated_at       timestamptz not null,
  constraint ck_projection_offset_lag check (lag_seconds >= 0)
);

create table projection_event (            -- eventId dedupe (section 4)
  event_id    text primary key,
  type        text not null,
  occurred_at timestamptz not null,
  consumed_at timestamptz not null
);

create index ix_article_index_source_archived
  on article_index (source_key, archived_at desc nulls last);
create index ix_article_index_search_tsv on article_index using gin (search_tsv);
create index ix_job_view_source_requested on job_view (source_key, requested_at desc);

insert into projection_offset (consumer, lag_seconds, updated_at)
values ('api-projections', 0, now());
```

## 3. Column semantics

| Field | Meaning | Written from |
|---|---|---|
| source_summary counts | article_count = discovered articles; archived_count = status `archived`; failed_count = status `failed` | `source.stats` event |
| source_summary.health | fresh / stale / broken per BA 03 §6 (72 h no success; 5 consecutive discovery failures) | `source.stats`; api-service never recomputes |
| article_index.content_sha256 | null until archived; full 64-hex value; API shows first 12 chars | `article.archived` |
| article_index.status | mirrors the crawler article status enum (owner: spec 04) | `article.*` events |
| job_view counters | per-job cumulative counters; monotonic within a job | `job.updated` |
| projection_offset.lag_seconds | integer seconds, updated per applied event | consumer |

## 4. Upserts, idempotency, guards

| Event type | Target table | Conflict target | Guard |
|---|---|---|---|
| article.archived | article_index | `(id)` | `excluded.updated_at >= updated_at` |
| article.failed | article_index | `(id)` | same |
| job.updated | job_view | `(id)` | same |
| source.stats | source_summary | `(key)` | same |

- Id-keyed models conflict on `(id)` as frozen. `source_summary` conflicts on `(key)`: `source.stats`
  carries the key as identity and `uq_source_summary_key` is the only uniqueness that can be
  violated; `source_id` is written on first insert only.
- Monotonic guard: update only when `excluded.updated_at >= stored.updated_at`; a late, older event
  cannot regress counters/status. Equal timestamps re-apply identical values (idempotent).
- One transaction per event: (1) `insert into projection_event ... on conflict (event_id) do
  nothing` — rowcount 0 means duplicate, commit and XACK; (2) target upsert; (3) `projection_offset`
  update (`last_event_id`, `last_occurred_at`, `lag_seconds`); (4) commit, then XACK.
- Dedupe choice: **`projection_event` table**, not a `last_event_id` watermark. Rationale: a
  watermark cannot detect a redelivered event that is not the newest (XAUTOCLAIM after min-idle
  60 s) nor share a commit with multi-row upserts; the dedupe insert does both.
  `projection_offset.last_event_id` is observability/lag only.
- Pruning: `delete from projection_event where consumed_at < now() - interval '7 days'`, run at
  boot and with each reconciliation pass (no timer); expected volume ≤4 events/s steady state.

## 5. Query patterns and indexes

| Read | Predicate / order | Index |
|---|---|---|
| sources list | `order by key` | seq scan, ≤20 rows — no index |
| source by key | `key = $1` | `uq_source_summary_key` |
| articles by source | `source_key = $1 order by archived_at desc nulls last, id` | `ix_article_index_source_archived` |
| article search | `search_tsv @@ tsquery order by archived_at desc nulls last, id` | `ix_article_index_search_tsv` |
| article by id | `id = $1` | primary key |
| jobs by source | `source_key = $1 order by requested_at desc` | `ix_job_view_source_requested` |
| jobs newest-first | `order by requested_at desc` | in-memory sort, ≤10k rows expected |

Search query construction: split `q` on non-alphanumeric characters; each token becomes a prefix
lexeme (`token:*`, AND-joined, e.g. `logs:* & moved:*`), built in Kotlin — never string-interpolated
into SQL. `'simple'` does no stemming, so matches are case-insensitive but exact-prefix ("archiving"
≠ "archive"); accepted locally, revisit only if AC-07 usability fails.

## 6. Retention and safety

| Item | Policy |
|---|---|
| projection_event | ≤7 days (section 4) |
| Other tables | no pruning; api_db is rebuildable and small (≤100k article rows at 20 sources) |
| Backup | release gate G-I `pg_dump api_db` (baseline 03 §7) |
| No FK on `source_key` | soft reference by design: event order across types is not guaranteed, so an article upsert could precede its `source.stats`; drift is caught by each reconciliation pass (file 01 §4) |
