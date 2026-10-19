-- V002__projection_seed_and_indexes.sql
-- Forward-only additions on top of V001 (baseline 03 §4-5).
-- 1) seed the consumer offset row required by BE-06-09 / file 02 §2
-- 2) indexes for the global newest-first article list and job list
-- 3) article metadata needed by ArticleDetail but absent from V001 (spec 06 file 03 §3)

INSERT INTO projection_offset (consumer, lag_seconds, updated_at)
VALUES ('api-projections', 0, now())
ON CONFLICT (consumer) DO NOTHING;

CREATE INDEX IF NOT EXISTS ix_article_index_archived
    ON article_index (archived_at DESC NULLS LAST, id);

CREATE INDEX IF NOT EXISTS ix_job_view_requested
    ON job_view (requested_at DESC);

ALTER TABLE article_index ADD COLUMN IF NOT EXISTS original_url TEXT;
ALTER TABLE article_index ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE article_index ADD COLUMN IF NOT EXISTS fetched_at TIMESTAMPTZ;
