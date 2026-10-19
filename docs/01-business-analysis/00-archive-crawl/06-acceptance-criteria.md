# 06 — Acceptance Criteria (BDD)

Scenarios map to user stories (US-xx, file 02) and rules (BR-xx). All commands are run manually by
the operator on the VPS; the compose stack is up (deploy/). DEVIATION CARRIED (2026-10-19):
manual-only operation; no scheduled crawls (first use: 04-crawl-orchestration file 01).

## AC-01 — Backfill one source (US-01)

**Given** source `cloudflare` enabled with >=200 discoverable articles,
**When** the owner triggers a backfill and it completes,
**Then** `archived_count >= 190`, `failed_count <= 5`, and every archived article has
`content.md`, `meta.json`, `assets/` under `data/uploads/crawl/cloudflare/<slug>/`.

## AC-02 — Incremental run (US-02)

**Given** a source fully backfilled yesterday,
**When** the owner starts an incremental job,
**Then** only items not yet archived are fetched, unchanged articles increment `skipped_count`,
and no archived file is rewritten.

## AC-03 — Restart safety (US-03)

**Given** a backfill in progress,
**When** the crawler-service receives SIGTERM and is restarted,
**Then** no duplicate articles exist (unique canonical_url), no partial final files exist,
and the job resumes and completes.

## AC-04 — Enable/disable source (US-04)

**Given** a disabled source,
**When** the owner enables it in the UI,
**Then** the next operator-triggered run includes it and the dashboard badge turns `fresh` after
first success.

## AC-05 — Failure visibility and retry (US-05, US-13)

**Given** an article failed with `FETCH-TIMEOUT`,
**When** the owner opens job detail,
**Then** the article lists code, reason, attempts; "Retry" re-queues it exactly once.

## AC-06 — Source health list (US-06)

**Given** archived articles exist,
**When** the owner opens the dashboard,
**Then** each source shows articleCount, archivedCount, lastSuccessAt, and health badge.

## AC-07 — Search (US-07)

**Given** >=1000 archived articles,
**When** the owner searches a title substring with a source filter,
**Then** matching articles return within 500 ms (local) with correct pagination.

## AC-08 — Offline reading (US-08)

**Given** an archived article,
**When** the owner opens the reader with the internet disconnected,
**Then** Markdown renders and all images display from local `assets/`.

## AC-09 — UI trigger with progress (US-09)

**Given** no active job for `slack`,
**When** the owner triggers a backfill in the UI,
**Then** a job row appears within 2 s and counters update at least every 30 s until completion.

## AC-10 — Job history (US-10)

**Given** multiple finished jobs,
**When** the owner opens `/jobs`,
**Then** jobs are listed newest-first with type, status, counters, and duration.

## AC-11 — Health endpoints (US-11)

**Given** all dependencies up,
**When** the owner calls `/health/liveness` and `/health/readiness` on each Spring service,
**Then** both return 200 with `{"status":"UP"}`;
**When** Redis is stopped, **Then** readiness returns 503 naming Redis, liveness stays 200.

## AC-12 — Silence detection (US-12)

**Given** an enabled feed source with no successful archive for 72 h,
**When** the owner opens the dashboard or the ops summary is read,
**Then** the source shows health `stale`, the `crawler_source_stale` gauge reads 1 for it, and a
WARN with code OPS-SOURCE-STALE is logged (at most once per stale episode).

## AC-13 — Robots respected (BR-01)

**Given** a host whose robots.txt disallows `/blog/private/`,
**When** discovery yields that URL,
**Then** no HTTP fetch is attempted and `fetch_log` records `DISC-ROBOTS-DENIED` for it.

## AC-14 — No hotlinking (BR-10)

**Given** any archived article,
**When** `content.md` is scanned,
**Then** every `<img>`/Markdown image reference is relative (`assets/...`), zero remote image URLs.

## AC-15 — Politeness (BR-03)

**Given** a backfill for one host,
**When** requests are observed,
**Then** at most 1 request is in flight at any time and gaps are >=2000 ms
(>=3000 ms for Medium-family hosts).

## AC-16 — Docker/Podman parity (G6)

**Given** the same git sha,
**When** the stack is started via Docker (`docker compose up -d`) and via Podman,
**Then** both pass AC-11 and AC-06 unchanged, with identical image tags.
