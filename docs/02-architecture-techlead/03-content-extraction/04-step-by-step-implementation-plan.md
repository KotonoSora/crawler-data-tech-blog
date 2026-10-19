# 04 — Step-by-Step Implementation Plan

Scope: extraction, image, archive-write and internal-read tasks for crawler-service (spec 03), inside
increment E2 (baseline 06, section 2). Every task follows the Definition of Done of baseline 06,
section 4 (tests, metrics, docs).

## 1. Tasks

| Task ID | Subsystem (BE/DevOps) | Step Description | Dependency | Acceptance Goal |
|---|---|---|---|---|
| BE-03-01 | BE | Extraction skeleton: stage interfaces, jsoup 1.21.2 parse, readability4j 1.0.7 wrapper, candidate resolution order (file 01, section 2) | spec 02 fetch stage | 1 HTML input -> 1 candidate; no candidate after all 3 strategies raises `EXTRACT-PARSE-FAILED`; unit tests green |
| BE-03-02 | BE | Per-source override selectors from `source.discovery_config.extraction.selectors[]`, applied when readability yields <200 characters | BE-03-01 | Fixture where readability fails but the override yields >=200 characters; config change needs no redeploy |
| BE-03-03 | BE | copy-down 1.0.1 conversion + the 6 post-processors (file 01, section 3) | BE-03-01 | 0 raw HTML blocks; heading depth 2..6; fenced code keeps its language class; golden-file tests green |
| BE-03-04 | BE | Sanitizer + no-hotlink verifier (file 05, sections 1 and 7) | BE-03-03 | 0 `script`/`iframe`/`on*`/`javascript:` occurrences; any leftover remote image fails the article with `EXTRACT-PARSE-FAILED` |
| BE-03-05 | BE | Image downloader: srcset selection, skip SVG/`data:`/<=1 px, shared HostGate, <=25 MB per image, 1 retry at 30 s | BE-03-04, spec 02 HostGate | >=95% of images across the 20-fixture corpus stored locally; skipped images log `EXTRACT-ASSET-SKIPPED` and leave 0 remote references |
| BE-03-06 | BE | Asset naming and dedupe: `img-<nnn>-<8hex>.<ext>`, sha256 dedupe, caps 100 files / 50 MB | BE-03-05 | duplicate bytes stored once; cap overflow sets `EXTRACT-ASSET-LIMIT`; 100% of file names match the naming regex |
| BE-03-07 | BE | Atomic writer: stage in `data/tmp/<article-id>/`, fsync, sha256 over `content.md` bytes, `ATOMIC_MOVE`, DB commit (baseline 05, section 2) | BE-03-06 | `kill -9` at each of the 4 protocol steps leaves 0 partial final directories; DB sha equals file sha |
| BE-03-08 | BE | `meta.json` writer: 11 fields + asset entries (file 03, section 1), stable key order | BE-03-07 | output validates against the file 03 schema; byte-identical across 3 re-runs of the same input |
| BE-03-09 | BE | Quality gates + revision append: <200 characters -> `EXTRACT-EMPTY-CONTENT`, 2 MB cap, slug check, `article_revision` row on sha change (file 02, section 3) | BE-03-08 | `needs_review` leaves 0 files on disk; a changed sha appends exactly 1 revision row before overwrite |
| BE-03-10 | BE | Internal endpoints `GET /internal/v1/articles/{id}`, `/content`, `/assets/{file}` (file 03, section 4) | BE-03-09, spec 04 internal API | api-service loads Markdown over HTTP with 0 crawler disk mounts; traversal attempts return 400; non-archived ids return 404 |
| DO-03-01 | DevOps | Fixture corpus: >=2 saved HTML pages per source family (feed, sitemap, listing, Medium-family markup), each naming its expected candidate selector | BE-03-01 | >=20 fixtures under `services/crawler-service/src/test/resources/fixtures/`; every fixture has a named expectation |
| DO-03-02 | DevOps | Markdown golden-file tests: convert fixtures, compare against checked-in `*.md` + `meta.json` goldens | DO-03-01 | byte-identical across 3 consecutive runs; failure output names file and line |
| DO-03-03 | DevOps | Disk-full and IO-fault simulation test (Testcontainers + size-limited tmpfs and an injected `FileSystem` fault) | BE-03-07 | free space below 5 GB -> `STORE-DISK-FULL`, job paused, 0 partial files; rename fault -> 1 retry then `STORE-RENAME-FAILED` |

## 2. Sequencing

| Phase | Tasks | Exit criteria |
|---|---|---|
| E2a extraction core | BE-03-01..04, DO-03-01..02 | golden-file suite green for >=20 fixtures |
| E2b assets | BE-03-05..06 | images local; caps enforced; AC-14 observable |
| E2c archive write | BE-03-07..09, DO-03-03 | crash and disk-full tests green; AC-03 preserved |
| E2d internal read | BE-03-10 | spec 06 can fetch content over HTTP |
