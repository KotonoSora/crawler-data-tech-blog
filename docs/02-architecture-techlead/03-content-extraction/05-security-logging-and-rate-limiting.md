# 05 — Security, Logging and Rate Limiting

## 1. Sanitization rules (extraction-time)

| Element or attribute | Action |
|---|---|
| `script`, `style`, `noscript` | removed with subtree |
| `iframe` | converted to a Markdown link to its `src` (label = host + path); invalid `src` -> removed |
| `object`, `embed`, `form`, `input`, `button`, `select`, `textarea` | removed with subtree |
| `on*` attributes (`onclick`, `onload`, ...) | stripped |
| URL schemes | allowlist `http`, `https`; `javascript:`, `data:`, `vbscript:`, `file:` stripped |
| `a[href]` | kept when absolute `http`/`https`; relative hrefs resolved against the base URI |
| comments, `meta`, `link`, `base` | removed |

Defense in depth: web re-sanitizes at render time with rehype-sanitize (spec 07).

## 2. Filesystem and path guards

| Guard | Rule |
|---|---|
| Slug | validated against `^[a-z0-9][a-z0-9-]{0,79}$` before any filesystem call; failure -> `STORE-INVALID-SLUG`, `needs_review`, 0 writes |
| Traversal | reject any segment equal to `..`, or containing `/`, `\`, or NUL; the resolved path must start with the article directory after normalization |
| Asset names | always crawler-generated (`img-<nnn>-<8hex>.<ext>`), never taken from HTML; endpoint `{file}` must match `^img-[0-9]{3}-[0-9a-f]{8}\.[a-z0-9]{2,5}$` |
| Write roots | writes only under `CRAWLER_ARCHIVE_ROOT` (`/app/data/uploads/crawl`); staging under `data/tmp/<article-id>/` |
| Symlinks | not followed or created during archive writes |
| Exposure | `/internal/v1/**` reachable only on the compose network and the loopback host port (baseline 04, section 2; NFR-24); no auth for 1 local user (NFR-25) |

## 3. Asset download politeness

| Aspect | Rule |
|---|---|
| Rate | assets share the fetch HostGate: 1 concurrent request per host, >=2000 ms delay (Medium-family hosts >=3000 ms) |
| Robots | robots.txt checked for every image URL before download (BR-01) |
| Timeouts | connect 10 s, read 30 s; responses above 25 MB are aborted mid-stream |
| Retries | 5xx/429 -> 1 retry after 30 s, then skip; 4xx terminal, 0 retries |
| Accounting | every image download counts against the per-host rate limit and is written to `fetch_log` (BR-17) |
| Scope | only images referenced by the extracted article; no CSS, JS, fonts or video |

## 4. Caps

| Item | Cap | Over-cap outcome |
|---|---|---|
| HTML document | 10 MB | `FETCH-TOO-LARGE` (spec 02, terminal) |
| `content.md` | 2 MB (2,097,152 bytes) | truncate at last complete block; log WARN + `crawler_content_truncated_total` (file 01, DEVIATION FLAGGED) |
| Single image | 25 MB (26,214,400 bytes) | skipped, `EXTRACT-ASSET-SKIPPED` |
| Assets per article | 100 files / 50 MB (52,428,800 bytes) | extra assets skipped, `EXTRACT-ASSET-LIMIT` |
| Extraction wall clock | 30 s per article (same value as `statement_timeout`, baseline 03, section 6) | abort -> `EXTRACT-PARSE-FAILED`, `needs_review` |
| Free disk | <5 GB | `STORE-DISK-FULL`, job paused, readiness detail `disk` |

## 5. Logging (JSON lines, logstash-logback-encoder 8.0)

| Field | Type | Emitted |
|---|---|---|
| articleId | string | every extraction, asset and archive line |
| sourceKey | string | every line |
| slug | string | after slug assignment |
| event | string | `extract.start`, `extract.done`, `asset.skip`, `archive.done` |
| words | integer | archive lines |
| assets | integer | archive lines (stored files) |
| bytes | integer | `content.md` bytes; asset bytes on `asset.skip` lines |
| durationMs | integer | pipeline duration per article |
| code | string | stable code (`EXTRACT-ASSET-LIMIT`, `EXTRACT-ASSET-SKIPPED`, ...) on WARN/ERROR lines |
| attempt | integer | retry lines |

Levels: INFO on `archive.done`; WARN with `code` for skips, caps and `needs_review`; ERROR for
`STORE-DISK-FULL` and `STORE-RENAME-FAILED` (BA 05).

## 6. Metrics

| Metric | Type | Labels | Meaning |
|---|---|---|---|
| crawler_extract_total | counter | `outcome` = archived, skipped, needs_review, failed | 1 increment per finished article |
| crawler_extract_duration_seconds | histogram | `outcome` | 0.1 s, 0.5 s, 1 s, 5 s, 15 s, 60 s buckets |
| crawler_assets_total | counter | `result` = downloaded, duplicate, skipped, limit | asset decisions per image |
| crawler_content_bytes | histogram | none | 16 KB, 64 KB, 256 KB, 1 MB, 2 MB buckets |
| crawler_asset_bytes_total | counter | none | downloaded asset bytes |
| crawler_content_truncated_total | counter | none | 2 MB cap hits (file 01, DEVIATION FLAGGED) |
| crawler_hotlink_violation_total | counter | none | rejected leftover remote image references |

A source that silently stops producing is a bug (BR-17): `crawler_extract_total{outcome="archived"}`
flat for 72 h triggers the staleness warning (BA 03, section 6).

## 7. No-hotlink verification (BR-10, AC-14)

After the image rewrite, the final Markdown is scanned for any image reference that is not
`assets/<file>`: `](http`, `](//`, `<img src="http`, `<img src="//`, and any `assets/` path that
escapes the article directory. 1 or more matches -> the article is rejected with
`EXTRACT-PARSE-FAILED`, 0 files written, status `needs_review`, and
`crawler_hotlink_violation_total` +1. The golden-file tests (DO-03-02) run the same scan over every
fixture.
