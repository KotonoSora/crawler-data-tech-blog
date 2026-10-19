# 03 — API Contracts and Payloads

## 1. `meta.json` schema (BA 04, section 3 — frozen)

| Field | JSON type | Required | Value |
|---|---|---|---|
| source_key | string | yes | e.g. `cloudflare` |
| source_url | string | yes | blog home or feed origin |
| canonical_url | string | yes | identity; fragments + tracking params stripped (BR-06) |
| original_url | string | yes | URL as discovered |
| title | string | yes | article title |
| author | string, null | no | null when not extractable |
| published_at | string ISO 8601 UTC, null | no | null when unknown |
| fetched_at | string ISO 8601 UTC | yes | last successful fetch |
| content_sha256 | string, 64 lowercase hex | yes | sha256 of `content.md` bytes |
| word_count | integer | yes | >=0, of extracted Markdown |
| assets | array | yes | 0..100 entries; each `{file, sha256, source_url, bytes}` |

Asset entry: `file` = `img-<nnn>-<8hex>.<ext>`; `sha256` = stored bytes, 64 lowercase hex;
`source_url` = remote origin of the image; `bytes` = file size >0. Serialization: UTF-8, 2-space
indent, keys in table order, exactly 1 trailing LF. Truncation warning channel: file 01, DEVIATION
FLAGGED.

## 2. `content.md` contract (BA 04, section 4 — frozen)

| Rule | Value |
|---|---|
| Format | UTF-8 without BOM, LF, CommonMark |
| First line | `# <title>` |
| Attribution line | author and date below H1 when both known |
| Footer | `---`, original URL, source name, fetched date (BR-12) |
| Images | `assets/<file>` only; 0 remote image URLs (BR-10, AC-14) |
| Links | absolute `http`/`https`; tracking params stripped; 0 `javascript:` URLs |
| Size | <=2 MB (2,097,152 bytes) |
| HTML | 0 raw HTML blocks, 0 `<script>`/`<iframe>` (BR-08) |
| End | exactly 1 trailing LF |

## 3. `assets/` contract (BA 04, section 5 — frozen)

| Rule | Value |
|---|---|
| Naming | `img-<nnn>-<8hex>.<ext>`; `nnn` 001..100 in first-reference order; `8hex` = sha256 prefix |
| Extensions | jpg, png, gif, webp, avif, taken from the response media type; SVG always skipped |
| Limits | <=100 files, <=50 MB (52,428,800 bytes) total, <=25 MB (26,214,400 bytes) per image |
| Dedup | identical sha256 stored once; all references point to the same file |
| Location | `<article dir>/assets/`, referenced as `assets/<file>` |

## 4. Internal endpoints (crawler-service, base `/internal/v1`)

Compose-internal only, published at most on the loopback host port (baseline 04, section 2).
api-service never reads crawler disk; it calls these endpoints on demand.

| Method | Path | Success | Errors |
|---|---|---|---|
| GET | `/internal/v1/articles/{id}` | 200 JSON `ArticleMetadata` | 404 `ART-NOT-FOUND` |
| GET | `/internal/v1/articles/{id}/content` | 200 `text/markdown; charset=utf-8`, body <=2 MB | 404 `ART-NOT-FOUND` when not archived; 503 `OPS-DEPENDENCY-DOWN` when the file is unreadable |
| GET | `/internal/v1/articles/{id}/assets/{file}` | 200 binary stream with `Content-Type`, `Content-Length`, `ETag` = sha256 | 400 `CFG-INVALID-REQUEST` on a bad name; 404 `ART-NOT-FOUND` |

`ArticleMetadata`: `articleId`, `sourceKey`, `slug`, `title`, `author`, `publishedAt`, `fetchedAt`,
`archivedAt`, `contentSha256`, `wordCount`, `status`, `diskPath`, `assetCount`, `failureCode`.
`diskPath` is the container path `data/uploads/crawl/<source-key>/<slug>/`. Asset responses send
`Cache-Control: no-store` (baseline 05, section 5); only GET is supported.

## 5. Event `article.archived`

Envelope (baseline 01, section 3 — frozen): `{eventId, type, occurredAt, version: 1, payload}`.

```json
{
  "eventId": "0192f0c1-1111-7000-8000-111111111111",
  "type": "article.archived",
  "occurredAt": "2026-10-19T09:15:04.221Z",
  "version": 1,
  "payload": {
    "articleId": "0192f0c1-8b3e-7c00-9f21-77ab21c0f3d1",
    "sourceKey": "cloudflare",
    "slug": "how-we-built-our-http-proxy",
    "contentSha256": "3f7a...64-lowercase-hex",
    "wordCount": 2841,
    "archivedAt": "2026-10-19T09:15:04.200Z",
    "title": "How we built our HTTP proxy"
  }
}
```

Published only after the atomic move and the DB commit (baseline 05, section 2). Consumers upsert
idempotently by `articleId`; delivery is at-least-once.

## 6. Error payloads (RFC 9457 ProblemDetail)

`type` = `urn:tech-blog:error:<CODE>`; `title`, `status`, `detail`, `instance` are always present.

```json
{
  "type": "urn:tech-blog:error:EXTRACT-EMPTY-CONTENT",
  "title": "Extracted content below minimum length",
  "status": 422,
  "detail": "Article produced 87 characters of Markdown (<200); status needs_review; no file written.",
  "instance": "/internal/v1/articles/0192f0c1-8b3e-7c00-9f21-77ab21c0f3d1"
}
```

```json
{
  "type": "urn:tech-blog:error:STORE-INVALID-SLUG",
  "title": "Generated slug failed validation",
  "status": 422,
  "detail": "Slug 'How-We-Built--It' does not match ^[a-z0-9][a-z0-9-]{0,79}$; no file written.",
  "instance": "/internal/v1/articles/0192f0c1-8b3e-7c00-9f21-77ab21c0f3d1"
}
```

| Code | HTTP status | Article effect |
|---|---|---|
| EXTRACT-PARSE-FAILED | 422 | needs_review, 0 files, after 2 attempts |
| EXTRACT-EMPTY-CONTENT | 422 | needs_review, 0 files |
| EXTRACT-ASSET-LIMIT | 200 | archived; extra assets skipped (log + metric warning) |
| EXTRACT-ASSET-SKIPPED | 200 | archived; image reference removed (log + metric warning) |
| STORE-DISK-FULL | 507 | job paused below 5 GB free (BA 05) |
| STORE-RENAME-FAILED | 500 | 1 retry, then failed |
| STORE-INVALID-SLUG | 422 | needs_review, 0 files |

`EXTRACT-ASSET-SKIPPED` (part of the frozen code set) covers per-image skips;
`EXTRACT-ASSET-LIMIT` covers article-level cap overflow. Both leave the article archived.
