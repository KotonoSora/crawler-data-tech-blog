-- V003__article_revisions.sql
-- Append a row whenever content_sha256 changes, before the archive overwrite (BR-07).

CREATE TABLE article_revision (
    id              TEXT PRIMARY KEY,
    article_id      TEXT NOT NULL,
    content_sha256  TEXT NOT NULL,
    captured_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT fk_article_revision_article FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE,
    CONSTRAINT ck_article_revision_sha CHECK (content_sha256 ~ '^[a-f0-9]{64}$')
);

CREATE INDEX ix_article_revision_article ON article_revision (article_id, captured_at DESC);
