// Deterministic stub of the api-service contract (spec 06 file 03) used by the UI
// Playwright project. It is a TEST FIXTURE, never shipped and never imported by web/.
//
// Run: node support/stub-api.ts   (Node 24 strips the types natively)
// Control plane (not part of the product contract):
//   GET  /__test__/health          liveness for Playwright's webServer probe
//   POST /__test__/reset           restore the fixture set
//   POST /__test__/mode            {"mode":"error","code":"OPS-DEPENDENCY-DOWN","status":503}
//   GET  /__test__/requests        recorded requests (assert 300 ms debounce / abort)
import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'

const PORT = Number(process.env.STUB_PORT ?? 8099)

// ---------------------------------------------------------------------------
// Fixture types (mirror @techblog/shared/src/types.ts)
// ---------------------------------------------------------------------------

interface Source {
  key: string
  name: string
  enabled: boolean
  discoveryType: 'feed' | 'sitemap' | 'listing'
  articleCount: number
  archivedCount: number
  failedCount: number
  lastSuccessAt: string | null
  health: 'fresh' | 'stale' | 'broken'
  updatedAt: string
}

interface Article {
  id: string
  sourceKey: string
  title: string
  slug: string
  author: string | null
  publishedAt: string | null
  archivedAt: string | null
  status: 'discovered' | 'queued' | 'processing' | 'archived' | 'failed' | 'needs_review' | 'skipped'
  contentSha256: string
  contentMarkdown: string
  originalUrl: string
  sourceUrl: string
  fetchedAt: string
}

interface Job {
  id: string
  sourceKey: string
  jobType: 'backfill' | 'incremental'
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled'
  requestedAt: string
  startedAt: string | null
  finishedAt: string | null
  discoveredCount: number
  archivedCount: number
  skippedCount: number
  failedCount: number
}

interface Failure {
  articleId: string
  title: string
  failureCode: string
  failureReason: string
  attemptCount: number
  lastAttemptAt: string
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const CATALOG: Array<[string, string, Source['discoveryType'], boolean]> = [
  ['netflix-techblog', 'Netflix TechBlog', 'feed', true],
  ['uber-engineering', 'Uber Engineering', 'sitemap', true],
  ['meta-engineering', 'Meta Engineering', 'feed', true],
  ['google-research', 'Google Research', 'feed', true],
  ['linkedin-engineering', 'LinkedIn Engineering', 'listing', true],
  ['cloudflare', 'Cloudflare', 'feed', true],
  ['aws-architecture', 'AWS Architecture', 'feed', true],
  ['datadog', 'Datadog', 'sitemap', true],
  ['stripe', 'Stripe', 'feed', true],
  ['discord', 'Discord', 'listing', true],
  ['slack', 'Slack Engineering', 'feed', true],
  ['airbnb', 'Airbnb', 'feed', true],
  ['spotify', 'Spotify', 'feed', true],
  ['shopify', 'Shopify', 'sitemap', true],
  ['doordash', 'DoorDash', 'feed', false],
  ['grab', 'Grab', 'feed', true],
  ['lyft', 'Lyft', 'feed', true],
  ['github', 'GitHub', 'feed', true],
  ['dropbox', 'Dropbox', 'feed', true],
  ['pinterest', 'Pinterest', 'feed', true],
]

const MARKDOWN_CLOUDFLARE = `# How we moved 40 PB of logs

*by A. Engineer · 2026-09-30*

Cloudflare moves a **lot** of logs. This post explains the pipeline.

## Architecture

| Stage | Technology | Notes |
| --- | --- | --- |
| Ingest | QUIC | edge |
| Store | R2 | durable |

\`\`\`kotlin
fun main() {
    println("hello archive")
}
\`\`\`

![Pipeline diagram](assets/img-001-0a1b2c3d.png)

Read the [original announcement](https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/).

<script>window.__pwned = true</script>

---

Original: https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/
Source: Cloudflare
Fetched: 2026-10-01
`

const MARKDOWN_SLACK = `# Scaling Slack search

*by B. Writer · 2026-09-21*

Search at Slack is a distributed problem.

## Query path

1. Parse
2. Fan out
3. Merge

![Search topology](assets/img-001-ffee0011.png)

---

Original: https://slack.engineering/scaling-search/
Source: Slack Engineering
Fetched: 2026-10-02
`

const article = (
  id: string,
  sourceKey: string,
  title: string,
  slug: string,
  status: Article['status'],
  overrides: Partial<Article> = {},
): Article => ({
  id,
  sourceKey,
  title,
  slug,
  author: 'A. Engineer',
  publishedAt: '2026-09-30T12:00:00Z',
  archivedAt: status === 'archived' ? '2026-10-01T03:05:22Z' : null,
  status,
  contentSha256: '9f2c1d4e8a7b',
  contentMarkdown: MARKDOWN_CLOUDFLARE,
  originalUrl: `https://blog.cloudflare.com/${slug}/?utm_source=rss`,
  sourceUrl: 'https://blog.cloudflare.com/rss/',
  fetchedAt: '2026-10-01T03:05:20Z',
  ...overrides,
})

const A1 = '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341'
const A2 = '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e342'
const A3 = '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e343'
const A4 = '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e344'
const A5 = '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e345'

const J1 = '0192f0c9-1b77-7a2e-8c10-4d9e5b2a0011'
const J2 = '0192f0c9-1b77-7a2e-8c10-4d9e5b2a0012'
const J3 = '0192f0c9-1b77-7a2e-8c10-4d9e5b2a0013'

interface State {
  sources: Source[]
  articles: Article[]
  jobs: Job[]
  failures: Record<string, Failure[]>
  requests: string[]
  mode: { mode: 'ok' } | { mode: 'error'; code: string; status: number; detail?: string }
}

function fixture(): State {
  const now = '2026-10-19T09:20:00Z'
  const sources: Source[] = CATALOG.map(([key, name, discoveryType, enabled]) => {
    const owned = key === 'cloudflare' ? 3 : key === 'slack' ? 2 : 0
    const failed = key === 'cloudflare' ? 1 : 0
    const health: Source['health'] =
      key === 'cloudflare' ? 'fresh' : key === 'slack' ? 'stale' : enabled ? 'fresh' : 'broken'
    return {
      key,
      name,
      enabled,
      discoveryType,
      articleCount: owned + failed,
      archivedCount: owned,
      failedCount: failed,
      lastSuccessAt: owned > 0 ? '2026-10-19T03:12:44Z' : null,
      health,
      updatedAt: now,
    }
  })

  const articles: Article[] = [
    article(A1, 'cloudflare', 'How we moved 40 PB of logs', 'how-we-moved-40-pb-of-logs', 'archived'),
    article(A2, 'cloudflare', 'A tour of our edge network', 'a-tour-of-our-edge-network', 'archived', {
      contentMarkdown: MARKDOWN_CLOUDFLARE.replace('40 PB of logs', 'the edge network'),
      contentSha256: '1111111111aa',
    }),
    article(A3, 'cloudflare', 'Post-quantum TLS at the edge', 'post-quantum-tls-at-the-edge', 'archived', {
      contentMarkdown: MARKDOWN_CLOUDFLARE.replace('40 PB of logs', 'post-quantum TLS'),
      contentSha256: '2222222222bb',
    }),
    article(A4, 'cloudflare', 'Incident review: log pipeline stall', 'incident-review-log-pipeline', 'failed', {
      author: null,
      publishedAt: null,
      contentSha256: '',
      contentMarkdown: '',
    }),
    article(A5, 'slack', 'Scaling Slack search', 'scaling-slack-search', 'archived', {
      author: 'B. Writer',
      contentMarkdown: MARKDOWN_SLACK,
      contentSha256: '3333333333cc',
      originalUrl: 'https://slack.engineering/scaling-search/',
      sourceUrl: 'https://slack.engineering/feed',
      publishedAt: '2026-09-21T08:00:00Z',
    }),
  ]

  const jobs: Job[] = [
    {
      id: J3,
      sourceKey: 'slack',
      jobType: 'incremental',
      status: 'completed',
      requestedAt: '2026-10-19T08:00:00Z',
      startedAt: '2026-10-19T08:00:02Z',
      finishedAt: '2026-10-19T08:04:10Z',
      discoveredCount: 8,
      archivedCount: 2,
      skippedCount: 6,
      failedCount: 0,
    },
    {
      id: J2,
      sourceKey: 'cloudflare',
      jobType: 'backfill',
      status: 'running',
      requestedAt: '2026-10-19T07:00:00Z',
      startedAt: '2026-10-19T07:00:03Z',
      finishedAt: null,
      discoveredCount: 812,
      archivedCount: 640,
      skippedCount: 57,
      failedCount: 3,
    },
    {
      id: J1,
      sourceKey: 'cloudflare',
      jobType: 'backfill',
      status: 'cancelled',
      requestedAt: '2026-10-18T07:00:00Z',
      startedAt: '2026-10-18T07:00:01Z',
      finishedAt: '2026-10-18T07:12:00Z',
      discoveredCount: 120,
      archivedCount: 118,
      skippedCount: 1,
      failedCount: 1,
    },
  ]

  const failures: Record<string, Failure[]> = {
    [J2]: [
      {
        articleId: A4,
        title: 'Incident review: log pipeline stall',
        failureCode: 'FETCH-TIMEOUT',
        failureReason: 'read 30 s exceeded',
        attemptCount: 5,
        lastAttemptAt: '2026-10-19T04:11:02Z',
      },
    ],
    [J1]: [],
    [J3]: [],
  }

  return { sources, articles, jobs, failures, requests: [], mode: { mode: 'ok' } }
}

let state: State = fixture()

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function json(res: ServerResponse, status: number, body: unknown, headers: Record<string, string> = {}) {
  const payload = JSON.stringify(body)
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'X-Projection-Lag': '3',
    'Cache-Control': 'no-store',
    ...headers,
  })
  res.end(payload)
}

function problem(
  res: ServerResponse,
  status: number,
  code: string,
  title: string,
  detail: string,
  instance: string,
  extensions: Record<string, unknown> = {},
) {
  json(
    res,
    status,
    { type: `urn:tech-blog:error:${code}`, title, status, detail, instance, code, ...extensions },
    { 'Content-Type': 'application/problem+json; charset=utf-8' },
  )
}

function summary(a: Article) {
  return {
    id: a.id,
    sourceKey: a.sourceKey,
    title: a.title,
    slug: a.slug,
    author: a.author,
    publishedAt: a.publishedAt,
    archivedAt: a.archivedAt,
    status: a.status,
    contentSha256: a.contentSha256,
  }
}

function detail(a: Article) {
  return {
    ...summary(a),
    contentMarkdown: a.contentMarkdown,
    assetBasePath: `/api/v1/articles/${a.id}/assets`,
    originalUrl: a.originalUrl,
    sourceUrl: a.sourceUrl,
    fetchedAt: a.fetchedAt,
  }
}

function pageOf<T>(items: T[], url: URL, defaultSize = 50) {
  const page = Math.max(0, Number(url.searchParams.get('page') ?? '0') || 0)
  const size = Math.min(200, Math.max(1, Number(url.searchParams.get('size') ?? String(defaultSize)) || defaultSize))
  return {
    items: items.slice(page * size, page * size + size),
    page,
    size,
    total: items.length,
  }
}

async function body(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  if (chunks.length === 0) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as Record<string, unknown>
}

// 1x1 PNG: enough for the reader's <img> assertions without network access.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

// ---------------------------------------------------------------------------
// Router
// ---------------------------------------------------------------------------

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`)
  const path = url.pathname
  const method = req.method ?? 'GET'

  // ---- control plane ------------------------------------------------------
  if (path === '/__test__/health') return json(res, 200, { status: 'UP' })
  if (path === '/__test__/reset' && method === 'POST') {
    state = fixture()
    return json(res, 200, { status: 'reset' })
  }
  if (path === '/__test__/requests') return json(res, 200, { requests: state.requests })
  if (path === '/__test__/mode' && method === 'POST') {
    const input = await body(req)
    state.mode =
      input.mode === 'error'
        ? {
            mode: 'error',
            code: String(input.code ?? 'OPS-DEPENDENCY-DOWN'),
            status: Number(input.status ?? 503),
            detail: input.detail === undefined ? undefined : String(input.detail),
          }
        : { mode: 'ok' }
    return json(res, 200, { mode: state.mode })
  }

  if (state.mode.mode === 'error') {
    return problem(
      res,
      state.mode.status,
      state.mode.code,
      state.mode.code === 'OPS-DEPENDENCY-DOWN' ? 'Dependency unavailable' : state.mode.code,
      state.mode.detail ?? 'crawler-service did not answer within 2 s',
      path,
    )
  }

  state.requests.push(`${method} ${url.pathname}${url.search}`)

  // ---- sources ------------------------------------------------------------
  if (path === '/api/v1/sources' && method === 'GET') {
    return json(res, 200, { items: [...state.sources].sort((a, b) => a.key.localeCompare(b.key)) })
  }

  const sourceMatch = path.match(/^\/api\/v1\/sources\/([^/]+)$/)
  if (sourceMatch) {
    const key = decodeURIComponent(sourceMatch[1])
    const source = state.sources.find((s) => s.key === key)
    if (!source) {
      return problem(
        res,
        404,
        'CFG-SOURCE-NOT-FOUND',
        'Unknown source',
        `No source with key '${key}'.`,
        path,
      )
    }
    if (method === 'GET') return json(res, 200, source)
    if (method === 'PATCH') {
      const input = await body(req)
      if (typeof input.enabled !== 'boolean') {
        return problem(res, 400, 'CFG-INVALID-REQUEST', 'Invalid request', 'enabled must be a boolean.', path)
      }
      source.enabled = input.enabled
      source.updatedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
      return json(res, 200, source)
    }
  }

  // ---- articles -----------------------------------------------------------
  if (path === '/api/v1/articles' && method === 'GET') {
    const q = (url.searchParams.get('q') ?? '').trim().toLowerCase()
    const source = url.searchParams.get('source') ?? ''
    if (q.length > 200) {
      return problem(res, 400, 'CFG-INVALID-REQUEST', 'Invalid request', 'q must be <=200 chars.', path)
    }
    const filtered = state.articles
      .filter((a) => (source === '' ? true : a.sourceKey === source))
      .filter((a) => (q === '' ? true : a.title.toLowerCase().includes(q)))
      .sort((a, b) => (b.archivedAt ?? '').localeCompare(a.archivedAt ?? ''))
    return json(res, 200, pageOf(filtered.map(summary), url))
  }

  const articleMatch = path.match(/^\/api\/v1\/articles\/([^/]+)(\/content|\/assets\/([^/]+))?$/)
  if (articleMatch) {
    const id = decodeURIComponent(articleMatch[1])
    const article = state.articles.find((a) => a.id === id)
    if (!article) {
      return problem(res, 404, 'ART-NOT-FOUND', 'Article not found', `No article with id '${id}'.`, path)
    }
    if (articleMatch[2] === '/content') {
      const text = article.contentMarkdown
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'no-store',
      })
      return res.end(text)
    }
    if (articleMatch[2]?.startsWith('/assets/')) {
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': PNG.length,
        'Cache-Control': 'private, max-age=86400',
        ETag: `"${article.contentSha256 || 'fixture'}"`,
      })
      return res.end(PNG)
    }
    if (method === 'GET') return json(res, 200, detail(article))
  }

  const retryMatch = path.match(/^\/api\/v1\/articles\/([^/]+)\/retry$/)
  if (retryMatch && method === 'POST') {
    const article = state.articles.find((a) => a.id === decodeURIComponent(retryMatch[1]))
    if (!article) {
      return problem(res, 404, 'ART-NOT-FOUND', 'Article not found', 'Article is not archived.', path)
    }
    if (article.status !== 'failed' && article.status !== 'needs_review') {
      return problem(
        res,
        409,
        'JOB-INVALID-STATE',
        'Invalid article state',
        `Article '${article.id}' is '${article.status}'; retry is not allowed.`,
        path,
      )
    }
    article.status = 'queued'
    return json(res, 202, summary(article))
  }

  // ---- jobs ---------------------------------------------------------------
  if (path === '/api/v1/jobs' && method === 'GET') {
    const newestFirst = [...state.jobs].sort((a, b) => b.requestedAt.localeCompare(a.requestedAt))
    return json(res, 200, pageOf(newestFirst, url))
  }

  const failuresMatch = path.match(/^\/api\/v1\/jobs\/([^/]+)\/failures$/)
  if (failuresMatch) {
    const id = decodeURIComponent(failuresMatch[1])
    if (!state.jobs.some((j) => j.id === id)) {
      return problem(res, 404, 'JOB-NOT-FOUND', 'Job not found', `No job with id '${id}'.`, path)
    }
    return json(res, 200, pageOf(state.failures[id] ?? [], url))
  }

  const jobMatch = path.match(/^\/api\/v1\/jobs\/([^/]+)$/)
  if (jobMatch) {
    const job = state.jobs.find((j) => j.id === decodeURIComponent(jobMatch[1]))
    if (!job) {
      return problem(res, 404, 'JOB-NOT-FOUND', 'Job not found', 'Refresh the jobs list.', path)
    }
    if (method === 'GET') return json(res, 200, job)
  }

  if (path === '/api/v1/crawl-jobs' && method === 'POST') {
    const input = await body(req)
    const jobType = input.jobType
    if (jobType !== 'backfill' && jobType !== 'incremental') {
      return problem(res, 400, 'CFG-INVALID-REQUEST', 'Invalid request', 'jobType must be backfill|incremental.', path)
    }
    const keys = Array.isArray(input.sourceKeys)
      ? (input.sourceKeys as unknown[]).map(String)
      : input.all === true
        ? state.sources.filter((s) => s.enabled).map((s) => s.key)
        : []
    if (keys.length === 0) {
      return problem(res, 400, 'CFG-INVALID-REQUEST', 'Invalid request', 'Provide sourceKeys or all:true.', path)
    }
    const created: Job[] = []
    for (const key of keys) {
      const source = state.sources.find((s) => s.key === key)
      if (!source) {
        return problem(res, 404, 'CFG-SOURCE-NOT-FOUND', 'Unknown source', `No source with key '${key}'.`, path)
      }
      if (!source.enabled) {
        return problem(res, 409, 'JOB-INVALID-STATE', 'Invalid job state', `Source '${key}' is disabled.`, path)
      }
      const active = state.jobs.find(
        (j) => j.sourceKey === key && (j.status === 'pending' || j.status === 'running'),
      )
      if (active) {
        return problem(
          res,
          409,
          'JOB-DUPLICATE-ACTIVE',
          'Job already active',
          `Source '${key}' has an active job (${active.id}).`,
          path,
          { activeJobId: active.id },
        )
      }
      const job: Job = {
        id: `0192f0c9-1b77-7a2e-8c10-${String(state.jobs.length + 1).padStart(12, '0')}`,
        sourceKey: key,
        jobType,
        status: 'pending',
        // Fixed, monotonically increasing timestamps keep newest-first assertions stable.
        requestedAt: `2026-10-19T10:${String(state.jobs.length).padStart(2, '0')}:00Z`,
        startedAt: null,
        finishedAt: null,
        discoveredCount: 0,
        archivedCount: 0,
        skippedCount: 0,
        failedCount: 0,
      }
      state.jobs.push(job)
      state.failures[job.id] = []
      created.push(job)
    }
    return json(res, 202, { items: created })
  }

  const cancelMatch = path.match(/^\/api\/v1\/crawl-jobs\/([^/]+)\/cancel$/)
  if (cancelMatch && method === 'POST') {
    const job = state.jobs.find((j) => j.id === decodeURIComponent(cancelMatch[1]))
    if (!job) {
      return problem(res, 404, 'JOB-NOT-FOUND', 'Job not found', 'Refresh the jobs list.', path)
    }
    if (job.status === 'completed' || job.status === 'failed' || job.status === 'cancelled') {
      return problem(
        res,
        409,
        'JOB-INVALID-STATE',
        'Invalid job state',
        `Job '${job.id}' is '${job.status}'; cancel is not allowed.`,
        path,
      )
    }
    job.status = 'cancelled'
    job.finishedAt = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
    return json(res, 202, job)
  }

  // ---- ops ----------------------------------------------------------------
  if (path === '/api/v1/ops/summary' && method === 'GET') {
    return json(res, 200, {
      checkedAt: '2026-10-19T09:20:05Z',
      projectionLagSeconds: 3,
      services: [
        {
          service: 'api-service',
          status: 'UP',
          checkedAt: '2026-10-19T09:20:05Z',
          details: ['api_db: UP', 'redis: UP', 'consumer: api-projections, lag 3 s'],
        },
        {
          service: 'crawler-service',
          status: 'UP',
          checkedAt: '2026-10-19T09:20:05Z',
          details: ['internal-api: UP 14 ms'],
        },
      ],
    })
  }

  return problem(res, 404, 'UI-UNKNOWN', 'Not found', `No stub route for ${method} ${path}.`, path)
})

server.listen(PORT, '127.0.0.1', () => {
  process.stdout.write(`stub-api listening on http://127.0.0.1:${PORT}\n`)
})
