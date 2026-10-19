# 02 — Database Schema Design (Client-Side Data Model)

The web deployable owns no server-side database: nginx serves static files and 100% of data comes
from the api-service contract (BR-16). The TL file set fixes this file name (AGENTS.md), so this
file freezes the client-side data model instead: per-MFE state ownership and the composition
contract.

DEVIATION CARRIED (2026-10-19): single SPA → microfrontends (file 01). Client state is split per
MFE; there is no app-wide store.

## 1. State ownership (no cross-MFE stores)

| Owner | Owns in tab memory | Never owns |
|---|---|---|
| shell | route + URL state, per-remote loader cache (1 promise each), header/nav state, service banner | article/job/source payload data |
| catalog | source list, article list state (`q`/`source`/`page`/`size`), in-flight enable/disable | job state; reader render state |
| reader | current ArticleDetail + render state | article list; jobs |
| admin | jobs list/detail, trigger button state | source/article read models |
| `@techblog/shared` | nothing at runtime: types, fetch wrapper, contract helpers (stateless) | module-level mutable state |

Rules: 0 shared Redux-like stores; 0 cross-MFE imports; data crosses MFEs only by re-fetching from
`/api/v1`; the only live channels are attributes down and `tb:navigate` up (section 3). DTO field
names live once in `@techblog/shared/src/types.ts` (mirrors BA 04 §2); spec 06 §2 is normative for
the wire format.

## 2. Persistence

| Rule | Detail |
|---|---|
| Server-side | none: the web image is static files + nginx config |
| Browser storage | none: 0 localStorage, 0 sessionStorage, 0 cookies, 0 IndexedDB (the old `tb:lastSourceFilter` / `tb:listPageSize` keys are removed) |
| URL | the only retained state: route + list query (`q`, `source`, `page`, `size`) — reload-safe, bookmarkable |
| In-memory caches | per-MFE TTL caches only; everything dies on reload/route change |

| Owner | Cache entry | TTL |
|---|---|---|
| catalog | `['sources']` | 60 s |
| catalog | `['articles', q, source, page, size]` | 60 s |
| reader | `['article', id]` | 300 s |
| admin | `['jobs', page]` | 60 s; polls bypass; polling stops at terminal status |
| admin | `['job', id]` | 0 s (never cached; 30 s poll while `pending`/`running`) |

An expired entry is fetched again on read; a poll never stacks (new poll waits for the previous
response); a full reload clears all entries.

## 3. Composition contract (frozen)

| Element | Attribute | Set from | Semantics |
|---|---|---|---|
| tb-catalog-app | `view` | route | `dashboard` (`/`), `source` (`/sources/:key`), `articles` (`/articles`) |
| tb-catalog-app | `source-key` | route param or URL query | source identity/filter; `^[a-z0-9][a-z0-9-]{0,63}$` |
| tb-catalog-app | `q`, `page`, `size` | URL query | article search state; `size` optional, default 50, max 200 |
| tb-reader-app | `article-id` | route param | article UUID |
| tb-admin-app | `job-id` | route param | job UUID; absent on `/jobs` (list view) |

Attributes are the only state channel into a remote; unknown attributes are ignored. The only
channel up is the navigation event:

```ts
// @techblog/shared (mfe.ts)
requestNavigate(el, '/jobs?page=1', { replace: false })
// → CustomEvent('tb:navigate', { detail: { to, replace }, bubbles: true, composed: true })
```

| Rule | Detail |
|---|---|
| `to` | app-root-relative path incl. query; must start with `/` |
| `replace` | optional boolean, default `false`; mapped by the shell to router navigation |
| Routing | remotes never call history/router APIs; the shell listens at its root |
| Unknown target | shell renders its 404 route |

| Remote | Element tag | Prod bundle | Dev module |
|---|---|---|---|
| catalog | `<tb-catalog-app>` | `/mfe/catalog/tb-catalog.js` | `http://127.0.0.1:5181/src/mfe.ts` |
| reader | `<tb-reader-app>` | `/mfe/reader/tb-reader.js` | `http://127.0.0.1:5182/src/mfe.ts` |
| admin | `<tb-admin-app>` | `/mfe/admin/tb-admin.js` | `http://127.0.0.1:5183/src/mfe.ts` |

Loader rule: exactly 1 cached promise per remote; `customElements.whenDefined(tag)` gates mount; a
failed load is not cached and renders the shell's error state with retry.

## 4. Contract change rules

| Rule | Detail |
|---|---|
| Contract change | attribute/event/URL changes land in files 02 + 03 and all remotes in one release |
| Remote-only change | a remote ships its own bundle; the shell is untouched while the contract holds |
| Verification | contract helpers unit-tested in `@techblog/shared`; each remote loads standalone in its dev harness |
