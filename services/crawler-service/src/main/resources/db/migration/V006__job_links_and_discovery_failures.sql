-- V006__job_links_and_discovery_failures.sql
-- Forward-only additions (baseline 03 §4-5). V001 is frozen.
--
-- 1) article.last_job_id: the failures endpoint lists the articles a job touched, and a
--    retry must be able to detach an article from the job that failed it.
-- 2) source.consecutive_discovery_failures: BA 03 §6 defines `broken` as 5 consecutive
--    discovery failures; the counter lives on the registry row.

ALTER TABLE article ADD COLUMN IF NOT EXISTS last_job_id TEXT;
ALTER TABLE article
    ADD CONSTRAINT fk_article_last_job
    FOREIGN KEY (last_job_id) REFERENCES crawl_job (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS ix_article_last_job_status ON article (last_job_id, status);

ALTER TABLE source ADD COLUMN IF NOT EXISTS consecutive_discovery_failures INTEGER NOT NULL DEFAULT 0;

ALTER TABLE source
    ADD CONSTRAINT ck_source_discovery_failures CHECK (consecutive_discovery_failures >= 0);
