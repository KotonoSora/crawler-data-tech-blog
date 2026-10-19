# 03 — Workflow and User Journey

## 1. System workflow (crawl pipeline)

```
[Trigger: operator action — UI button or admin REST]
        v
crawler-service: Discovery  ->  candidates (canonical URLs)
        v
enqueue per-host queues (Redis)  ->  HostGate: 1 concurrent, >=2 s delay, robots
        v
Fetch (conditional GET)  ->  transient HTML (never persisted)
        v
Extract (readability + overrides) -> Markdown + image jobs
        v
Archive: temp file + atomic rename -> data/uploads/crawl/<source>/<slug>/
        v
DB state (crawler_db) + events (Redis Streams)
        v
api-service: projections (api_db)  ->  web UI: browse / search / read / monitor
```

## 2. Workflow phases

| # | Phase | Owner | Input | Output | Failure handling |
|---|---|---|---|---|---|
| 1 | Trigger | web -> api-service -> crawler-service | source key(s), job type | crawl_job row (status `pending`) | duplicate active job rejected (BR-18) |
| 2 | Discovery | crawler-service | feed/sitemap/listing pages | candidate canonical URLs | feed window short -> fall back to sitemap/listing |
| 3 | Enqueue | crawler-service | candidates | Redis per-host queues | duplicates dropped by identity (BR-06) |
| 4 | Fetch | crawler-service | queued URL | transient HTML response | 4xx terminal; 5xx/429 backoff (BR-04) |
| 5 | Extract | crawler-service | HTML | Markdown + asset list | parse failure -> `needs_review`, no file written |
| 6 | Archive | crawler-service | Markdown + assets | files on disk + DB state `archived` | atomic write; crash -> retried cleanly |
| 7 | Project | api-service | Redis Streams events | read models in `api_db` | projection lag visible in UI |

## 3. Backfill vs incremental

| Aspect | Backfill | Incremental |
|---|---|---|
| Trigger | Operator action (UI "Crawl source now" / REST), once per source | Operator action only (UI "Run incremental" / "Refresh stale", or REST) |
| Discovery | Sitemap/listing pagination until exhaustion (feeds only as a supplement) | Feed/sitemap window: only items newer than last success |
| Volume | Hundreds of articles per source | 0-100 items per run |
| Priority | Normal | Normal; never starves backfill queues (per-host fairness) |
| Completion | Job counters frozen; summary reported | Job closes with `archived_count` + `skipped_count` |

## 4. Restart and resume

1. On boot, crawler-service reclaims unfinished jobs (`pending`, `running` with stale lease).
2. Articles left in `processing` past their lease (600 s) are re-queued once; `attempt_count` is not reset.3. Files are only ever visible after atomic rename; a crash leaves at most temp files, which are purged on boot.
4. Re-crawl of an archived article with unchanged `content_sha256` is a no-op (counted `skipped`).

## 5. User journeys

| ID | Journey | Steps (touchpoints) |
|---|---|---|
| J1 | First setup | `docker compose up` (deploy) -> migrations seed sources -> open UI -> readiness green (web, api-service, crawler-service) |
| J2 | Kick off backfill | UI: sources page -> "Start backfill" one source or all (web -> api-service -> crawler-service) -> watch job progress |
| J3 | Incremental refresh | Dashboard flags stale sources (72 h) -> "Refresh stale" (bulk) or per-source "Run incremental" -> new articles archived -> list shows what changed |
| J4 | Reading | UI: filter by source -> search/browse list -> open reader (Markdown + local images) -> optionally open original URL |
| J5 | Failure triage | UI: job detail -> failed list -> reason code -> "Retry article" (US-13) or "Mark skipped" |
| J6 | Source changes | UI: toggle enabled (US-04); adding a brand-new source = config + re-probe, then deploy-time seed update |

## 6. Silence detection (source health)

DEVIATION CARRIED (2026-10-19): staleness is a data attribute, not a schedule; refresh is manual
(first use: 04-crawl-orchestration file 01).

| Signal | Condition | Visible outcome |
|---|---|---|
| Fresh | Last successful archive <= 72 h ago for an enabled feed source | Health "fresh" |
| Stale | No successful archive for 72 h while feed/sitemap reachable | Health "stale" + warning metric (BR-17); UI offers "Refresh stale" |
| Broken | 5 consecutive discovery failures | Health "broken" + job failure reason |
