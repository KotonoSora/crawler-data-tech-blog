-- V002__http_cache.sql
-- Conditional GET store: ETag / Last-Modified per URL (BR-05).
-- Retention: rows not checked in 30 days are purged by the ops job (spec 05).

CREATE TABLE http_cache (
    url            TEXT PRIMARY KEY,
    etag           TEXT,
    last_modified  TEXT,
    status_code    INTEGER,
    checked_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT ck_http_cache_status CHECK (status_code IS NULL OR (status_code >= 100 AND status_code <= 599))
);

CREATE INDEX ix_http_cache_checked_at ON http_cache (checked_at);
