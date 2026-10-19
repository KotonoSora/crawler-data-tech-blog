# 01 — Architecture and Tech Stack

Scope: the fetch stage inside **crawler-service** — from a queued fetch task to a transient response
plus a classified outcome. Candidates arrive from spec 01 (discovery); successful bodies leave to
spec 03 (extraction). Raw HTML is never persisted (BR-08). Landing increment: E1 (pilot crawl),
completed in E2.

## 1. Fetch pipeline components

| Component | Responsibility | Parameters (numbers) | Package |
|---|---|---|---|
| HostGate | admission control, global + per host | global 4 concurrent hosts (`CRAWLER_GLOBAL_HOSTS`); 1 permit per host; gap >=2000 ms (Medium-family >=3000 ms); honors `tb:pause:{host}` (file 05) | `domain/fetch` |
| RobotsService | robots.txt load + evaluation | crawler-commons parser; cache `tb:robots:{host}`; 512 KB cap; TTL 24 h on success, 300 s on failed load; RFC 9309 | `domain/fetch` |
| ConditionalGetStore | validator storage, 304 handling | `http_cache`; sends `If-None-Match` / `If-Modified-Since` | `data` |
| RetryPolicy | retry decision + scheduling | attempts 1..5; waits 30 s, 2 m, 10 m, 1 h, 6 h; `Retry-After` honored <=24 h; `tb:retry` zset (score = ready epoch ms) | `domain/fetch` |
| MediumTransientClassifier | BR-15 rule | 000/403 from a Medium-family host -> `FETCH-MEDIUM-TRANSIENT`, retryable | `domain/fetch` |
| FetchClient | HTTP transport | JDK `HttpClient`, HTTP/1.1; connect 10 s; read 30 s; total 60 s; redirects <=3, same host | `config/domain` |
| OutcomeMapper | status/exception -> outcome + code | 9 frozen outcomes (file 03 §5) | `domain/fetch` |
| FetchLogWriter | BR-17 audit + state update | 1 `fetch_log` row per attempt; article fetch-state in 1 transaction | `data` |
| FetchTask | orchestration | fixed order, section 4 | `domain/fetch` |

## 2. robots.txt semantics (RFC 9309)

| robots.txt result | Decision | Effect |
|---|---|---|
| 2xx, URL allowed | proceed | fetch executes |
| 2xx, URL disallowed | skip | outcome `robots_denied`, code `DISC-ROBOTS-DENIED`, no HTTP attempt (AC-13) |
| 4xx | allow all | proceed (RFC 9309 §2.3.1.3) |
| 5xx, timeout, body >512 KB, parse error | disallow all | host batch skipped; failed-load marker TTL 300 s, then re-check |
| Cache hit | reuse | no robots.txt request within the 24 h TTL |

Evaluation uses crawler-commons `Robotstxt` against the single user-agent token
`techblog-archive-crawler/0.1`. A disallowed URL still produces a `fetch_log` row.

## 3. HTTP client configuration

| Setting | Value |
|---|---|
| Scheme / port | `https` only; port 443 (file 05) |
| Protocol | HTTP/1.1, no HTTP/2 negotiation |
| Connect / read timeout | 10 s / 30 s |
| Total budget per attempt | 60 s; exceeding it aborts the body read, outcome `timeout` |
| Redirects | <=3, same host only; cross-host redirect -> outcome `http_error`, terminal |
| User-Agent | `techblog-archive-crawler/0.1 (+contact from CRAWLER_CONTACT)` |
| Accept | discovery: `application/rss+xml,application/atom+xml,application/xml;q=0.9,text/html;q=0.8`; article: `text/html,application/xhtml+xml;q=0.9,*/*;q=0.5` |
| Accept-Encoding | `gzip` |
| Body caps | HTML 10 MB; robots.txt 512 KB; streamed abort on cap |
| Cookies / auth | none; default JDK trust store |

## 4. Sequence of one fetch task

1. Consume the message from `tb:q:{host}` (payload: file 03 §4); it stays in
   `tb:q:{host}:processing` until acknowledged.
2. RobotsService: cache hit or load `/robots.txt`; disallowed -> outcome `robots_denied`, jump to 7.
3. HostGate: acquire the host permit, wait until >=2000 ms (>=3000 ms Medium-family) after the
   host's previous request. A host paused by the circuit breaker (file 05) is re-scheduled here
   with no `fetch_log` row (no request is made).
4. ConditionalGetStore: load the `http_cache` row; add `If-None-Match` / `If-Modified-Since`.
5. FetchClient: one request attempt; the global permit is held only while a request is in flight.
6. OutcomeMapper: 304 -> `not_modified`; 2xx -> `ok`; otherwise status/exception -> outcome + code.
7. FetchLogWriter: write 1 `fetch_log` row and the article fetch-state columns in one transaction,
   then acknowledge the queue message.
8. Handoff: `ok` -> extraction (spec 03); retryable -> RetryPolicy schedules `tb:retry`; terminal ->
   article `failed` / `needs_review` / `skipped` (file 05 §3).

## 5. Alternatives rejected

| Alternative | Why rejected |
|---|---|
| >1 concurrent request per host | violates BR-03 / NFR-01; Medium-family hosts answer 403 |
| HTTP/2 or HTTP/3 | multiplexing gains nothing at 1 request per host; breaks simple gap accounting |
| Thread-per-host sleeping threads | 20+ threads parked in sleeps; the 4-host global cap becomes unenforced |
| `HttpURLConnection` | manual redirect + timeout code; JDK `HttpClient` is stable and pinned |
| Retries inside the HTTP client | hides attempts from `fetch_log` and metrics (BR-17); double-counts backoff |
| Robots.txt fetched per URL | extra host requests; 24 h cache + 300 s failure marker is enough |
| Persisting raw HTML for later reuse | violates BR-08; disk and privacy hygiene |
