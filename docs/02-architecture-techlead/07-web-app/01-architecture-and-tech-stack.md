# 01 — Architecture and Tech Stack

The web deployable is a microfrontend (MFE) composition: one shell hosts routing and loads three
independently built remotes as same-origin ES module bundles. This file is the authoritative web
architecture for spec 07.

DEVIATION FLAGGED (2026-10-19): single React SPA → microfrontends (user mandate 2026-10-19; per
micro-frontends.org, martinfowler.com/articles/micro-frontends.html, microfrontend.dev,
microfrontends.com). Budget: +1 monorepo layer (2 packages), 3 remote bundles, 0 new services,
0 new images. React stays 19.3.1; operations stay manual (file 04).

## 1. Topology

```
browser → http://127.0.0.1:8090 (nginx web image, one origin, CSP 'self')
├─ /                          shell (apps/shell): routing, header/nav, 404
├─ /mfe/catalog/tb-catalog.js  <tb-catalog-app>   /, /sources/:key, /articles
├─ /mfe/reader/tb-reader.js    <tb-reader-app>    /articles/:id
├─ /mfe/admin/tb-admin.js      <tb-admin-app>     /jobs, /jobs/:id
└─ /api/                       api-service:8080 (proxy; spec 06)
```

| # | Runtime behaviour |
|---|---|
| 1 | shell matches the route (react-router 8.4.0, declarative mode) and renders header/nav |
| 2 | a per-remote cached loader injects `<script type="module">` (prod: `/mfe/...`; dev: the remote's Vite server) |
| 3 | loader awaits `customElements.whenDefined(tag)` before the element mounts |
| 4 | state flows down as HTML attributes only; remotes never read the router |
| 5 | remotes emit `tb:navigate` {to, replace}; the shell maps it to router navigation |

Rules: 0 cross-remote imports; each remote bundles its own React 19.3.1; 0 shared runtime objects
between remotes; elements render into light DOM, so the one shell stylesheet styles every remote.

## 2. Component inventory

| Workspace (npm name) | Kind | Owns | Artifact |
|---|---|---|---|
| apps/shell (`@techblog/shell`) | host | routing, header/nav, remote loader, 404, service banner | `/`: index.html + the single stylesheet |
| apps/catalog (`@techblog/catalog`) | remote | dashboard `/`, source detail `/sources/:key`, article list `/articles` | /mfe/catalog/tb-catalog.js |
| apps/reader (`@techblog/reader`) | remote | reader `/articles/:id` (Markdown + raw link) | /mfe/reader/tb-reader.js |
| apps/admin (`@techblog/admin`) | remote | jobs `/jobs`, job detail `/jobs/:id`, manual triggers | /mfe/admin/tb-admin.js |
| packages/ui (`@techblog/ui`) | library | shadcn/ui design system (ui.shadcn.com), `globals.css` (Tailwind v4 `@source` scans all apps + packages) | build-time import |
| packages/shared (`@techblog/shared`) | library | typed API client, DTOs, MFE contract (`mfe.ts`) | build-time import |

## 3. Why Web Components + runtime ESM

| Alternative | Rejected because |
|---|---|
| build-time integration (one bundle) | any change rebuilds and redeploys everything; no independent delivery |
| iframes | separate documents; history/styling integration and a11y cost |
| Module Federation (build plugin) | plugin + shared-runtime negotiation for 3 same-origin remotes; we intentionally share no runtime |
| JS-callback composition (shell passes live objects into a remote) | couples lifecycle/state to shell internals; DOM attributes + events are a simpler, testable contract |
| SSR (Next.js) | no server-render/SEO need; adds a Node runtime and a 4th image |

Chosen for: independent deployables (one bundle per remote), same-origin local VPS (no CDN, no CORS,
no import maps), zero extra build plugins (custom elements + native ESM are platform features); it
follows micro-frontends.org principles: technology-agnostic composition, isolated runtime state,
independent deployment, the bundle is the deployment unit.

## 4. Stack pins (VERIFIED 2026-10-19, npm registry; exact, no ranges)

| Area | Package | Pin |
|---|---|---|
| Runtime | react / react-dom (each app bundles its own) | 19.3.1 |
| Routing | react-router (shell) | 8.4.0 |
| Build | vite | 8.3.4 |
| Build | @vitejs/plugin-react (peer vite ^8.3.2) | 6.1.2 |
| Language | typescript | 5.9.3 |
| Test | vitest / @testing-library/react / jsdom | 5.0.5 / 16.3.3 / 30.1.3 |
| Types | @types/react / @types/react-dom | 19.3.0 |
| Styling | tailwindcss / @tailwindcss/vite / tw-animate-css | 4.3.3 / 4.3.3 / 1.4.0 |
| UI kit | class-variance-authority / clsx / tailwind-merge / lucide-react | 0.7.1 / 2.1.1 / 3.7.0 / 1.59.0 |
| UI kit | @radix-ui/react-slot / tabs / dialog / separator | 1.5.0 / 1.2.1 / 1.3.1 / 1.2.0 |
| Reader | react-markdown / remark-gfm / rehype-sanitize | 10.1.0 / 4.0.1 / 6.0.0 |
| Toolchain | node | 24 (`engines >=24 <25`) |
| Runtime image | nginx:1.29 | baseline 04 |

`web/package-lock.json` is committed; `npm install` runs once at `web/` (`npm ci` is the
lockfile-exact equivalent). No CDNs: 100% of code, styles and fonts are self-hosted/same-origin.

## 5. Build and run

| Item | Rule |
|---|---|
| Build order | catalog → reader → admin → shell (`npm run build` at `web/`) |
| Output | `web/dist/`: shell at `/`; remote bundles at `/mfe/<app>/tb-<app>.js`; remotes emit JS only |
| Stylesheet | one Tailwind v4 stylesheet from the shell build; remote dev harnesses import it for standalone dev |
| Image | deploy/Containerfile.web: node:24 build → nginx:1.29 runtime (baseline 04) |
| Dev servers | shell 5173; catalog 5181; reader 5182; admin 5183; shell proxies `/api` → `http://127.0.0.1:8090` |
| Budget | total gzip JS across `web/dist` ≤500 KB; initial load ≤2 s on localhost (NFR-15) |
| Ops | manual only: no CI/CD and no cron for the web build/deploy; the operator runs every command (file 04) |
