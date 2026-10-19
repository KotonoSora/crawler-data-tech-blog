-- V001__read_models.sql
-- api_db read models, projected from the Redis event stream (spec 06, file 02).

CREATE TABLE source_summary (
    source_id       TEXT PRIMARY KEY,
    source_key      TEXT NOT NULL,
    name            TEXT NOT NULL,
    enabled         BOOLEAN NOT NULL,
    discovery_type  TEXT NOT NULL,
    article_count   INTEGER NOT NULL DEFAULT 0,
    archived_count  INTEGER NOT NULL DEFAULT 0,
    failed_count    INTEGER NOT NULL DEFAULT 0,
    last_success_at TIMESTAMPTZ,
    health          TEXT NOT NULL DEFAULT 'fresh',
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_source_summary_key UNIQUE (source_key),
    CONSTRAINT ck_source_summary_health CHECK (health IN ('fresh', 'stale', 'broken')),
    CONSTRAINT ck_source_summary_counts CHECK (article_count >= 0 AND archived_count >= 0 AND failed_count >= 0)
);

CREATE TABLE article_index (
    id            TEXT PRIMARY KEY,
    source_key    TEXT NOT NULL,
    slug          TEXT,
    title         TEXT NOT NULL,
    author        TEXT,
    published_at  TIMESTAMPTZ,
    archived_at   TIMESTAMPTZ,
    status        TEXT NOT NULL,
    content_sha256 TEXT,
    search_tsv    tsvector GENERATED ALWAYS AS (to_tsvector('simple', coalesce(title, ''))) STORED,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX ix_article_index_source_archived ON article_index (source_key, archived_at DESC);
CREATE INDEX ix_article_index_search_tsv      ON article_index USING GIN (search_tsv);

CREATE TABLE job_view (
    id                TEXT PRIMARY KEY,
    source_key        TEXT NOT NULL,
    job_type          TEXT NOT NULL,
    status            TEXT NOT NULL,
    requested_at      TIMESTAMPTZ NOT NULL,
    started_at        TIMESTAMPTZ,
    finished_at       TIMESTAMPTZ,
    discovered_count  INTEGER NOT NULL DEFAULT 0,
    archived_count    INTEGER NOT NULL DEFAULT 0,
    skipped_count     INTEGER NOT NULL DEFAULT 0,
    failed_count      INTEGER NOT NULL DEFAULT 0,
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_job_view_counters CHECK (
        discovered_count >= 0 AND archived_count >= 0 AND skipped_count >= 0 AND failed_count >= 0)
);

CREATE INDEX ix_job_view_source_requested ON job_view (source_key, requested_at DESC);

CREATE TABLE projection_event (
    event_id      TEXT PRIMARY KEY,
    consumer      TEXT NOT NULL,
    occurred_at   TIMESTAMPTZ NOT NULL,
    processed_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE projection_offset (
    consumer         TEXT PRIMARY KEY,
    last_event_id    TEXT,
    last_occurred_at TIMESTAMPTZ,
    lag_seconds      INTEGER NOT NULL DEFAULT 0,
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_projection_offset_lag CHECK (lag_seconds >= 0)
);
