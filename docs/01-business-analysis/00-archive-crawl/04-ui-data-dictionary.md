# 04 — UI and Data Dictionary

## 1. Web screens

| Route | Screen | Data source (api-service) |
|---|---|---|
| `/` | Dashboard: sources, counters, staleness badges | `GET /api/v1/sources` |
| `/sources/:key` | Source detail: articles, job history | `GET /api/v1/sources/{key}`, `/api/v1/articles?source=` |
| `/articles` | Article list: filter by source/date, search title | `GET /api/v1/articles?q=&source=&page=` |
| `/articles/:id` | Reader: rendered Markdown, local images, original link | `GET /api/v1/articles/{id}` |
| `/jobs` | Job history table | `GET /api/v1/jobs` |
| `/jobs/:id` | Job detail: counters, failures, actions | `GET /api/v1/jobs/{id}` |
| global | Trigger actions: Crawl source now (backfill), Run incremental, Refresh stale (bulk), Cancel job, Retry article; enable/disable | `POST /api/v1/crawl-jobs`, `POST /api/v1/crawl-jobs/{id}/cancel`, `POST /api/v1/articles/{id}/retry`, `PATCH /api/v1/sources/{key}` |

## 2. API view models (web-facing)

| DTO | Fields |
|---|---|
| SourceSummary | key, name, enabled, discoveryType, articleCount, archivedCount, failedCount, lastSuccessAt, health (`fresh`/`stale`/`broken`), updatedAt |
| ArticleSummary | id, sourceKey, title, slug, author, publishedAt, archivedAt, status, contentSha256 (short), tags? (none) |
| ArticleDetail | ArticleSummary + contentMarkdown, assetBasePath, originalUrl, sourceUrl, fetchedAt |
| JobSummary | id, sourceKey, jobType, status, requestedAt, startedAt, finishedAt, discovered/archived/skipped/failed counters |
| JobFailure | articleId, title, failureCode, failureReason, attemptCount, lastAttemptAt |
| HealthSummary | service, status (`UP`/`DOWN`), checkedAt, details[] |

## 3. On-disk data dictionary — `meta.json` per article

| Field | Type | Required | Notes |
|---|---|---|---|
| source_key | string | yes | e.g. `cloudflare` |
| source_url | string | yes | blog home / feed origin |
| canonical_url | string | yes | identity; fragments + tracking params stripped (BR-06) |
| original_url | string | yes | URL as discovered (before normalization) |
| title | string | yes | from article metadata |
| author | string | no | null if not extractable |
| published_at | string (ISO 8601 UTC) | no | null if unknown |
| fetched_at | string (ISO 8601 UTC) | yes | last successful fetch |
| content_sha256 | string (64 hex) | yes | sha256 of `content.md` bytes |
| word_count | integer | yes | of extracted Markdown |
| assets | array | yes | each: `{file, sha256, source_url, bytes}` |

## 4. `content.md` contract

| Rule | Detail |
|---|---|
| Format | UTF-8, LF line endings, CommonMark |
| Header | H1 title as first line (author + date as a small attribution line below) |
| Footer | Attribution block: original URL, source name, fetched date (BR-12) |
| Images | Relative paths `assets/<file>` only; no remote URLs (BR-10) |
| Links | Absolute URLs preserved; tracking params stripped |
| Max size | 2 MB per file; larger extraction is truncated — warning log + `crawler_content_truncated_total` metric (spec 03, file 05) |
| No HTML | Raw HTML blocks are converted or removed; no scripts/iframes (BR-08) |

## 5. `assets/` contract

| Rule | Detail |
|---|---|
| Naming | `img-<nnn>-<8-hex>.<ext>` (nnn = article sequence, hex = sha256 prefix) |
| Sources | Only images referenced by the extracted article content |
| Limits | <=100 files and <=50 MB total per article |
| Dedup | Identical sha256 within an article stored once |

## 6. Service-side entities (summary; DDL in TL specs)

| Store | Entity | Purpose |
|---|---|---|
| crawler_db | source, article, article_revision, crawl_job, fetch_log, http_cache | crawl truth + audit |
| api_db | source_summary, article_index, job_view, projection_offset | read models for the UI |
| Redis | queues, locks, retries, event stream | work distribution + events |

`api_db` read models are projections; `crawler_db` is the system of record. UI never reads
crawler_db directly (BR-16).
