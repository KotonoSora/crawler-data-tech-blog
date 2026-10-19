# 01 — Source Discovery: Architecture and Tech Stack

Scope: the discovery subsystem inside `crawler-service`. Input = one source's registry config;
output = normalized candidate canonical URLs enqueued for fetch (spec 02). Discovery writes no
article content and does not reimplement politeness (fetch, spec 02).

## 1. Components

| Component | Package | Responsibility | Tech (pinned) |
|---|---|---|---|
| SourceRegistry | config | load `source` rows, parse/validate `discovery_config` into a Kotlin data class, resolve `sourceKey` -> config | Spring Data JPA, Jackson 3 `tools.jackson` + Kotlin module |
| DiscoveryOrchestrator | domain | run lifecycle, fallback chain, per-run counters, chosen path | Spring worker + Redis `SET NX` lock |
| FeedDiscoverer | domain | RSS 2.0 / Atom window -> candidates | ROME 2.1.0 |
| SitemapDiscoverer | domain | sitemap index -> child sitemaps -> URL sets | crawler-commons 1.4.0 |
| ListingDiscoverer | domain | HTML listing pages -> article links via CSS selectors | jsoup 1.21.2 |
| CandidateNormalizer | domain | normalize, scheme check, in-run dedupe | JDK `URI` |
| DiscoveryApi | api | `POST /internal/v1/jobs` (job creation owned by spec 04); job/source reads | Spring MVC + Bean Validation |

Jackson 3 note: register the `tools.jackson` Kotlin module at boot so data-class defaults fill
omitted JSON fields (baseline 02).

## 2. Fallback order per source

Order: feed -> sitemap -> listing. A path runs only when configured for that source; a path that
fails is skipped for the run, not retried in place.

| # | Path | Backfill behaviour | Incremental behaviour | Failure code |
|---|---|---|---|---|
| 1 | feed | read window first; backfill continues to the next path when the window cannot cover history (BR-14) | primary: items newer than last success | DISC-FEED-PARSE-FAILED after 2 attempts |
| 2 | sitemap | page child sitemaps until exhaustion; <=100 child sitemaps per index | lastmod newer than last success | DISC-SITEMAP-MISSING when 404 and a listing is configured |
| 3 | listing | paginate until 0 new links; <=500 pages per run | pages 1..N until 0 new links | DISC-LISTING-SELECTOR-BROKEN when 0 new links twice |

Discovery fetches share the per-host gate with article fetches: 1 request per host, >=2000 ms
(Medium-family >=3000 ms), 4 global hosts.

## 3. Candidate normalization

| Rule | Example | Result |
|---|---|---|
| strip fragment | `https://blog.example/post#comments` | `https://blog.example/post` |
| strip tracking params | `?source=rss-9f21`, `utm_*`, `fbclid` | removed; functional params kept (`?p=123` stays) |
| resolve relative | `<a href="/post/1">` on a listing page | absolute URL against the listing base |
| https only | `http://blog.example/post` | upgraded to `https` when the host is allowlisted; otherwise dropped |
| drop non-fetch schemes | `mailto:`, `tel:`, `javascript:` | dropped, logged with `outcome=skipped` |
| in-run dedupe | same canonical URL twice | one candidate |
| cross-run dedupe | canonical URL already in `article` | insert ignored (`uq_article_canonical_url`) |

Identity is the normalized canonical URL with fragments and tracking params stripped (BR-06);
normalization runs before dedupe or persistence.

## 4. Discovery run lifecycle

DEVIATION CARRIED (2026-10-19): runs start only from operator actions; no scheduled runs
(first use: 04-crawl-orchestration file 01).

| # | Step | Outcome / code |
|---|---|---|
| 1 | Operator triggers a run (UI or REST -> api-service -> `POST /internal/v1/jobs`) | `crawl_job` row `pending`; disabled source -> 409 JOB-INVALID-STATE; active job -> 409 JOB-DUPLICATE-ACTIVE |
| 2 | worker claims the job under a Redis lock | `status=running`, lease 600 s |
| 3 | SourceRegistry resolves config | unknown key -> CFG-SOURCE-NOT-FOUND |
| 4 | robots check per host before any discovery fetch | disallowed URL -> DISC-ROBOTS-DENIED, 0 fetches |
| 5 | fallback chain executes page by page | every page logged + counted; codes per section 2 |
| 6 | normalize + dedupe | `article` insert-or-ignore; counters updated |
| 7 | enqueue candidates into per-host fetch queues | Redis queue per host; 4 hosts global |
| 8 | finish | counters frozen; `succeeded` / `failed`; `job.updated` event |

## 5. Per-source config model

`source.discovery_config` (jsonb) example:

```json
{
  "feedUrl": "https://blog.cloudflare.com/rss/",
  "sitemapUrl": null,
  "listingUrl": null,
  "listingSelectors": { "itemLink": "a.post-link", "nextPage": "a.pagination-next" },
  "includePathPatterns": ["/blog/"],
  "trackingParams": ["source", "utm_source", "utm_medium", "utm_campaign", "fbclid"],
  "maxPagesPerRun": 500,
  "sitemapChildCap": 100
}
```

| Field | Type | Required | Default | Validation |
|---|---|---|---|---|
| feedUrl / sitemapUrl / listingUrl | string (https URL) | >=1 of the 3 | null | https scheme, host present |
| listingSelectors | object `itemLink`, `nextPage` | yes when listingUrl set | null | non-empty CSS strings |
| includePathPatterns | array of path prefixes | no | `[]` (all paths) | each starts with `/` |
| trackingParams | array | no | `["source","utm_source","utm_medium","utm_campaign","fbclid"]` | lowercase tokens |
| maxPagesPerRun | integer | no | 500 | 1..500 |
| sitemapChildCap | integer | no | 100 | 1..100 |

`politeness_profile` is a table column (`default` / `medium`), not config: it drives the >=3000 ms
delay for Medium-family hosts. Config is data, not code: a broken selector is fixed by an `UPDATE`
+ re-run, not a deploy.

## 6. Rejected alternatives

| Option | Why rejected |
|---|---|
| feed-only discovery | feeds are windows (Medium ~10 items, Slack 8, Spotify 5); backfill impossible (BR-14) |
| sitemap-only | LinkedIn and Discord expose no usable sitemap on probe (2026-10-19) |
| third-party crawl APIs | external dependency + cost; out of scope (BA 01 section 4) |
| headless browser per source | +1 image and >=500 MB RAM for 19 sources whose HTML is server-rendered |
| persist raw discovery pages in DB | BR-08: raw HTML is transient |
