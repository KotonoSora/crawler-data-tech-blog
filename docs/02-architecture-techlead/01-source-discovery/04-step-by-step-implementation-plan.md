# 04 — Source Discovery: Step-by-Step Implementation Plan

Order: E0 scaffold -> registry + normalizer -> discoverers -> orchestrator + dedupe -> internal REST
-> pilot (E1). Feed discovery is the E1 pilot path; sitemap and listing land for E2. Definition of
Done for every row: baseline 06 section 4 (Testcontainers PG 18.6 + Redis 7.4, metrics/logs, no new
`WARN` without a code, image still builds).

| Task ID | Subsystem (BE/DevOps) | Step Description | Dependency | Acceptance Goal |
|---|---|---|---|---|
| BE-01-01 | BE | SourceRegistry + `discovery_config` Kotlin data class + Jackson 3 mapping; load source rows; `/internal/v1/sources` read model | E0 scaffold, baseline 03 V001 | 20 rows load from seed; DoorDash `enabled=false`; unknown key -> 404 CFG-SOURCE-NOT-FOUND; malformed config rejected per source with 1 `WARN` |
| BE-01-02 | BE | CandidateNormalizer: strip fragments + tracking params, resolve relative URLs, https-only, in-run dedupe | BE-01-01 | >=20-case table test green; `?source=rss-*` stripped; 0 non-https candidates survive |
| BE-01-03 | BE | FeedDiscoverer (ROME 2.1.0): RSS 2.0 + Atom window; 2 attempts then DISC-FEED-PARSE-FAILED; Medium profile sends browser UA + `Accept: application/rss+xml` | BE-01-02, DO-01-02 | Fixture feed -> >=10 candidates; malformed XML -> exactly 2 attempts then the code; 0 candidates from `javascript:` links |
| BE-01-04 | BE | SitemapDiscoverer (crawler-commons 1.4.0): sitemap index -> <=100 children; gzip; 404 -> DISC-SITEMAP-MISSING | BE-01-02, DO-01-02 | Fixture index -> <=100 children; 404 fixture -> code with 0 retries |
| BE-01-05 | BE | ListingDiscoverer (jsoup 1.21.2): CSS selectors from `discovery_config`; stop at 0 new links; hard cap 500 pages per run | BE-01-02, DO-01-02 | Fixture listing -> >=20 links; empty selectors or 0 new links twice -> DISC-LISTING-SELECTOR-BROKEN; page 501 never requested |
| BE-01-06 | BE | DiscoveryOrchestrator: fallback feed -> sitemap -> listing; backfill continues past the feed window; chosen `path` recorded on the job | BE-01-03, BE-01-04, BE-01-05 | Feed window smaller than history -> run continues; job `path=sitemap`; enqueued count equals distinct candidates (+-0) |
| BE-01-07 | BE | Dedupe + persist + enqueue: insert-or-ignore on `uq_article_canonical_url`; Redis per-host queue; counters | BE-01-06 | Re-run inserts 0 rows; `discovered_count` equals distinct canonical URLs; 0 duplicates after 2 runs |
| BE-01-08 | BE | Internal REST (file 03): POST /internal/v1/jobs, GET job, GET sources; Bean Validation; ProblemDetail mapper with `type=urn:tech-blog:error:<CODE>` | BE-01-01 | Contract test green for 202/400/404/409; every error body carries `type` + `code`; unknown JSON field -> 400 |
| BE-01-09 | BE | Robots gate for every discovery host (crawler-commons, Redis cache 24 h) + DISC-ROBOTS-DENIED logging | BE-01-03 | AC-13: disallowed fixture URL -> 0 HTTP fetches, 1 `fetch_log` row with the code; <=1 robots fetch per host per 24 h |
| BE-01-10 | BE | Pilot acceptance (E1): one feed source end-to-end under compose | BE-01-07, BE-01-08, BE-01-09, DO-01-03 | >=90% of feed items archived with valid `content.md` + `meta.json`; AC-13 + AC-15 observable in logs; job ends `succeeded` |
| DO-01-01 | DevOps | Author `V005__seed_sources.sql` (20 rows, DoorDash disabled) + migration test both paths | BE-01-01 | G-H: fresh and upgrade boots apply cleanly; 20 rows; DoorDash `enabled=false`; 0 checksum repairs |
| DO-01-02 | DevOps | Capture dated fixtures for 3 sources (1 feed, 1 sitemap, 1 listing) into crawler-service test resources | E0, probe 2026-10-19 | 3 fixture sets committed with probe date + HTTP status + content type in a README table |
| DO-01-03 | DevOps | Operator-run offline fixture check: run fixture discovery with network egress disabled; the check fails if a fixture test needs network (run manually as part of G-B) | BE-01-03, BE-01-04, BE-01-05, DO-01-02 | Fixture test green offline (0 outbound sockets); any fixture test needing network fails the check |

## Increment mapping

| Increment | Tasks |
|---|---|
| E1 pilot | BE-01-01, BE-01-02, BE-01-03, BE-01-08, BE-01-09, BE-01-10, DO-01-02, DO-01-03 |
| E2 crawl complete | BE-01-04, BE-01-05, BE-01-06, BE-01-07, DO-01-01 |

## Pitfalls and guards

| Pitfall | Guard |
|---|---|
| Jackson 3 Kotlin module missing -> omitted JSON fields become null | E0 scaffold test asserts a data-class default; BE-01-08 contract test repeats it |
| Feed read mistaken for a backfill (window) | BE-01-06 asserts the sitemap path when the feed window cannot cover history (BR-14) |
| Listing selector silently matches nothing | 0 new links twice -> DISC-LISTING-SELECTOR-BROKEN; never a 0-candidate success |
| Duplicate articles after `kill -9` | unique index + insert-or-ignore; AC-03 restart test in BE-01-07 |
| DoorDash accidentally enabled | seed sets `enabled=false`; DO-01-01 asserts it on every migration run |
