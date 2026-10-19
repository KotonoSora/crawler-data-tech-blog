# 01 — Architecture and Tech Stack

## 1. Verdict

Content extraction is a module of crawler-service (baseline 01, section 5), package `extract`. It
turns transient HTML (never persisted, BR-08) into the three archived artifacts. No new deployable,
no new dependency version: jsoup 1.21.2, readability4j 1.0.7, copy-down 1.0.1 (baseline 02).

| Property | Value |
|---|---|
| Input | 1 fetched HTML document, <=10 MB (file 05, section 4) |
| Output | `content.md` <=2 MB, `assets/` <=100 files and <=50 MB, `meta.json` (file 03, section 1) |
| Concurrency | 1 extraction per article; up to 4 articles in parallel (`CRAWLER_GLOBAL_HOSTS`) |
| Budget | <=30 s wall clock per article (file 05, section 4) |
| Idempotence | identical HTML + identical config => identical `content_sha256` |
| Failure shape | terminal -> status `needs_review` or `failed`, 0 files written |

## 2. Pipeline stages

| # | Stage | Component | Output |
|---|---|---|---|
| 1 | Parse | jsoup 1.21.2, `Jsoup.parse(html, baseUri)` | DOM `Document` (jsoup repairs malformed HTML) |
| 2 | Main content | readability4j 1.0.7 | candidate element if it yields >=200 characters of Markdown |
| 3 | Source override | `source.discovery_config.extraction.selectors[]` (CSS list) | first matching element with >=200 characters |
| 4 | Whole-article fallback | fixed selectors `article, main, [role=main]` | element with >=200 characters |
| 5 | Convert | copy-down 1.0.1 | Markdown |
| 6 | Sanitize | file 05, section 1 | Markdown, 0 raw HTML blocks |
| 7 | Images | image pipeline (section 4) | `assets/` files + relative references |
| 8 | Attribution | footer writer (section 5) | Markdown with attribution block (BR-12) |
| 9 | Gate + hash | quality gates (section 5) | `content_sha256` over final bytes |
| 10 | Stage + publish | atomic write (baseline 05, section 2) | files in `data/tmp/<article-id>/`, then `ATOMIC_MOVE` |

Stages 2..4 run in order; the first candidate with >=200 characters of Markdown wins. All three fail
-> `EXTRACT-PARSE-FAILED`, at most 2 attempts, then status `needs_review` (BA 05).

## 3. Markdown post-processing (after copy-down)

| # | Processor | Rule |
|---|---|---|
| 1 | Headings | H1 comes from metadata only; body headings shifted so the top level is H2; depth clamped to H6 |
| 2 | Code | `<pre><code>` -> fenced block; language from `class="language-<x>"`, otherwise no info string |
| 3 | Tables | kept as GFM pipe tables; cells flattened to inline text |
| 4 | Links | empty-target links removed; absolute http/https kept; tracking params stripped (BR-06) |
| 5 | Whitespace | trailing spaces removed; >=3 blank lines collapsed to 1; exactly 1 trailing LF |
| 6 | Images | reference rewritten to `assets/<file>` (section 4) |

## 4. Image pipeline

| Step | Rule |
|---|---|
| Collect | every `img[src]` and `img[srcset]`; from `srcset` take the largest width descriptor (2x on a tie) |
| Skip | SVG sources, `data:` URIs, pixels with width <=1 px or height <=1 px, CSS background images |
| Dedupe | sha256 over bytes; identical sha256 stored once per article |
| Download | same HostGate as page fetch: 1 concurrent request per host, >=2000 ms delay (Medium-family >=3000 ms) |
| Caps | <=25 MB per image; <=100 files and <=50 MB per article (file 05, section 4) |
| Name | `img-<nnn>-<8hex>.<ext>`; `nnn` 001..100 in first-reference order, `8hex` = sha256 prefix |
| Rewrite | all references become `assets/<file>`; 0 remote image URLs left (BR-10, AC-14) |
| Failure | image skipped -> `EXTRACT-ASSET-SKIPPED`, reference removed, article still archived |

## 5. Attribution and quality gates

Footer appended after the body (BR-12): `---`, then original URL, source name, fetched date (UTC).

| Gate | Threshold | Outcome |
|---|---|---|
| Body length | <200 characters | `EXTRACT-EMPTY-CONTENT`, status `needs_review`, 0 files |
| Size | >2 MB | truncate at last complete block |
| Remote images | >=1 remote image reference | reject: `EXTRACT-PARSE-FAILED`, 0 files |
| Raw HTML | >=1 HTML block | reject: `EXTRACT-PARSE-FAILED`, 0 files |
| Slug | fails `^[a-z0-9][a-z0-9-]{0,79}$` | `STORE-INVALID-SLUG`, status `needs_review` |
| Word count | computed over final Markdown | written to `meta.json` and the `article` row |

DEVIATION FLAGGED (first use): BA 04, section 4 places a truncation warning inside `meta.json`.
`meta.json` is frozen to the 11 fields of BA 04, section 3, so the warning is emitted as a structured
log line plus metric `crawler_content_truncated_total` (same shape as `EXTRACT-ASSET-LIMIT`).
Budget: +1 metric, 0 new fields, 0 new error codes. Rationale: `meta.json` consumers stay stable.

`content_sha256` = SHA-256 over the final `content.md` bytes, computed after the last rewrite and
gate, before the staging move (baseline 05, section 2 step 2); it is stored on the `article` row and,
on change, appended to `article_revision` (file 02).

## 6. Renderer boundary

web renders archived Markdown with react-markdown + rehype-sanitize (spec 07). Sanitization therefore
happens twice by design: extraction-time (file 05, section 1) and render-time (spec 07).
