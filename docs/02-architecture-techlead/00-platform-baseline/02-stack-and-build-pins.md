# 02 — Stack and Build Pins

Closed set: no dynamic versions anywhere (no `+`, no `latest`, no ranges). Status legend:
`MANDATED` = fixed by user/brief; `VERIFIED <date>` = resolved/executed on a real build;
`CANDIDATE (V-1)` = still to be proven at first build/run; `PINNED` = decided by this doc.

## 1. Platform pins

| Element | Pin | Status |
|---|---|---|
| Spring Boot | 4.1.1 (Gradle plugin same version) | MANDATED |
| Kotlin | 2.4.21 (backend services; no Java sources) | MANDATED |
| Gradle | 9.8.1, Kotlin DSL, wrapper-only | VERIFIED 2026-10-19 |
| JVM toolchain | 21 (Temurin); runtime image eclipse-temurin:21-jre | VERIFIED 2026-10-19 (provisioned via resolver) |
| Toolchain provisioning | foojay-resolver-convention 1.0.0 in settings.gradle.kts | VERIFIED 2026-10-19 |
| PostgreSQL | 18.6 (single instance; crawler_db + api_db) | MANDATED |
| Redis | 7.4 | PINNED |
| React | 19.3.1 | MANDATED |
| Node.js | 24 (web build stage only; local v24.21.0) | VERIFIED 2026-10-19 |
| Nginx | nginx:1.29 (pinned upstream image) | CANDIDATE (V-1) |
| Testcontainers | 2.0.5 (Boot BOM-managed; PG 18.6 + Redis 7.4 in tests) | VERIFIED 2026-10-19 |
| Test stack | JUnit Jupiter 6.0.3 (Boot BOM-managed) | VERIFIED 2026-10-19 |

## 2. Backend library pins (Gradle version catalog)

| Library | Pin | Status | Used by |
|---|---|---|---|
| ROME (feed parsing) | 2.1.0 | VERIFIED 2026-10-19 | crawler-service |
| crawler-commons (robots, sitemaps) | 1.6 | VERIFIED 2026-10-19 (1.4.0 does not exist) | crawler-service |
| jsoup | 1.21.2 | VERIFIED 2026-10-19 | crawler-service |
| readability4j | 1.0.7 | VERIFIED 2026-10-19 | crawler-service |
| copy-down | `io.github.furstenheim:copy_down` 1.1 | VERIFIED 2026-10-19 (correct coordinates) | crawler-service |
| springdoc-openapi (Boot 4 line) | `springdoc-openapi-starter-webmvc-api` 3.1.1 | PINNED 2026-10-22 (Maven Central; build verification pending) | both services |
| logstash-logback-encoder | 8.0 | VERIFIED 2026-10-19 | both services |
| Flyway (Boot-managed) | Boot BOM value | PINNED (BOM) | both services |
| Jackson Kotlin module | Boot BOM (`tools.jackson.module:jackson-module-kotlin`) | PINNED (BOM) | both services |

## 3. Web pins (package.json, exact)

| Package | Pin | Status |
|---|---|---|
| react / react-dom | 19.3.1 | MANDATED |
| typescript | 5.9.3 | VERIFIED 2026-10-19 |
| vite | 7.1.5 | VERIFIED 2026-10-19 |
| @vitejs/plugin-react | 5.0.4 | VERIFIED 2026-10-19 |
| react-router | 7.9.4 | VERIFIED 2026-10-19 |
| react-markdown / rehype-sanitize / remark-gfm | 10.1.0 / 6.0.0 / 4.0.1 | VERIFIED 2026-10-19 |
| vitest | 3.2.4 | VERIFIED 2026-10-19 |
| @testing-library/react | not yet added (E4) | OPEN |

`package-lock.json` is committed; `npm ci` is the only install path. `engines.node >=24 <25`.

## 4. Task V-1 — completed 2026-10-19

| Result | Detail |
|---|---|
| Corrections found | crawler-commons 1.4.0 -> 1.6; copy-down 1.0.1 -> `io.github.furstenheim:copy_down` 1.1; Testcontainers 2.x renamed modules (`testcontainers-postgresql`, `testcontainers-junit-jupiter`) and JUnit Jupiter must be declared explicitly (Boot 4 manages 6.0.3) |
| JDK | no local JDK 21; foojay resolver provisions it (verified during assemble) |
| Web | `npm install` + `npm run build` green on Node v24.21.0; bundle 81.6 KB gzip |
| Still open | nginx image pull + full compose up verification (run 2026-10-19) |

## 5. Bump policy

| Change | Process |
|---|---|
| Infra image patch (PG 18.6.x, Redis 7.4.x, nginx 1.29.x) | allowed; record in this file |
| Third-party library patch (same major) | allowed; record in this file; rerun G-A/G-B gates |
| Boot / Kotlin / Gradle / React / Node | amendment required: DEVIATION FLAGGED entry here + AGENTS.md update + user sign-off |
| Gradle wrapper change | new distributionSha256Sum; wrappers checked in; G-F gate must pass |

## 6. Build layout

| Artifact | Location |
|---|---|
| Root Gradle build (wrapper 9.8.1) | `settings.gradle.kts`, `gradlew`, `gradle/libs.versions.toml` |
| Backend modules | `services/crawler-service`, `services/api-service` (independent bootJars) |
| Web build | `web/package.json` (Vite build outputs static assets) |
| No shared code module | contract docs + duplicated small DTOs per service (baseline 01, section 3) |

## 7. Verification log

| Item | Date | Result |
|---|---|---|
| Gradle wrapper 9.8.1 distribution | 2026-10-19 | downloaded + executed; wrapper scripts + jar committed |
| JDK 21 toolchain | 2026-10-19 | host has JDK 17 only; foojay resolver provisioned 21 during assemble |
| Backend pins | 2026-10-19 | resolve green after corrections; both bootJars built |
| Test compile | 2026-10-19 | green after JUnit Jupiter 6.0.3 + Testcontainers 2.x module names |
| Web pins | 2026-10-19 | `npm install` (208 packages) + `npm run build` green |
| compose.yaml syntax | 2026-10-19 | `docker compose config --quiet` green |
| Container runtimes | 2026-10-19 | docker present; podman missing — gate G-G blocked until installed |
| Testcontainers test run | 2026-10-19 | BUILD SUCCESSFUL: both smoke tests green on PG 18.6 + Redis 7.4 (Flyway V001-V005 / V001 applied) |
| springdoc-openapi 3.1.1 | 2026-10-22 | Maven Central POM verified (parent Spring Boot 4.1.0); build verification pending |
