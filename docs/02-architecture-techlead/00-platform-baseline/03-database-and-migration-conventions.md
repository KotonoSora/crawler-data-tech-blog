# 03 — Database and Migration Conventions

## 1. Topology

| Item | Value |
|---|---|
| Engine | PostgreSQL 18.6 (LTS), single instance (compose service `postgres`) |
| Databases | `crawler_db` (crawler-service only), `api_db` (api-service only) |
| Isolation rule | no cross-database queries, no shared tables, no shared migration history |
| Version assert | each service checks `SHOW server_version` at boot; mismatch with 18.6 -> fail fast |
| Extensions | none required (UUIDv7 generated in app code as TEXT) |

## 2. Roles and grants

| Role | Owns | Grants |
|---|---|---|
| techblog_migrator | schema DDL in both databases | Flyway user; CREATE/ALTER/DROP on schema |
| techblog_crawler_app | no DDL | SELECT/INSERT/UPDATE/DELETE on crawler_db tables + sequences |
| techblog_api_app | no DDL | SELECT/INSERT/UPDATE/DELETE on api_db tables |

Each service connects with its own role via `SPRING_DATASOURCE_USERNAME`/`PASSWORD` (env only).
Migrations run as migrator; app runtime roles can be revoked during migration if needed.

## 3. Identifier and naming conventions

| Rule | Convention | Example |
|---|---|---|
| Primary keys | TEXT storing UUIDv7, generated in app code | `article.id = '0192f0c1-...'` |
| Foreign keys | `fk_<table>_<target>` | `fk_article_source` |
| Unique constraints | `uq_<table>_<cols>` | `uq_article_canonical_url` |
| Check constraints | `ck_<table>_<rule>` | `ck_article_status` |
| Indexes | `ix_<table>_<cols>` | `ix_fetch_log_host_time` |
| Tables/columns | snake_case, singular table nouns | `source`, `crawl_job`, `fetch_log` |
| Timestamps | `timestamptz`, UTC, `_at` suffix | `archived_at` |
| Booleans | `is_`/`enabled` style, NOT NULL with default | `enabled boolean not null default true` |
| Enums | TEXT + CHECK constraint (no PG enums) | `status in ('discovered','queued',...)` |

## 4. Flyway conventions

| Rule | Detail |
|---|---|
| Location | `services/<service>/src/main/resources/db/migration/` |
| Naming | `V<NNN>__<snake_case>.sql` (e.g. `V001__core_tables.sql`) |
| Direction | forward-only; applied files are immutable (never edit, never rename) |
| Fixes | new forward migration; destructive changes require a note in the migration header |
| Baseline | one history table per database (`flyway_schema_history`), owned by each service |
| `clean` | disabled everywhere including tests (`flyway.cleanDisabled=true`) |
| Seed data | versioned migrations only (e.g. source catalog seed), never ad-hoc SQL |

## 5. Baseline migration inventory

| Database | Migration | Contents | Owner spec |
|---|---|---|---|
| crawler_db | V001__core_tables.sql | source, article, crawl_job, fetch_log | 01/02/04 |
| crawler_db | V002__http_cache.sql | http_cache (conditional GET store) | 02 |
| crawler_db | V003__article_revisions.sql | article_revision | 03 |
| crawler_db | V004__source_health_view.sql | source_health view | 05 |
| crawler_db | V005__seed_sources.sql | 20 sources (DoorDash disabled) | 01 |
| api_db | V001__read_models.sql | source_summary, article_index, job_view, projection_offset | 06 |

## 6. Timeouts and pooling

| Setting | crawler-service | api-service |
|---|---|---|
| statement_timeout | 30 s | 30 s |
| lock_timeout | 5 s | 5 s |
| idle_in_transaction_session_timeout | 60 s | 60 s |
| Hikari maximumPoolSize | 10 | 5 |
| Hikari connectionTimeout | 5 s | 5 s |
| Hikari validation | `SELECT 1` on checkout | `SELECT 1` on checkout |

Applied via JDBC connection parameters (data source URL options) so every pooled connection inherits
them; asserted in integration tests.

## 7. Data safety rules

| Rule | Detail |
|---|---|
| No cascade deletes to archive | article deletion (if ever needed) never deletes disk files automatically |
| Revisions | every content_sha256 change appends an `article_revision` row before overwrite |
| Backup | `pg_dump` of both databases is part of the release checklist (G-I) |
| Retention | `fetch_log` pruned at 90 days (NFR-12); archive content never auto-deleted |
