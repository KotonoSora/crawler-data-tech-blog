# 05 — Source Discovery: Security, Logging and Rate Limiting

## 1. SSRF guard

| Control | Rule | Enforced at |
|---|---|---|
| Scheme | https only; `file`, `gopher`, `ftp` rejected (0 exceptions); `http` upgraded to `https` when the host is allowlisted, else dropped | CandidateNormalizer + HTTP client filter |
| Host allowlist | per run: hosts of that source's `feed_url`, `sitemap_url`, `listing_url`, `home_url`; candidates on other hosts are dropped | DiscoveryOrchestrator |
| User input | API accepts only `sourceKey`; no user-supplied URL is ever fetched | API layer (file 03) |
| Redirects | follow <=3 hops; every hop re-checked (https + allowlist + IP ranges); a violation aborts the request | HTTP client redirect strategy |
| Private ranges | resolved IP in 127.0.0.0/8, 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.0.0/16, ::1, fc00::/7 -> abort | resolve step before connect |
| DNS | every address for a hostname is checked; >4 addresses -> abort | resolve step |
| Timeouts | connect 10 s; read 30 s (NFR-04) | HTTP client config |
| Response cap | HTML/XML >10 MB -> FETCH-TOO-LARGE, response discarded unparsed | HTTP client config |
| Fetch gate | discovery page fetches use the same per-host HostGate as article fetches (spec 02) | HostGate |

## 2. robots enforcement

| Item | Rule |
|---|---|
| Scope | every discovery host, before the first discovery fetch of a run |
| UA | `techblog-archive-crawler/0.1 (+contact from CRAWLER_CONTACT)`; missing `CRAWLER_CONTACT` -> service refuses to start |
| Cache | Redis key `tb:robots:<host>`, TTL 24 h; <=1 robots fetch per host per 24 h |
| Disallowed URL | skipped without fetch; `fetch_log` row `DISC-ROBOTS-DENIED`; 0 retries (BR-01) |
| robots 404 | allow all paths for that host |
| robots 5xx / network error | host treated as disallowed for 1 h; `WARN` with code DISC-ROBOTS-DENIED; other hosts continue |

## 3. Politeness during listing and sitemap pagination

| Rule | Value |
|---|---|
| Per-host concurrency | exactly 1 request (NFR-01) |
| Inter-request delay | >=2000 ms; Medium-family (`politeness_profile=medium`) >=3000 ms |
| Global concurrent hosts | 4 (`CRAWLER_GLOBAL_HOSTS`) |
| Listing pagination | <=500 pages per run per source; stops earlier at 0 new links |
| Sitemap children | <=100 child sitemaps per index |
| Feed | 1 GET per run (window read); on parse failure at most 2 attempts total |
| Conditional GET | `If-None-Match` / `If-Modified-Since` on every discovery re-fetch (BR-05) |
| Backoff | 5xx/429: 30 s, 2 m, 10 m, 1 h, 6 h; `Retry-After` honored <=24 h; 4xx terminal (BR-04) |

## 4. Logging

JSON Lines to `data/logs/crawler-service.jsonl` (logstash-logback-encoder 8.0), UTC; one event per
discovery page. Field names are frozen for spec 05 dashboards.

| Field | Type | Example | Emitted |
|---|---|---|---|
| sourceKey | string | cloudflare | every line |
| runId | string (job id) | 0192f0c1-6a1e-... | every line |
| path | enum | sitemap | page lines |
| page | integer >=1 | 12 | listing/sitemap pages (1 for feed) |
| url | string | https://blog.cloudflare.com/page/12 | page lines |
| httpStatus | integer | 200 | page lines |
| bytes | integer | 48213 | page lines |
| durationMs | integer | 412 | page lines |
| candidates | integer >=0 | 47 | page lines (after normalization) |
| newCandidates | integer >=0 | 12 | page lines (after dedupe) |
| outcome | enum `ok` / `fallback` / `skipped` / `error` | ok | page lines |
| code | stable code or null | DISC-SITEMAP-MISSING | outcome `fallback` or `error` |

Levels: INFO per page; WARN on fallback or skipped fetch; ERROR only when a job ends `failed`.
Logged URLs are public page URLs only (NFR-27); no request headers or bodies are logged.

## 5. Metrics

| Metric | Type | Labels | Definition |
|---|---|---|---|
| crawler_discovery_pages_total | counter | source, path | discovery page fetches, any HTTP status |
| crawler_discovery_candidates_total | counter | source, deduped | normalized candidates; `deduped=true` = already present in `article` |
| crawler_discovery_failures_total | counter | source, code | one increment per DISC-* occurrence |

Exposed via Actuator `/actuator/prometheus` on the compose network (NFR-24). Labels are closed
sets: `source` = 20 keys, `path` = 3 values, `code` = the 4 DISC codes -> bounded cardinality, no
URL or free-text labels. Silence guard: 0 new candidates for 3 consecutive operator-triggered runs
(>=72 h) surfaces the `crawler_source_stale` attribute (BR-17; metric owned by spec 05-observability).

## 6. Probe-date discipline

| Rule | Threshold / detail |
|---|---|
| Claim requires a dated probe | fetch the feed/sitemap/listing with the crawler UA; record surface, HTTP status, content type, date in the AGENTS.md catalog |
| Freshness | a probe older than 30 days is not evidence; re-probe before citing it in docs or seeds |
| Disabled sources | DoorDash remains `enabled=false` until a fresh probe returns HTTP 200 and >=1 candidate (BR-13) |
| Fixtures | DO-01-02 fixtures carry the probe date; re-capture when older than 90 days |
| No guessing | never state a source is crawlable without fetching it in the session; failed probes are recorded as failures, not omitted |
