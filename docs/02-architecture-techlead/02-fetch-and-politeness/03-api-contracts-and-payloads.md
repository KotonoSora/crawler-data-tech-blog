# 03 — API Contracts and Payloads

Scope: the crawler-service internal API and the fetch queue message. Base path `/internal/v1`,
reachable only on loopback `127.0.0.1:8082` and compose-internal DNS; nginx never proxies
`/internal/**` (NFR-24). Consumers: api-service command proxy (spec 06); every call is
operator-initiated.

## 1. Conventions

| Item | Rule |
|---|---|
| Media type | `application/json; charset=utf-8` |
| IDs | UUIDv7 text; `fetch_log.id` (BIGINT) serialized as a JSON string (may exceed 2^53) |
| Timestamps | ISO 8601 UTC with milliseconds, e.g. `2026-10-19T09:00:00.000Z` |
| Errors | RFC 9457 ProblemDetail; `type = urn:tech-blog:error:<CODE>` plus extension `code` |
| Bodies | Jackson 3 Kotlin module registered (data-class defaults fill); Bean Validation applies |
| Auth | none (NFR-25); the binding is the control |

## 2. GET /internal/v1/articles/{articleId}/attempts

| Aspect | Detail |
|---|---|
| Query params | `limit` (default 50, min 1, max 200); `outcome` (optional, one of the 9 values in §5) |
| Order | `occurred_at` descending |
| 200 | `{ "articleId": "0192f0c1-...", "count": 2, "attempts": [ ... ] }` |
| 404 | `ART-NOT-FOUND` when the article id is unknown |
| Element | `id`, `jobId` (nullable), `host`, `url`, `method`, `statusCode` (nullable), `outcome`, `durationMs`, `bytes`, `attempt`, `occurredAt` |

## 3. POST /internal/v1/articles/{articleId}/retry

| Aspect | Detail |
|---|---|
| Body | optional `{ "force": false }`; `force` boolean, default false |
| Accepted (202) | `status` in (`failed`, `needs_review`) and the failure class is retryable (§5) |
| No-op (200) | `status` in (`queued`, `processing`, `archived`) — returns current view, no enqueue (BR-18, AC-05) |
| Effect | window reset: `attempt_count` -> 0, `attempt` = 1, `status` -> `queued`; `fetch_log` history preserved |
| 202 body | `{ "articleId": "...", "status": "queued", "attemptCount": 0, "nextAttemptAt": "...", "enqueuedAt": "..." }` |
| 404 | `ART-NOT-FOUND` |
| 409 | `JOB-INVALID-STATE`: any other status (`discovered`, `skipped`) — nothing to retry |
| 409 | `FETCH-BACKOFF-EXHAUSTED`: `attempt_count` = 5 and `force` != true; repeat with `force=true` |
| 409 | `FETCH-TOO-LARGE` or `FETCH-BLOCKED`: never-retry classes (§5); `force=true` does not override |
| 400 | `CFG-INVALID-REQUEST`: malformed body, unknown field, bad enum value |

Lease-reclaim re-queues never reset `attempt_count` (BA 03 §4); only this endpoint does. The US-13
UI action sends `force=true`; one enqueue per call (AC-05).

## 4. Fetch queue message (Redis)

| Item | Contract |
|---|---|
| Produce | `RPUSH tb:q:{host} <json>` |
| Consume | `BLMOVE tb:q:{host} tb:q:{host}:processing LEFT RIGHT 5` (blocking claim, same form as spec 04) |
| Acknowledge | `LREM tb:q:{host}:processing 1 <json>` after the fetch_log commit (file 01 §4 step 7) |
| Retry schedule | `tb:retry` zset: member = `articleId`, score = ready epoch ms; due members move back to `tb:q:{host}` |
| Host lock | `tb:lock:host:{host}` (SET NX) serializes HostGate across crawler roles |
| Validation | `host` must equal the host part of `url`; `sourceKey` must exist in the seeded catalog; a malformed message is dropped with log code `CFG-INVALID-REQUEST` |
| Dedup | the same canonical URL is never enqueued twice (BR-06) |
| Max size | 4 KB per message |

Envelope (exactly these 7 fields, v1 — authoritative in spec 04, file 03 §2):

```json
{"articleId":"0192f0c1-0000-7000-8000-000000000001","sourceKey":"cloudflare","host":"blog.cloudflare.com","url":"https://blog.cloudflare.com/example/","jobId":"0192f0c1-4b21-7f30-9c6e-8f7a1d2e3b40","attempt":1,"enqueuedAt":"2026-10-19T09:00:00.000Z"}
```

## 5. Fetch outcome enum (frozen)

| outcome | Typical status | Article effect | Failure code | Retry |
|---|---|---|---|---|
| `ok` | 2xx | handoff to extraction (spec 03) | — | — |
| `not_modified` | 304 | archived copy: no-op `skipped` (AC-02); no archived copy: 1 unconditional re-GET, same >=2000 ms gap | — | 1 guard re-GET |
| `robots_denied` | no request | skipped | `DISC-ROBOTS-DENIED` | never |
| `http_error` | 4xx except 429; 5xx; Medium-family 403 | per-status map (file 05 §3) | `FETCH-HTTP-TERMINAL`, `FETCH-RATE-LIMITED`, `FETCH-MEDIUM-TRANSIENT` | never / backoff |
| `timeout` | — | `failed` after 5 attempts | `FETCH-TIMEOUT` | backoff, 1..5 |
| `network_error` | — | `failed` after 5 attempts | none, or `FETCH-MEDIUM-TRANSIENT` for Medium-family 000 | backoff, 1..5 |
| `parse_error` | 200 | `needs_review` | `EXTRACT-PARSE-FAILED` (spec 03 owns it) | 2 attempts, then stop |
| `too_large` | 2xx with body >10 MB | `failed` | `FETCH-TOO-LARGE` | never |
| `blocked` | 403 non-Medium | `needs_review` | `FETCH-BLOCKED` | never |

Retryable (§3): `timeout`, `network_error`, 5xx/429 paths, `parse_error`, Medium-family 000/403.
Never-retry: `too_large`, `blocked`, terminal 4xx. A retryable class failing its 5th attempt
records final code `FETCH-BACKOFF-EXHAUSTED` (BA 05).

## 6. ProblemDetail examples

All three use HTTP 409 (request conflicts with the article's failure class or attempt state).
Common members: `type`, `title`, `status`, `detail`, `instance`, plus extensions `code`,
`articleId`.

```json
{"type":"urn:tech-blog:error:FETCH-BACKOFF-EXHAUSTED","title":"Retry window exhausted","status":409,"detail":"Article has 5 recorded attempts; repeat with force=true to start a new 5-attempt window.","instance":"/internal/v1/articles/0192f0c1-0000-7000-8000-000000000001/retry","code":"FETCH-BACKOFF-EXHAUSTED","articleId":"0192f0c1-0000-7000-8000-000000000001"}
```

```json
{"type":"urn:tech-blog:error:FETCH-TOO-LARGE","title":"Response exceeds the fetch cap","status":409,"detail":"Last response exceeded the 10 MB HTML cap; this URL has no retry path. Inspect the article manually.","instance":"/internal/v1/articles/0192f0c1-0000-7000-8000-000000000002/retry","code":"FETCH-TOO-LARGE","articleId":"0192f0c1-0000-7000-8000-000000000002"}
```

```json
{"type":"urn:tech-blog:error:FETCH-BLOCKED","title":"Fetch blocked by the source","status":409,"detail":"HTTP 403 from a non-Medium host; treated as a bot block. Article is needs_review; no retry.","instance":"/internal/v1/articles/0192f0c1-0000-7000-8000-000000000003/retry","code":"FETCH-BLOCKED","articleId":"0192f0c1-0000-7000-8000-000000000003"}
```
