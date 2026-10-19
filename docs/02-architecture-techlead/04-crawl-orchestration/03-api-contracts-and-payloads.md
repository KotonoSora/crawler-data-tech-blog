# 03 — API Contracts and Payloads (Crawl Orchestration)

Base path `/internal/v1` on crawler-service: reachable on the compose network and on the host
loopback `127.0.0.1:8082` (baseline 04 §2). Consumer: api-service only. Content type JSON; Jackson 3
Kotlin module registered on both services (AGENTS.md). Errors are RFC 9457 ProblemDetail with
`type=urn:tech-blog:error:<CODE>` (BA 05). Ids are TEXT UUIDv7.

DEVIATION CARRIED (2026-10-19): manual-only operation; no scheduled crawls (first use:
04-crawl-orchestration file 01). Every job on this surface is operator-requested.

## 1. Endpoints

| Method | Path | Request body | Success | Errors |
|---|---|---|---|---|
| POST | `/internal/v1/jobs` | JobCreate | 202 JobView | 400 CFG-INVALID-REQUEST, 404 CFG-SOURCE-NOT-FOUND, 409 JOB-DUPLICATE-ACTIVE |
| GET | `/internal/v1/jobs/{id}` | — | 200 JobView | 404 JOB-NOT-FOUND |
| POST | `/internal/v1/jobs/{id}/cancel` | — | 200 JobView | 404 JOB-NOT-FOUND, 409 JOB-CANCEL-REFUSED, 409 JOB-INVALID-STATE |
| GET | `/internal/v1/articles/{id}` | — | 200 ArticleView | 404 ART-NOT-FOUND |
| POST | `/internal/v1/articles/{id}/retry` | optional `{"force":false}` | 202 ArticleView (re-queued) / 200 ArticleView (no-op) | 404 ART-NOT-FOUND, 409 JOB-INVALID-STATE, 409 FETCH-BACKOFF-EXHAUSTED, 409 FETCH-TOO-LARGE, 409 FETCH-BLOCKED |

Validation (Bean Validation on requests): `sourceKey` `^[a-z0-9][a-z0-9-]{1,49}$`; `jobType` in
`backfill`/`incremental`; `{id}` match `^[0-9a-f-]{36}$`. Unknown fields are rejected.

`JobCreate`: `{"sourceKey":"cloudflare","jobType":"incremental"}`

`JobView`:
`{"jobId":"0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40","sourceKey":"cloudflare","jobType":"incremental","status":"pending","requestedAt":"2026-10-19T03:00:07Z","startedAt":null,"finishedAt":null,"counters":{"discovered":0,"archived":0,"skipped":0,"failed":0},"cursor":"page=0","lastError":null}`

`ArticleView`:
`{"articleId":"0192f0c1-9a02-7a11-b3c4-51e0a9d77c12","sourceKey":"cloudflare","canonicalUrl":"https://blog.cloudflare.com/how-we-built-x","host":"blog.cloudflare.com","status":"failed","attemptCount":5,"failureCode":"FETCH-TIMEOUT","failureReason":"read 30 s exceeded","nextAttemptAt":null,"lastAttemptAt":"2026-10-19T04:11:02Z","slug":"how-we-built-x","contentSha256":null,"wordCount":null,"archivedAt":null}`

| Endpoint rule | Value |
|---|---|
| 202 `POST /jobs` | row committed before the response is written; job starts within 2 s (AC-09) |
| 409 `POST /jobs` | exactly 1 active job per source (BR-18); response carries `activeJobId` |
| 200 vs 202 on retry | 202 = 1 new queue entry published (`failed`/`needs_review`, window reset); 200 = no-op for `queued`/`processing`/`archived`; 409 codes for non-retryable classes — full matrix in spec 02, file 03 §3 (exactly-once re-queue, AC-05) |
| Cancel | accepted in `pending`/`paused` always; in `running` refused only inside the finishing window (file 01 §2); terminal job -> JOB-INVALID-STATE |
| List endpoints | only `GET /internal/v1/sources` (registry snapshot, spec 01); all other reads are single-resource; history is api-service's job |

## 2. Queue message (Redis list element, `tb:q:{host}`)

`{"articleId":"0192f0c1-9a02-7a11-b3c4-51e0a9d77c12","sourceKey":"cloudflare","host":"blog.cloudflare.com","url":"https://blog.cloudflare.com/how-we-built-x","jobId":"0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40","attempt":1,"enqueuedAt":"2026-10-19T03:00:12.431Z"}`

| Field | Rule |
|---|---|
| `articleId` | also the `tb:retry` zset member (1 member per article, ever) |
| `host` | canonical host without scheme; selects the queue and the host lock |
| `url` | canonical URL, tracking params and fragments stripped (BR-06) |
| `attempt` | 1-based; equals `article.attempt_count` after the claim increment |
| `enqueuedAt` | ISO-8601 UTC, millisecond precision |
| Unknown fields | ignored by the consumer; the message is a hint, the DB row is the truth |

## 3. Events (`tb:events`, producer = crawler-service)

Envelope: `{eventId, type, occurredAt, version:1, payload}`; `eventId` = UUIDv7;

`article.archived`:
`{"eventId":"0192f100-1c33-7b02-8d10-9a4f2b6c7d01","type":"article.archived","occurredAt":"2026-10-19T03:04:11Z","version":1,"payload":{"articleId":"0192f0c1-9a02-7a11-b3c4-51e0a9d77c12","sourceKey":"cloudflare","slug":"how-we-built-x","contentSha256":"9f2c1d...64-hex","wordCount":1840,"archivedAt":"2026-10-19T03:04:11Z","title":"How we built X"}}`

`article.failed`:
`{"eventId":"0192f101-2d44-7c13-9e21-ab5f3c7d8e12","type":"article.failed","occurredAt":"2026-10-19T04:11:02Z","version":1,"payload":{"articleId":"0192f0c1-9a02-7a11-b3c4-51e0a9d77c12","sourceKey":"cloudflare","code":"FETCH-TIMEOUT","reason":"read 30 s exceeded","attemptCount":5}}`

`job.updated`:
`{"eventId":"0192f102-3e55-7d24-af32-bc6a4d8e9f23","type":"job.updated","occurredAt":"2026-10-19T03:04:12Z","version":1,"payload":{"jobId":"0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40","sourceKey":"cloudflare","jobType":"backfill","status":"running","counters":{"discovered":812,"archived":640,"skipped":57,"failed":3}}}`

`source.stats`:
`{"eventId":"0192f103-4f66-7e35-b043-cd7b5e9f0a34","type":"source.stats","occurredAt":"2026-10-19T03:41:00Z","version":1,"payload":{"sourceKey":"cloudflare","archivedCount":640,"failedCount":3,"lastSuccessAt":"2026-10-19T03:40:58Z","health":"fresh"}}`

| Rule | Value |
|---|---|
| Emission | `article.*` once per article terminal transition; `job.updated` on every status change, plus at most 1 per 5 s while running (counter throttle), plus always on terminal change; `source.stats` on job terminal status; staleness is computed on read by spec 05 (AC-12) — no background check |
| `health` | `fresh` (<=72 h since last success), `stale` (>72 h), `broken` (5 consecutive discovery failures) |
| Delivery | at-least-once; `XADD tb:events MAXLEN ~ 10000`; consumers key idempotent upserts on `eventId` |
| Ordering | per-stream order preserved; consumers compare `occurredAt` and never regress a projection to an older `status` |
| Compatibility | `version` stays 1 while fields are only added; unknown `type` is logged at DEBUG and skipped |

## 4. ProblemDetail examples

`POST /internal/v1/jobs` while an active job exists -> 409:

`{"type":"urn:tech-blog:error:JOB-DUPLICATE-ACTIVE","title":"Job already active","status":409,"detail":"source cloudflare already has job 0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40 in status running","instance":"/internal/v1/jobs","code":"JOB-DUPLICATE-ACTIVE","activeJobId":"0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40","occurredAt":"2026-10-19T03:05:40Z"}`

`POST /internal/v1/jobs/{id}/cancel` inside the finishing window -> 409:

`{"type":"urn:tech-blog:error:JOB-CANCEL-REFUSED","title":"Cancel refused","status":409,"detail":"job 0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40 is committing its last article","instance":"/internal/v1/jobs/0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40/cancel","code":"JOB-CANCEL-REFUSED","occurredAt":"2026-10-19T03:39:12Z"}`

Every ProblemDetail carries `type`, `title`, `status`, `detail`, `instance`, plus the extension
`code` (stable string) and `occurredAt`. Codes used here are exactly the BA 05 set: JOB-DUPLICATE-ACTIVE,
JOB-NOT-FOUND, JOB-INVALID-STATE, JOB-CANCEL-REFUSED, CFG-SOURCE-NOT-FOUND, CFG-INVALID-REQUEST,
ART-NOT-FOUND. OpenAPI is generated by springdoc (catalog pin) and committed per service.
