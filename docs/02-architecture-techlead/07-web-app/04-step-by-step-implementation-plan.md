# 04 — Step-by-Step Implementation Plan

Web (spec 07) starts after spec 06's contract file is stable (baseline 06 §5). Every task follows
the Definition of Done in baseline 06 §4 plus gates G-A (build), G-B (vitest) and G-C via
`npm run typecheck` (`tsc --noEmit`; the eslint half needs a baseline 02 pin row before it gates).
There is no CI: the single operator runs every command manually (runbook below).

| Task ID | Subsystem | Step | Dependency | Acceptance Goal |
|---|---|---|---|---|
| BE-07-01 | BE | npm-workspaces monorepo at `web/`: root workspace (already present) + `apps/shell`, `apps/catalog`, `apps/reader`, `apps/admin`; pinned Vite 8.3.4 + React 19.3.1 + TS 5.9.3; commit `web/package-lock.json`; `engines >=24 <25` | V-1 pins (baseline 02 §4) | `npm install` + `npm run build` green for all 4 apps; `npm run typecheck` clean |
| BE-07-02 | BE | `@techblog/shared`: DTOs (BA 04 §2), fetch wrapper (10 s timeout, ProblemDetail → `UiError`, `describe()` map, BA 05 §3); MFE contract `mfe.ts` (`createMfeElement`, `MF_NAVIGATE`, `requestNavigate`) | BE-07-01; spec 06 contract stable | vitest: all DTO fixtures deserialize; every BA 05 §3 code maps to message + action; custom element mounts, re-renders on attribute change, unmounts |
| BE-07-03 | BE | `@techblog/ui`: shadcn/ui components (button, card, badge, input, table, tabs, skeleton, alert, separator, dialog) + lucide-react icons; `globals.css` with `@source` scans (all apps + packages) | BE-07-01 | typecheck clean; each component renders in vitest/jsdom |
| BE-07-04 | BE | shell: react-router 8.4.0 declarative; header/nav; cached per-remote loader (`<script type="module">` + `whenDefined`); `tb:navigate` listener → router; 404 route; service banner (`GET /api/v1/ops/summary`) | BE-07-02, BE-07-03 | route map of file 03 §2 resolves; deep-link reload works in dev; unknown path → 404; 1 cached loader promise per remote |
| BE-07-05 | BE | catalog MFE: `tb-catalog-app` (`view`, `source-key`, `q`, `page`, `size`); dashboard, source detail, article list/search | BE-07-02..04 | AC-06 + AC-07 pass; list state mirrors the URL; navigation only via `tb:navigate` |
| BE-07-06 | BE | reader MFE: `tb-reader-app` (`article-id`); react-markdown + remark-gfm + rehype-sanitize; asset rewrite `/api/v1/articles/{id}/assets/{file}`; raw link | BE-07-02..04 | AC-08 passes with network off (0 remote image URLs); 0 raw-HTML render paths |
| BE-07-07 | BE | admin MFE: `tb-admin-app` (`job-id`); jobs table newest-first + detail; buttons Crawl source now / Refresh stale / Cancel / Retry; 30 s poll while `pending`/`running` | BE-07-02..04; spec 06 commands | AC-05 + AC-09 + AC-10 pass; `JOB-DUPLICATE-ACTIVE` links the running job and keeps the button disabled |
| BE-07-08 | BE | Dev topology: 4 Vite dev servers (shell 5173; remotes 5181/5182/5183); shell proxies `/api` → `http://127.0.0.1:8090`; shell dev loads remote `/src/mfe.ts`; remote dev harness imports `@techblog/ui/globals.css` | BE-07-04..07 | each remote runs standalone on its port; shell shows all 6 routes against the running compose stack |
| BE-07-09 | BE | Accessibility pass (shell + remotes): 1 `<label>` per control, focus ring, contrast ≥4.5:1, `aria-label` on icon-only buttons, `<th scope>` in tables | BE-07-04..07 | keyboard walkthrough of all 6 routes + banner; axe scan reports 0 critical |
| DO-07-01 | DevOps | `deploy/Containerfile.web` + `deploy/nginx/web.conf`: build remotes then shell; copy `web/dist`; add `/mfe/` location (static only, no SPA fallback); CSP unchanged | BE-07-01 (re-run after BE-07-04..07) | image builds (G-D); serves at `127.0.0.1:8090` under Docker and Podman; `/mfe` miss → 404 |
| DO-07-02 | DevOps | Dist gate: gzip JS across `web/dist` ≤500 KB; 0 absolute origins (`https?://`), 0 `console` calls, 0 secret-like literals; record size | DO-07-01 | scans report 0 hits; size recorded in `deploy/releases.md`; localhost initial load ≤2 s (NFR-15) |
| DO-07-03 | DevOps | Manual ops runbook in `deploy/README.md` (commands below); rollback = previous web image digest (baseline 07 §3) | DO-07-01 | runbook executed top-to-bottom by the operator on a clean checkout |

## Manual runbook (no CI; operator runs everything)

| # | Command | Expect |
|---|---|---|
| 1 | `npm install` at `web/` | workspaces linked once; lockfile current |
| 2 | `npm run build` at `web/` | order catalog → reader → admin → shell; `web/dist` holds shell + `mfe/*` bundles |
| 3 | `npm run test` at `web/` | vitest green in every workspace (jsdom for DOM tests) |
| 4 | `docker compose build web` in `deploy/` | web image built (G-D) |
| 5 | `docker compose up -d` | nginx bound to `127.0.0.1:8090` |
| 6 | open `http://127.0.0.1:8090` | dashboard renders; `/articles`, `/articles/:id`, `/jobs`, `/jobs/:id` reachable; unknown path → 404 |

Gate note: G-A also accepts `npm ci` (lockfile-exact). Step 6 is the E4 exit smoke (manual).

## Dev workflow

| Item | Rule |
|---|---|
| Servers | `npm run dev:shell` (5173), `dev:catalog` (5181), `dev:reader` (5182), `dev:admin` (5183) |
| Proxy | shell dev proxies `/api` → `http://127.0.0.1:8090` (running compose stack) |
| Remote loading | dev shell loads `http://127.0.0.1:<port>/src/mfe.ts` instead of `/mfe/*.js` |
| Standalone | each remote dev entry imports `@techblog/ui/globals.css`; prod builds emit JS only |

## Ordering

Critical path: BE-07-01 → 02 → 03 → 04 → 05/06/07 (parallel) → 08 → 09. DO-07-01 can start after
01 and is re-run after 04-07; DO-07-02 after DO-07-01; DO-07-03 at E4 exit.

## Scope guard

Only `web/` and `deploy/` (Containerfile.web, nginx web.conf, README) change; BA and specs 01-06
stay untouched; the server contract (spec 06 file 03) changes only together with files 02/03 here.
