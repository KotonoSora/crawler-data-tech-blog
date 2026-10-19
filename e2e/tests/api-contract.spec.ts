import { expect, test } from '@playwright/test'

// Contract tests against the REAL stack (compose up + nginx at 127.0.0.1:8090).
// Run with: E2E_STACK=1 npm test -- --project=stack   (spec 06 file 03, BA 06 AC-11).
// These are skipped in the UI project because they need api-service.

test.describe('api-service public contract through nginx', () => {
  test.skip(!process.env.E2E_STACK, 'Set E2E_STACK=1 with `docker compose up -d` running.')

  test('GET /api/v1/sources returns the seeded catalog with the lag header (AC-06)', async ({
    request,
  }) => {
    const response = await request.get('/api/v1/sources')
    expect(response.status()).toBe(200)
    expect(response.headers()['x-projection-lag']).toMatch(/^\d+$/)

    const body = (await response.json()) as { items: Array<{ key: string; enabled: boolean }> }
    expect(body.items.length).toBe(20)
    expect(body.items.find((s) => s.key === 'doordash')?.enabled).toBe(false)
    expect(body.items.find((s) => s.key === 'cloudflare')?.enabled).toBe(true)
  })

  test('unknown source returns RFC 9457 ProblemDetail (BA 05 §3)', async ({ request }) => {
    const response = await request.get('/api/v1/sources/nope')
    expect(response.status()).toBe(404)
    expect(response.headers()['content-type']).toContain('application/problem+json')

    const problem = (await response.json()) as { type: string; status: number; detail: string }
    expect(problem.type).toBe('urn:tech-blog:error:CFG-SOURCE-NOT-FOUND')
    expect(problem.status).toBe(404)
    expect(problem.detail).toContain('nope')
  })

  test('article list validates size bounds (spec 06 §6)', async ({ request }) => {
    for (const size of ['0', '201']) {
      const response = await request.get(`/api/v1/articles?size=${size}`)
      expect(response.status()).toBe(400)
      const problem = (await response.json()) as { type: string }
      expect(problem.type).toBe('urn:tech-blog:error:CFG-INVALID-REQUEST')
    }
  })

  test('article list defaults to size 50 and is newest-first', async ({ request }) => {
    const response = await request.get('/api/v1/articles')
    expect(response.status()).toBe(200)
    const body = (await response.json()) as {
      items: Array<{ archivedAt: string | null }>
      page: number
      size: number
      total: number
    }
    expect(body.page).toBe(0)
    expect(body.size).toBe(50)
    expect(body.total).toBeGreaterThanOrEqual(0)
    const stamps = body.items.map((a) => a.archivedAt ?? '')
    expect([...stamps].sort().reverse()).toEqual(stamps)
  })

  test('unknown article returns ART-NOT-FOUND', async ({ request }) => {
    const response = await request.get('/api/v1/articles/0192f0c1-0000-7000-8000-000000000000')
    expect(response.status()).toBe(404)
    const problem = (await response.json()) as { type: string }
    expect(problem.type).toBe('urn:tech-blog:error:ART-NOT-FOUND')
  })

  test('POST /api/v1/crawl-jobs validates the request body', async ({ request }) => {
    const response = await request.post('/api/v1/crawl-jobs', {
      data: { jobType: 'nonsense' },
    })
    expect(response.status()).toBe(400)
    const problem = (await response.json()) as { type: string }
    expect(problem.type).toBe('urn:tech-blog:error:CFG-INVALID-REQUEST')
  })

  test('POST /api/v1/crawl-jobs on a disabled source returns JOB-INVALID-STATE', async ({
    request,
  }) => {
    const response = await request.post('/api/v1/crawl-jobs', {
      data: { sourceKeys: ['doordash'], jobType: 'incremental' },
    })
    expect(response.status()).toBe(409)
    const problem = (await response.json()) as { type: string }
    expect(problem.type).toBe('urn:tech-blog:error:JOB-INVALID-STATE')
  })

  test('GET /api/v1/ops/summary reports both services (spec 06 §3)', async ({ request }) => {
    const response = await request.get('/api/v1/ops/summary')
    expect(response.status()).toBe(200)
    const body = (await response.json()) as {
      checkedAt: string
      projectionLagSeconds: number
      services: Array<{ service: string; status: string }>
    }
    expect(body.projectionLagSeconds).toBeGreaterThanOrEqual(0)
    expect(body.services.map((s) => s.service)).toContain('api-service')
    expect(body.services.map((s) => s.service)).toContain('crawler-service')
  })

  test('health endpoints answer 200 on both Spring services (AC-11)', async ({ request }) => {
    for (const base of ['http://127.0.0.1:8081', 'http://127.0.0.1:8082']) {
      const live = await request.get(`${base}/health/liveness`)
      expect(live.status()).toBe(200)
      expect((await live.json()) as { status: string }).toMatchObject({ status: 'UP' })

      const ready = await request.get(`${base}/health/readiness`)
      expect(ready.status()).toBe(200)
      expect((await ready.json()) as { status: string }).toMatchObject({ status: 'UP' })
    }
  })

  test('the SPA shell boots from nginx and serves the MFE bundles', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('sources-page')).toBeVisible()

    for (const bundle of [
      '/mfe/catalog/tb-catalog.js',
      '/mfe/reader/tb-reader.js',
      '/mfe/admin/tb-admin.js',
    ]) {
      const response = await page.request.get(bundle)
      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('javascript')
    }
  })

  test('a missing MFE bundle is 404, never the SPA fallback (file 03 §1)', async ({ request }) => {
    const response = await request.get('/mfe/catalog/does-not-exist.js')
    expect(response.status()).toBe(404)
  })
})
