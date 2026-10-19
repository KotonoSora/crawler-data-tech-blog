# 05 — Exception Handling and Errors

## 1. Principles

| # | Principle |
|---|---|
| 1 | Every failure carries a stable code string (`<AREA>-<NAME>`) — same code in logs, API errors, and UI |
| 2 | API errors use RFC 9457 ProblemDetail: `type=urn:tech-blog:error:<CODE>`, title, status, detail, instance |
| 3 | The UI shows the code + a plain-language message + the next action (retry / wait / fix config) |
| 4 | Terminal failures are never retried automatically; transient failures use bounded backoff (BR-04) |
| 5 | A fetch failure never corrupts the archive: no partial final files, DB state stays consistent |

## 2. Crawl-pipeline errors

| Code | Trigger | Retry | Owner action |
|---|---|---|---|
| DISC-ROBOTS-DENIED | robots.txt disallows the URL | never | none (expected) |
| DISC-FEED-PARSE-FAILED | feed XML invalid after 2 attempts | 5xx-style backoff | check source; fall back to sitemap/listing |
| DISC-LISTING-SELECTOR-BROKEN | pagination returns 0 new links twice | next run only | update per-source selector config |
| DISC-SITEMAP-MISSING | sitemap 404 but listing exists | never | switch discovery path in config |
| FETCH-HTTP-TERMINAL | 4xx except 408/429 | never | article -> `failed`; inspect |
| FETCH-RATE-LIMITED | 429 (Retry-After honored <=24 h) | backoff | none unless persistent >48 h |
| FETCH-BACKOFF-EXHAUSTED | 5th attempt failed (5xx/429) | stop | article -> `failed`; retry manually (US-13) |
| FETCH-TIMEOUT | connect 10 s / read 30 s exceeded | backoff | none |
| FETCH-TOO-LARGE | response > cap (HTML 10 MB) | never | inspect; article -> `failed` |
| FETCH-BLOCKED | 403 on non-Medium host | never | likely bot block; article -> `needs_review` |
| FETCH-MEDIUM-TRANSIENT | 000/403 from Medium-family host | backoff | none (BR-15) |
| EXTRACT-PARSE-FAILED | no main content found | 2 attempts, then stop | article -> `needs_review`; add selector override |
| EXTRACT-EMPTY-CONTENT | Markdown < 200 chars | stop | `needs_review`, no file written |
| EXTRACT-ASSET-LIMIT | assets exceed 100 files / 50 MB | skip extra assets | warning in `meta.json` |
| STORE-DISK-FULL | free space <5 GB or write failed | stop job | free space; job resumes on retry |
| STORE-RENAME-FAILED | atomic rename failed (permissions/IO) | 1 retry | fix disk/permissions |
| STORE-INVALID-SLUG | slug fails `^[a-z0-9][a-z0-9-]{0,79}$` | never | bug; article -> `needs_review` |

## 3. API and UI-facing errors

| Code | HTTP | UI behavior |
|---|---|---|
| CFG-SOURCE-NOT-FOUND | 404 | "Unknown source" + link back to sources |
| CFG-INVALID-REQUEST | 400 | Highlight the invalid field |
| JOB-DUPLICATE-ACTIVE | 409 | "A job for this source is already running" + link to job |
| JOB-NOT-FOUND | 404 | Refresh jobs list |
| JOB-INVALID-STATE | 409 | Disable action button; show current state |
| JOB-CANCEL-REFUSED | 409 | "Too late to cancel — job finishing" |
| ART-NOT-FOUND | 404 | Article may not be archived yet (status shown in list) |
| OPS-DEPENDENCY-DOWN | 503 | Banner: which dependency (DB/Redis/crawler-service) is down |
| OPS-PROJECTION-LAG | 200 (header `X-Projection-Lag: <s>`) | Banner if lag > 30 s |

## 4. Escalation to the owner

| Signal | Where | Threshold |
|---|---|---|
| Staleness warning | Dashboard badge + metric + log `WARN` | no success for 72 h (J6) |
| Job failure | Job detail | any `failed_count` increase |
| Disk guard | Log + readiness detail | free space <5 GB |
| Reconciliation mismatch | Log `ERROR` | projection offset > 30 s behind for >10 min |
