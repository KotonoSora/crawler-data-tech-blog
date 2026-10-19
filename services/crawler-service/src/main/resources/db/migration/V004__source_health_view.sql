-- V004__source_health_view.sql
-- Ops read model: per-source counters and freshness timestamps.
-- Staleness (72 h threshold) is computed in the app, not the view (spec 05, file 02).

CREATE OR REPLACE VIEW source_health AS
SELECT
    s.id                              AS source_id,
    s.source_key                      AS source_key,
    s.enabled                         AS enabled,
    count(a.id) FILTER (WHERE a.status = 'archived') AS archived_count,
    count(a.id) FILTER (WHERE a.status = 'failed')   AS failed_count,
    max(a.archived_at)                AS last_archived_at
FROM source s
LEFT JOIN article a ON a.source_id = s.id
GROUP BY s.id, s.source_key, s.enabled;

CREATE INDEX ix_article_archived_at ON article (archived_at);
