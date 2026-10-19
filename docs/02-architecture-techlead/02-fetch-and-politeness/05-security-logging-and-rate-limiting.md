# 05 — Security, Logging and Rate Limiting

Scope: fetch-stage safety rules (politeness, network, source-health breaker) plus the logging,
metrics, and audit evidence required by BR-17 / NFR-26 / NFR-30. All values below are the single
source of truth for file 01 (pipeline) and file 04 (tasks).

## 1. Numbers (single source of truth)

| Concern | Value | Enforcement |
|---|---|---|
| Per-host concurrency | 1 request | HostGate permit + `tb:lock:host:{host}` |
| Global concurrent hosts | 4 (`CRAWLER_GLOBAL_HOSTS`) | global semaphore |
| Min delay per host | 2000 ms; Medium-family 3000 ms | min-delay gate (file 01 §4) |
| Connect / read timeout | 10 s / 30 s | `HttpClient` timeouts |
| Total budget per attempt | 60 s | FetchTask abort, outcome `timeout` |
| Redirects | <=3, same host | redirect policy; cross-host = terminal |
| HTML cap | 10 MB | streamed abort, outcome `too_large` |
| robots.txt cap | 512 KB | streamed abort |
| robots cache TTL | 24 h success; 300 s failed load | `tb:robots:{host}` |
| Attempts per window | 1..5 | RetryPolicy |
| Backoff waits | 30 s, 2 m, 10 m, 1 h, 6 h | `tb:retry` zset (score = ready epoch ms) |
| `Retry-After` honored | <=24 h | RetryPolicy override of the standard wait |
| Breaker threshold | 20 consecutive failing attempts | per-host counter (in-process, reset on success) |
| Host pause | 30 min = 1800 s | `tb:pause:{host}` TTL |
| Queue message size | <=4 KB | enqueue validation (file 03 §4) |
| fetch_log retention | 90 days | purge pass at boot + job end, batches of 10,000 (file 02 §5) |

Key addition: `tb:pause:{host}` extends the frozen Redis key inventory; no existing key changes.

## 2. Within-host circuit breaker

| Item | Rule |
|---|---|
| Counted outcomes | `http_error` (5xx), `timeout`, `network_error`; 429 excluded (`Retry-After` handles it) |
| Trip condition | 20 consecutive counted outcomes for one host, no `ok` / `not_modified` in between |
| Action | set `tb:pause:{host}` TTL 1800 s; WARN log with host, `pausedUntil`, `consecutiveFailures` = 20, last failure code; `crawler_host_paused_total{host}` +1 |
| While paused | re-schedule to `tb:retry`, score = pause expiry epoch ms; no request, no row, no `attempt` consumed |
| Resume | after TTL expiry; counter restarts at 0; a second trip re-pauses |
| Reset | `ok` or `not_modified` sets the counter to 0 |

## 3. HTTP status semantics (terminal vs retry)

| Status | Outcome | Article state | Failure code | Retry |
|---|---|---|---|---|
| 200/2xx | `ok` | handoff to extraction | — | — |
| 304 | `not_modified` | `skipped` (archived copy) | — | 1 guard re-GET if unarchived |
| 404 | `http_error` | `failed` | `FETCH-HTTP-TERMINAL` | never |
| 410 | `http_error` | `skipped` | `FETCH-HTTP-TERMINAL` (reason: gone) | never |
| 403 non-Medium | `blocked` | `needs_review` | `FETCH-BLOCKED` | never |
| 403 Medium-family | `http_error` | `queued` | `FETCH-MEDIUM-TRANSIENT` | backoff, 1..5 (BR-15) |
| 000 (no HTTP response) Medium-family | `network_error` | `queued` | `FETCH-MEDIUM-TRANSIENT` | backoff, 1..5 (BR-15) |
| 408, 429 | `http_error` | `queued` | `FETCH-TIMEOUT` / `FETCH-RATE-LIMITED` | backoff, 1..5; `Retry-After` <=24 h |
| other 4xx | `http_error` | `failed` | `FETCH-HTTP-TERMINAL` | never |
| 5xx | `http_error` | `queued` until the 5th attempt | `FETCH-BACKOFF-EXHAUSTED` at exhaustion | backoff, 1..5 |

Terminal = no automatic retry; triage via US-05 / US-13 (file 03 §3). A retryable class failing its
5th attempt sets `FETCH-BACKOFF-EXHAUSTED`, article `failed` (BA 05).

## 4. Network and request safety

| Rule | Detail |
|---|---|
| Scheme | `https` only; an `http://` candidate is dropped at normalization, logged WARN, never enqueued (no `fetch_log` row) |
| Port | 443 only; an explicit other port is dropped the same way |
| Targets | seeded source hosts plus image hosts referenced by archived pages (still 1 request per host + 2000 ms gap) |
| Addresses | host resolved before the request; IP literals and private/loopback/link-local ranges (10/8, 172.16/12, 192.168/16, 127/8, 169.254/16) are rejected |
| TLS | JDK default trust store; no insecure trust manager; handshake failure -> outcome `network_error`, WARN |
| User-Agent | `techblog-archive-crawler/0.1 (+contact from CRAWLER_CONTACT)`; a blank `CRAWLER_CONTACT` -> readiness DOWN at boot (NFR-23) |
| Internal API | `/internal/v1` loopback only (127.0.0.1:8082); nginx never proxies it; no auth (NFR-25) |
| Log hygiene | no credentials, cookies, or query tokens in logs; tracking params stripped before storage (BR-06) |

## 5. Logging

One JSON line per attempt (logstash-logback-encoder, logger `crawler.fetch`): `host`, `url`,
`status`, `bytes`, `durationMs`, `attempt`, `outcome`, `jobId`, `articleId`, plus `code` when the
outcome is not `ok` / `not_modified`.

| Outcome group | Level |
|---|---|
| `ok`, `not_modified`, `robots_denied` | INFO |
| `http_error`, `timeout`, `network_error`, `parse_error`, `too_large`, `blocked` | WARN |
| retry exhaustion, breaker trip, readiness-down | WARN with a frozen code (no code-free WARN/ERROR) |

## 6. Metrics

| Metric | Type | Labels | Semantics |
|---|---|---|---|
| `crawler_fetch_total` | counter | `outcome` (9 values) | +1 per attempt, including `robots_denied` |
| `crawler_fetch_duration_seconds` | histogram | none; buckets 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10, 30, 60 | observed per attempt |
| `crawler_fetch_bytes_total` | counter | `outcome` | response body bytes after decompression |
| `crawler_host_paused_total` | counter | `host` | +1 per breaker trip |
| `crawler_fetch_log_purged_total` | counter | none | rows deleted per retention run |

Label rule: `host` allowed (<=20 sources plus image hosts); URLs never become labels. Scrape
endpoint stays loopback/compose-internal (NFR-24).

## 7. Audit (BR-17)

| Evidence | Requirement |
|---|---|
| `fetch_log` row | exactly 1 per attempt; `robots_denied` included; pause and normalization drops excluded (no attempt) |
| Metrics | `crawler_fetch_total{outcome}` increments in the same attempt lifecycle as its row |
| Log line | exactly 1 per attempt, section 5 fields |
| Test assertion | integration test fails when attempt counters diverge from `fetch_log` row counts |
| Silence detection | enabled source with no successful archive for 72 h -> health `stale`, `crawler_source_stale` increments, WARN (AC-12, BA 03 §6) |
