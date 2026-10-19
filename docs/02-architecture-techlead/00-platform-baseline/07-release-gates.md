# 07 — Release Gates

A release candidate is promotable only when every gate below passes on the same git sha. There is
no CI server and no pipeline: the operator runs every gate manually on the VPS and records the
outcome. Gate IDs are referenced by delivery phases (file 06) and task acceptance goals.

DEVIATION CARRIED (2026-10-19): manual-only CI/CD; gates and deploys are operator-run
(first use: 04-crawl-orchestration file 01).

## 1. Gates (all operator-run)

| Gate | Name | Manual check | Tooling |
|---|---|---|---|
| G-A | Build | operator runs `./gradlew build` for both services and `npm ci && npm run build` for web; green | wrapper 9.8.1 only |
| G-B | Tests | operator runs backend unit + Testcontainers integration (PG 18.6 + Redis 7.4) and web vitest; green | Gradle + npm |
| G-C | Style | operator runs ktlint (Kotlin), eslint, tsc --noEmit (web); clean | Gradle/npm tasks |
| G-D | Images | operator builds 3 images; tags `:<semver>-<gitsha>`; verifies non-root (`id -u` = 10001); records sizes | docker/podman build |
| G-E | Supply chain | operator runs SBOM per image (syft) + vulnerability scan (grype): 0 critical, highs triaged with owner + date | syft/grype |
| G-F | Wrapper integrity | `gradle-wrapper.properties` has `distributionSha256Sum`; wrapper jar matches 9.8.1 | manual check + docs update |
| G-G | Runtime parity | operator runs compose smoke on Docker AND Podman: AC-11 (health) + AC-06 (dashboard data) via 127.0.0.1:8090 | docker compose / podman compose |
| G-H | Migration safety | operator takes `pg_dump` backup first, then boots fresh DB (all migrations) and upgrade path (new ones only) (baseline 03, 05) | Flyway + pg_dump |
| G-I | Docs current | operator reviews: AGENTS.md, BA tree, TL tree reflect shipped behavior; deviations flagged inline | review |

## 2. Release checklist (ordered, operator-run)

| # | Step | Owner |
|---|---|---|
| 1 | Freeze sha; operator runs G-A..G-C on the VPS | operator |
| 2 | Run G-H against a copy of `data/` before touching anything | operator |
| 3 | Operator builds images (G-D); runs SBOM + scan commands (G-E) | operator |
| 4 | Version bump + local tag `<semver>-<gitsha>`; operator records tag -> digest mapping in deploy/releases.md | operator |
| 5 | Operator deploys: `docker compose build && docker compose up -d` (or podman) on the VPS; runs G-G parity smoke | operator |
| 6 | Check dashboards/logs for 10 min: readiness, fetch_log growth, staleness gauges | operator |
| 7 | Rollback plan: operator redeploys previous digest pair (all 3 images) + migration note if schema changed | operator |

## 3. Promotion and rollback rules

| Rule | Detail |
|---|---|
| Immutable tags | never reuse a tag; a fix = new semver + sha. Images build locally on the VPS; no registry push/pull automation |
| Digest promotion | manual only: the operator records digests in deploy/releases.md; compose and deploy notes reference digests, not tags, for promoted releases |
| Rollback window | previous digest must boot against current DB schema; forward-only migrations require a note if rollback is schema-incompatible |
| Semantics | MAJOR = schema/API breaking; MINOR = features (new source, endpoints); PATCH = fixes, pin bumps |

## 4. Gates for schema changes

| Change type | Extra requirement |
|---|---|
| New table/column | migration + test in both fresh and upgrade paths (G-H) |
| Drop/rename | forbidden in a single migration; expand-migrate-contract over >=2 releases |
| Index change | `EXPLAIN` before/after on a 10k-row fixture; record outcome in the task notes |
| Retention/cleanup change | doc update (baseline 05) + metric for rows purged |

## 5. Definition of "release ready"

All gates pass, checklist complete, and the latest parity smoke (G-G) ran within the last 24 h of
promotion. Any red gate blocks promotion; waivers require a DEVIATION FLAGGED entry naming the
gate, the risk, and the expiry date.
