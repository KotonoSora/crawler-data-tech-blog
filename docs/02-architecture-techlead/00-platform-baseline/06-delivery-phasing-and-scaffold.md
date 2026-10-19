# 06 — Delivery Phasing and Scaffold

DEVIATION CARRIED (2026-10-19): manual-only CI/CD and crawl operation; the operator runs every
gate and deploy step on the VPS (first use: 04-crawl-orchestration file 01).

## 1. Repository layout (final)

```
tech-blog/
├── AGENTS.md
├── settings.gradle.kts            # root Gradle build (9.8.1 wrapper)
├── gradlew / gradlew.bat / gradle/
├── services/
│   ├── crawler-service/           # Spring Boot 4.1.1 + Kotlin 2.4.21
│   └── api-service/               # Spring Boot 4.1.1 + Kotlin 2.4.21
├── web/                           # React 19.3.1 + TS + Vite; package-lock committed
├── deploy/
│   ├── compose.yaml
│   ├── Containerfile.crawler / Containerfile.api / Containerfile.web
│   ├── nginx/                     # SPA conf + archive conf
│   ├── .env.example
│   └── prepare-dirs.sh
├── data/                          # gitignored runtime state (baseline 05)
└── docs/                          # this documentation tree
```

## 2. Increments and exit criteria

| Increment | Scope | Exit criteria (all must pass) |
|---|---|---|
| E0 scaffold | root build, two service skeletons, compose (PG/Redis/all images), health endpoints, empty-but-versioned Flyway migrations, Task V-1 (pins) | operator runs `./gradlew build` (green) and `npm ci`; `docker compose up`: both services ready, `/health/readiness` 200; flyway history applied to both DBs |
| E1 pilot crawl | discovery (feed), HostGate + robots, fetch, extraction, archive for ONE feed source end-to-end, fetch_log rows, job row | Backfill of the pilot source archives >=90% of feed items with valid content.md/meta.json; AC-13 + AC-15 observable in logs |
| E2 crawl complete | sitemap + listing discovery, per-source overrides, assets/images, backfill all 19 enabled sources, operator-triggered incremental runs, retries/backoff | AC-01..AC-04, AC-14 pass on real sources; no partial files after kill -9 during a run |
| E3 api-service | read models + projection consumer, public `/api/v1`, commands proxied to crawler `/internal/v1`, ops summary | BA 04 DTOs served; projection lag <=10 s typical; AC-07 (search) passes; contract tests for events |
| E4 web UI | dashboard, sources, article list/search, reader, jobs, trigger actions | AC-06, AC-08, AC-09, AC-10 pass; CLI smoke via Playwright/manual script |
| E5 hardening and release | staleness attribute, retention maintenance, operator-run SBOM + scan commands, Docker/Podman parity, backup drill, docs updated | Operator runs all gates G-A..G-I manually (file 07); parity smoke AC-16 green in both runtimes |

## 3. Scaffold acceptance (E0 detail)

| Deliverable | Acceptance |
|---|---|
| Root build | operator runs `./gradlew build`; both services compile; no Java sources; version catalog only |
| Wrapper | 9.8.1; `distributionSha256Sum` set; gradlew scripts committed |
| Service skeletons | Application class, `api/domain/data/config` packages present, Actuator + health controllers, Jackson 3 Kotlin module registered |
| Migrations | crawler V001-V005, api V001 applied on fresh databases |
| web | operator runs `npm ci && npm run build`; static bundle produced; dev proxy config for `/api` |
| deploy | operator runs `compose up -d`; all services start; loopback-only binds; `.env.example` complete |
| Docs | AGENTS.md + BA (7) + baseline (7) + 7 spec dirs present |

## 4. Definition of Done (every task)

1. Code + tests committed under `src/` of the owning service; Kotlin/TS style checks run by the
   operator and pass.
2. Integration test with Testcontainers for the touched subsystem (PG 18.6 + Redis 7.4).
3. Metrics/logs added or updated per spec 05; no new `WARN`/`ERROR` noise without a code.
4. Docs touched if behavior differs from BA/TL specs; deviations flagged inline.
5. Operator builds the container image; health endpoints unaffected.

## 5. Order of work (dependency chain)

E0 -> E1 -> E2 (blocking) -> E3 -> E4 -> E5. Within E2-E4, crawler specs 01-04 precede 05;
api-service (06) can start after E2 lands the first events; web (07) starts after 06's contract
file is stable. All spec tasks use the task table format from AGENTS.md.
