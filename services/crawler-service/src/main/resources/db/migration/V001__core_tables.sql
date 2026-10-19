-- V001__core_tables.sql
-- Core crawl truth: source registry, articles, jobs, fetch audit.
-- Conventions: docs/02-architecture-techlead/00-platform-baseline/03-database-and-migration-conventions.md

CREATE TABLE source (
    id                TEXT PRIMARY KEY,
    source_key        TEXT NOT NULL,
    name              TEXT NOT NULL,
    discovery_type    TEXT NOT NULL,
    discovery_url     TEXT NOT NULL,
    listing_url       TEXT,
    discovery_config  JSONB NOT NULL DEFAULT '{}'::jsonb,
    enabled           BOOLEAN NOT NULL DEFAULT TRUE,
    rate_limit_ms     INTEGER NOT NULL DEFAULT 2000,
    notes             TEXT,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_source_key UNIQUE (source_key),
    CONSTRAINT ck_source_key_format CHECK (source_key ~ '^[a-z0-9][a-z0-9-]{1,49}$'),
    CONSTRAINT ck_source_discovery_type CHECK (discovery_type IN ('feed', 'sitemap', 'listing')),
    CONSTRAINT ck_source_rate_limit_ms CHECK (rate_limit_ms >= 500)
);

CREATE TABLE article (
    id               TEXT PRIMARY KEY,
    source_id        TEXT NOT NULL,
    canonical_url    TEXT NOT NULL,
    original_url     TEXT,
    title            TEXT,
    author           TEXT,
    slug             TEXT,
    published_at     TIMESTAMPTZ,
    fetched_at       TIMESTAMPTZ,
    archived_at      TIMESTAMPTZ,
    content_sha256   TEXT,
    word_count       INTEGER,
    status           TEXT NOT NULL DEFAULT 'discovered',
    failure_code     TEXT,
    failure_reason   TEXT,
    attempt_count    INTEGER NOT NULL DEFAULT 0,
    next_attempt_at  TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_article_source FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE RESTRICT,
    CONSTRAINT uq_article_canonical_url UNIQUE (canonical_url),
    CONSTRAINT uq_article_source_slug UNIQUE (source_id, slug),
    CONSTRAINT ck_article_status CHECK (
        status IN ('discovered', 'queued', 'processing', 'archived', 'skipped', 'needs_review', 'failed')),
    CONSTRAINT ck_article_slug_regex CHECK (slug IS NULL OR slug ~ '^[a-z0-9][a-z0-9-]{0,79}$'),
    CONSTRAINT ck_article_content_sha CHECK (content_sha256 IS NULL OR content_sha256 ~ '^[a-f0-9]{64}$'),
    CONSTRAINT ck_article_attempt_count CHECK (attempt_count >= 0 AND attempt_count <= 5),
    CONSTRAINT ck_article_word_count CHECK (word_count IS NULL OR word_count >= 0)
);

CREATE INDEX ix_article_source_status       ON article (source_id, status);
CREATE INDEX ix_article_status              ON article (status);
CREATE INDEX ix_article_status_archived_at  ON article (status, archived_at DESC);
CREATE INDEX ix_article_next_attempt        ON article (next_attempt_at) WHERE next_attempt_at IS NOT NULL;

CREATE TABLE crawl_job (
    id                TEXT PRIMARY KEY,
    source_id         TEXT NOT NULL,
    job_type          TEXT NOT NULL,
    status            TEXT NOT NULL DEFAULT 'pending',
    cursor            TEXT,
    requested_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    started_at        TIMESTAMPTZ,
    finished_at       TIMESTAMPTZ,
    discovered_count  INTEGER NOT NULL DEFAULT 0,
    archived_count    INTEGER NOT NULL DEFAULT 0,
    skipped_count     INTEGER NOT NULL DEFAULT 0,
    failed_count      INTEGER NOT NULL DEFAULT 0,
    last_error        TEXT,
    CONSTRAINT fk_crawl_job_source FOREIGN KEY (source_id) REFERENCES source (id) ON DELETE RESTRICT,
    CONSTRAINT ck_crawl_job_type CHECK (job_type IN ('backfill', 'incremental')),
    CONSTRAINT ck_crawl_job_status CHECK (
        status IN ('pending', 'running', 'paused', 'completed', 'failed', 'cancelled')),
    CONSTRAINT ck_crawl_job_counters CHECK (
        discovered_count >= 0 AND archived_count >= 0 AND skipped_count >= 0 AND failed_count >= 0)
);

CREATE UNIQUE INDEX uq_crawl_job_active_source ON crawl_job (source_id)
    WHERE status IN ('pending', 'running', 'paused');
CREATE INDEX ix_crawl_job_source_status   ON crawl_job (source_id, status);
CREATE INDEX ix_crawl_job_status_requested ON crawl_job (status, requested_at DESC);

CREATE TABLE fetch_log (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    article_id   TEXT,
    job_id       TEXT,
    host         TEXT NOT NULL,
    url          TEXT NOT NULL,
    method       TEXT NOT NULL DEFAULT 'GET',
    status_code  INTEGER,
    outcome      TEXT NOT NULL,
    duration_ms  INTEGER NOT NULL,
    bytes        BIGINT,
    attempt      INTEGER NOT NULL DEFAULT 1,
    occurred_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_fetch_log_article FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE SET NULL,
    CONSTRAINT fk_fetch_log_job FOREIGN KEY (job_id) REFERENCES crawl_job (id) ON DELETE SET NULL,
    CONSTRAINT ck_fetch_log_outcome CHECK (outcome IN (
        'ok', 'not_modified', 'robots_denied', 'http_error', 'timeout',
        'network_error', 'parse_error', 'too_large', 'blocked')),
    CONSTRAINT ck_fetch_log_duration CHECK (duration_ms >= 0),
    CONSTRAINT ck_fetch_log_bytes CHECK (bytes IS NULL OR bytes >= 0),
    CONSTRAINT ck_fetch_log_status CHECK (status_code IS NULL OR (status_code >= 100 AND status_code <= 599))
);

CREATE INDEX ix_fetch_log_host_time   ON fetch_log (host, occurred_at DESC);
CREATE INDEX ix_fetch_log_article     ON fetch_log (article_id);
CREATE INDEX ix_fetch_log_occurred_at ON fetch_log (occurred_at);
