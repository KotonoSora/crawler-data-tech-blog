-- AC-07: title search must support arbitrary substrings, not only token prefixes.
-- The GIN trigram index keeps the `lower(title) LIKE '%term%'` branch fast at 1,000+ rows.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS ix_article_index_title_trgm
    ON article_index USING GIN (lower(title) gin_trgm_ops);
