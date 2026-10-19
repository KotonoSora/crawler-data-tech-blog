# 02 — Database Schema Design

## 1. Scope

`crawler_db` only. This spec owns the extraction-result columns of `article` (created by
`V001__core_tables.sql`, baseline 03, section 5) and all of `V003__article_revisions.sql`. api_db read
models belong to spec 06. Conventions (TEXT UUIDv7 ids, snake_case, `ck_`/`uq_`/`fk_`/`ix_`,
timestamptz UTC) are baseline 03.

## 2. `article` — content and result columns

| Column | Type | Constraint | Notes |
|---|---|---|---|
| id | text | `pk` | UUIDv7, generated in app code |
| source_id | text | `fk_article_source`, not null | -> `source(id)` |
| slug | text | not null, `uq_article_source_slug`, `ck_article_slug_regex` | matches `^[a-z0-9][a-z0-9-]{0,79}$`; assigned once, never rewritten (BR-07) |
| title | text | not null | <=512 characters, app-validated |
| author | text | null | null when not extractable |
| published_at | timestamptz | null | UTC; null when unknown |
| fetched_at | timestamptz | not null | last successful fetch |
| archived_at | timestamptz | null | set with the DB commit after `ATOMIC_MOVE` |
| content_sha256 | text | `ck_article_content_sha256` | 64 lowercase hex; sha256 of `content.md` bytes |
| word_count | integer | not null default 0, `ck_article_word_count` | >=0 |
| status | text | not null, `ck_article_status` | `discovered`, `queued`, `processing`, `archived`, `failed`, `needs_review`, `skipped` |
| failure_code | text | null | stable code, e.g. `EXTRACT-EMPTY-CONTENT` |
| failure_reason | text | null | plain text, <=500 characters |
| attempt_count | integer | not null default 0, `ck_article_attempt_count` | >=0; not reset on reclaim (BA 03, section 4) |
| updated_at | timestamptz | not null default now() | UTC |

DDL fragments (in V001):

```sql
constraint uq_article_source_slug    unique (source_id, slug),
constraint ck_article_slug_regex     check (slug ~ '^[a-z0-9][a-z0-9-]{0,79}$'),
constraint ck_article_content_sha256 check (content_sha256 is null or content_sha256 ~ '^[0-9a-f]{64}$'),
constraint ck_article_word_count     check (word_count >= 0),
constraint ck_article_attempt_count  check (attempt_count >= 0),
constraint ck_article_status         check (status in ('discovered','queued','processing',
                                                     'archived','failed','needs_review','skipped'));

create index ix_article_status_archived_at on article (status, archived_at desc);
```

`ix_article_status_archived_at` serves job counters (`archived_count`), the 72 h staleness check
(BA 03, section 6) and the `needs_review` queue; `status` is the leading column, so the index is not
partial.

## 3. `article_revision` (V003)

| Column | Type | Constraint | Notes |
|---|---|---|---|
| id | text | `pk` | UUIDv7 |
| article_id | text | `fk_article_revision_article`, not null | -> `article(id)`, on delete cascade |
| content_sha256 | text | `ck_article_revision_sha256` | superseded version, 64 lowercase hex |
| word_count | integer | not null, `ck_article_revision_word_count` | >=0, of the superseded version |
| captured_at | timestamptz | not null | UTC, when the row was appended |

```sql
create table article_revision (
  id             text        primary key,
  article_id     text        not null,
  content_sha256 text        not null,
  word_count     integer     not null,
  captured_at    timestamptz not null,
  constraint fk_article_revision_article foreign key (article_id)
      references article (id) on delete cascade,
  constraint ck_article_revision_sha256  check (content_sha256 ~ '^[0-9a-f]{64}$'),
  constraint ck_article_revision_word_count check (word_count >= 0)
);

create index ix_article_revision_article_captured_at
    on article_revision (article_id, captured_at desc);
```

Write rule: a re-archive appends 1 row for the version being superseded, before the atomic move and
the `article` update (baseline 03, section 7; baseline 05, section 2). Same `content_sha256` -> no
row, no rewrite, counted `skipped` (BR-07). Rows are append-only and never pruned; a reverted sha
appends a new row, so the history stays ordered.

## 4. Rationale: no asset table

| Question | Answer |
|---|---|
| Asset source of truth | disk `assets/` + `meta.json` (BA 04, section 5) |
| DB representation | integrity hash only: `article.content_sha256`, `article_revision.content_sha256` |
| Why no `article_asset` table | 100 rows per article x 20,000 articles = 2,000,000 rows with no query need |
| Drift risk | `meta.json` is rewritten atomically with content; a second copy can diverge |
| Verification | boot reconciliation compares DB `archived_at`/sha with disk (baseline 05) |

## 5. Migration and rollout

| Item | Value |
|---|---|
| File | `services/crawler-service/src/main/resources/db/migration/V003__article_revisions.sql` |
| Order | after V002; forward-only, applied files immutable (baseline 03, section 4) |
| Fresh DB | V001..V005 apply in order; V003 adds 1 table + 1 index |
| Upgrade DB | no `article` rewrite; no data backfill |
| Test | Testcontainers PG 18.6, fresh + upgrade boot (gate G-H) |
