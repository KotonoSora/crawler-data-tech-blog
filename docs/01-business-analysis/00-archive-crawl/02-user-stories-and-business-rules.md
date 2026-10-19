# 02 — User Stories and Business Rules

DEVIATION CARRIED (2026-10-19): manual-only operation; no scheduled crawls (first use:
04-crawl-orchestration file 01).

## 1. Personas

| ID | Persona | Description |
|---|---|---|
| P1 | Owner-operator | The single user: runs the stack, triggers/reads jobs, browses and reads the archive |

## 2. User stories

| ID | Story (as the owner-operator, I want to...) | Priority | Verified by |
|---|---|---|---|
| US-01 | trigger a full backfill for one source or all enabled sources | P1 | AC-01 |
| US-02 | run an incremental crawl on demand so new posts are discovered and archived | P1 | AC-02 |
| US-03 | restart the crawler mid-backfill and resume without duplicates or partial files | P1 | AC-03 |
| US-04 | enable or disable a source without redeploying | P2 | AC-04 |
| US-05 | inspect failed articles with a stable reason and retry them | P1 | AC-05 |
| US-06 | see each source with article counts and last-success time | P1 | AC-06 |
| US-07 | search articles by title, source, and date | P1 | AC-07 |
| US-08 | read an article rendered from local Markdown with local images | P1 | AC-08 |
| US-09 | trigger a crawl from the UI and watch progress | P1 | AC-09 |
| US-10 | see job history with per-job counters | P2 | AC-10 |
| US-11 | check liveness/readiness of every service | P1 | AC-11 |
| US-12 | be warned when a source silently stops producing new articles | P1 | AC-12 |
| US-13 | re-run a single failed article without touching the source | P2 | AC-05 |

## 3. Business rules

| ID | Rule | Rationale |
|---|---|---|
| BR-01 | robots.txt is honored per host before every fetch batch; disallowed URLs are skipped, not retried | Politeness + legality |
| BR-02 | User-Agent identifies the crawler and a contact address | Source operators can reach the owner |
| BR-03 | Per host: max 1 concurrent request; fixed delay >=2000 ms between requests; Medium-family hosts >=3000 ms | No overload; avoid 403/000 blocks |
| BR-04 | 4xx is terminal (except 408/429); 5xx/429 use bounded backoff: 5 attempts at 30 s, 2 m, 10 m, 1 h, 6 h; Retry-After honored up to 24 h | No retry storms |
| BR-05 | Conditional GET (ETag / If-Modified-Since) on every re-crawl | Bandwidth + politeness |
| BR-06 | Article identity = canonical URL with fragments and tracking params stripped (`?source=rss-...` etc.) | One article = one row, ever |
| BR-07 | `content_sha256` decides "changed"; slug is assigned once and never rewritten | Stable paths; idempotent re-crawls |
| BR-08 | Raw HTML is transient: never persisted, discarded after extraction | Storage hygiene |
| BR-09 | All final writes are temp file + atomic rename; no partial final files at any time | Crash safety |
| BR-10 | Images are downloaded into the article's `assets/`; Markdown references are relative | Offline reading; no hotlinking |
| BR-11 | `meta.json` always keeps: source_url, canonical_url, author, published_at, fetched_at, content_sha256 | Attribution + integrity |
| BR-12 | Attribution and original link are never stripped from `content.md` | Respect for authors |
| BR-13 | DoorDash stays disabled until a new probe confirms a crawlable discovery path | Unverified = off |
| BR-14 | Feeds are windows, not archives: backfill must page sitemaps/listings until exhaustion | Complete history |
| BR-15 | Medium-family 000/403 responses are transient: retry with browser UA, never mark "source removed" | Known intermittent behavior |
| BR-16 | The web UI reads/writes only through api-service; it never touches databases or disk directly | Service isolation |
| BR-17 | Every fetch is logged (url, status, duration, bytes) and counted in metrics; a source that stops producing triggers a staleness warning | Silence is a bug |
| BR-18 | Backfill and incremental jobs for the same source cannot run simultaneously | Queue coherence |

## 4. Story-to-rule coverage

| Stories | Rules they depend on |
|---|---|
| US-01, US-02 | BR-01, BR-03, BR-05, BR-14, BR-18 |
| US-03 | BR-06, BR-07, BR-09 |
| US-05, US-13 | BR-04, BR-17 |
| US-08 | BR-10, BR-11, BR-12 |
| US-09, US-10 | BR-16, BR-18 |
| US-12 | BR-17 |
