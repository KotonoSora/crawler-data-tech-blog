# E2E suite (Playwright 1.64.1)

This folder is the **TDD red suite** for the archive UI and the public API contract. It is a
standalone npm workspace (`@techblog/e2e`); it is never imported by `web/` and never shipped in
an image.

> **Status of this change set.** The suite below was authored first (red), but the repository
> constraint for this task is *write only*: no `npm install`, no `playwright test`, no Gradle.
> The tests therefore have **not been executed** in this change set. The runbook below is the
> exact sequence to go red → green once commands are allowed.

## 1. Projects

| Project | Target | Infrastructure | Purpose |
|---|---|---|---|
| `ui` | shell `127.0.0.1:5173` + catalog/reader/admin dev servers + stub API `127.0.0.1:8099` | none | UI contract: routing, MFE mounting, catalog/reader/admin behaviour |
| `stack` | compose stack through nginx `127.0.0.1:8090` | `docker compose up -d` | Real `api-service` contract, ProblemDetail, MFE bundles served by nginx |

`playwright.config.ts` starts the four Vite dev servers and the stub automatically. The shell's
Vite proxy is pointed at the stub through `VITE_API_PROXY_TARGET=http://127.0.0.1:8099`; the
remotes call relative `/api/...` paths, so every request stays on the shell origin and reaches
the stub. Nothing is hard-coded in product code.

The stub (`support/stub-api.ts`) is a deterministic double of spec 06 file 03. It is a test
fixture: it has a `/__test__/*` control plane (reset, force error, request log) and is never
deployed.

## 2. Red → green runbook

```bash
# 0. one-time install (Node 24)
cd e2e
npm install
npx playwright install chromium

# 1. RED — UI project. Fails until web/ implements the contract.
npm run test:ui

# 2. GREEN gate for the web layer
npm run test:ui          # 0 failed

# 3. backend/stack gate (requires images built and compose up)
docker compose -f ../deploy/compose.yaml up -d --build
E2E_STACK=1 npm run test:stack

# 4. typecheck the suite itself
npm run typecheck
```

`npm test` runs both projects; `stack` tests self-skip unless `E2E_STACK=1`
(`test.skip(!process.env.E2E_STACK, ...)`), so a bare `npm test` is safe without Docker.

## 3. Spec map

| File | Covers | BA / spec |
|---|---|---|
| `tests/shell.spec.ts` | frame, routes, remote mounting, deep links, 404, `tb:navigate`, no storage, English-only, ops banner, cached loader | spec 07 file 02 §3, file 03 §2; AC-11 |
| `tests/catalog.spec.ts` | 20 source cards, health/counters, enable/disable, refresh stale, source detail, search + filter + paging in the URL, 300 ms debounce, ProblemDetail rendering, backfill trigger, duplicate active job | AC-04, AC-06, AC-07, AC-09; US-01, US-12 |
| `tests/reader.spec.ts` | Markdown, tables, code, asset rewrite (no hotlinking), sanitization, safe external links, raw link, metadata, retry, ART-NOT-FOUND | AC-05, AC-08, AC-14; US-13 |
| `tests/admin.spec.ts` | newest-first jobs, counters, failures + attempts, retry, cancel dialog, terminal states, crawl-all, poll cadence, ops card, JOB-NOT-FOUND | AC-05, AC-09, AC-10 |
| `tests/api-contract.spec.ts` | real stack: sources, ProblemDetail, size bounds, newest-first, 404s, command validation, ops summary, health, SPA + MFE bundles, missing bundle 404 | AC-06, AC-11; spec 06 file 03 |

## 4. Fixtures

Sources: the 20-row catalog from `AGENTS.md`; 19 enabled, `doordash` disabled.
Health: `cloudflare` fresh, `slack` stale, every other enabled source fresh, `doordash` broken.
Articles (5): four under `cloudflare` (`…e341` archived, `…e342` archived, `…e343` archived,
`…e344` failed) and one under `slack` (`…e345` archived).
Jobs (3): `…0011` cloudflare backfill cancelled, `…0012` cloudflare backfill running
(812/640/57/3), `…0013` slack incremental completed.

Because `cloudflare` has a running job, the *successful* trigger test uses `slack`; the
*duplicate* test uses `cloudflare` and asserts the `activeJobId` link.

## 5. Notes

- No `localStorage`, `sessionStorage` or cookies: URL query is the only list state (spec 07
  file 02 §4). The suite asserts all three are empty.
- English-only: `html[lang=en]`, `locale: 'en-US'`, and a forbidden-string check for Vietnamese
  labels. There is no locale switcher to remove; `web/packages/shared/src/i18n.ts` pins `en`
  and its unit test rejects any other locale.
- `data-poll-ms` on `jobs-page` / `job-detail` documents the 30 s polling contract without
  making the suite sleep for 30 s.
