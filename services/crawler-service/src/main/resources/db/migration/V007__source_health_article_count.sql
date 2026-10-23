-- V007__source_health_article_count.sql
-- UI SourceSummary.articleCount is the number of articles the source has discovered,
-- not only the terminal archived+failed subset. The view stays the single aggregate read.

CREATE OR REPLACE VIEW source_health AS
SELECT
    s.id                              AS source_id,
    s.source_key                      AS source_key,
    s.enabled                         AS enabled,
    count(a.id)                       AS article_count,
    count(a.id) FILTER (WHERE a.status = 'archived') AS archived_count,
    count(a.id) FILTER (WHERE a.status IN ('failed', 'needs_review')) AS failed_count,
    max(a.archived_at)                AS last_archived_at
FROM source s
LEFT JOIN article a ON a.source_id = s.id
GROUP BY s.id, s.source_key, s.enabled;
