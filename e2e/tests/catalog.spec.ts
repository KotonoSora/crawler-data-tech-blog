import { expect, test } from '@playwright/test'

import { clearStubError, forceStubError, resetStub } from '../support/env'

// Dashboard + source detail + article list (catalog MFE). BA 06 AC-06, AC-07; spec 07
// file 03 §2/§4. State lives in the URL query only; remotes never read the router.

test.beforeEach(async ({ request }) => {
  await resetStub(request)
  await clearStubError(request)
})

test('dashboard lists every source with counters and a health badge (AC-06)', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('sources-page')).toBeVisible()

  const cards = page.getByTestId('source-card')
  await expect(cards).toHaveCount(20)

  const cloudflare = page.getByTestId('source-card').filter({ hasText: 'Cloudflare' })
  await expect(cloudflare.getByTestId('source-health')).toHaveText('fresh')
  await expect(cloudflare.getByTestId('source-counters')).toContainText('3 archived')
  await expect(cloudflare.getByTestId('source-counters')).toContainText('1 failed')
  await expect(cloudflare.getByTestId('source-last-success')).toContainText('2026-10-19')

  const doordash = page.getByTestId('source-card').filter({ hasText: 'DoorDash' })
  await expect(doordash.getByTestId('source-disabled')).toBeVisible()
  await expect(doordash.getByTestId('source-crawl')).toBeDisabled()

  await expect(page.getByTestId('sources-summary')).toContainText('19 enabled')
})

test('dashboard flags stale sources and offers Refresh stale (US-12)', async ({ page }) => {
  await page.goto('/')
  const refresh = page.getByTestId('refresh-stale')
  await expect(refresh).toBeEnabled()
  await expect(refresh).toContainText('1')

  await refresh.click()
  await expect(page.getByTestId('catalog-notice')).toContainText('incremental job')
})

test('Refresh stale targets only enabled stale sources (US-12)', async ({ page }) => {
  await page.goto('/')
  // The fixture has exactly one stale source (Slack); DoorDash is broken but disabled.
  await expect(page.getByTestId('refresh-stale')).toHaveText(/1/)
  await expect(page.getByTestId('refresh-stale')).toBeEnabled()

  await page.getByTestId('refresh-stale').click()
  await expect(page.getByTestId('catalog-notice')).toContainText('incremental job')
  await expect(page.getByTestId('catalog-notice')).toContainText('1')
})

test('enable/disable a source from the dashboard (AC-04)', async ({ page }) => {
  await page.goto('/')
  const doordash = page.getByTestId('source-card').filter({ hasText: 'DoorDash' })

  await doordash.getByTestId('source-toggle').click()
  await expect(page.getByTestId('catalog-notice')).toContainText('DoorDash enabled')
  await expect(doordash.getByTestId('source-disabled')).toHaveCount(0)
})

test('source detail shows header counters and its article table', async ({ page }) => {
  await page.goto('/sources/cloudflare')
  await expect(page.getByTestId('source-detail')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cloudflare')
  await expect(page.getByTestId('source-detail-counters')).toContainText('3 archived')
  await expect(page.getByTestId('article-row')).toHaveCount(4)
  await expect(page.getByTestId('articles-pager')).toContainText('4 items')
})

test('unknown source renders the CFG-SOURCE-NOT-FOUND guidance', async ({ page }) => {
  await page.goto('/sources/nope')
  const alert = page.getByTestId('catalog-error')
  await expect(alert).toBeVisible()
  await expect(alert).toContainText('Unknown source')
  await expect(alert.getByRole('link', { name: 'sources list' })).toHaveAttribute('href', '/')
})

test('article list searches by title and keeps q in the URL (AC-07)', async ({ page }) => {
  await page.goto('/articles')
  await expect(page.getByTestId('articles-page')).toBeVisible()
  await expect(page.getByTestId('article-row')).toHaveCount(5)

  const search = page.getByTestId('article-search')
  await search.fill('logs')
  await expect(page).toHaveURL(/[?&]q=logs/)
  await expect(page.getByTestId('article-row')).toHaveCount(1)
  await expect(page.getByTestId('article-row')).toContainText('How we moved 40 PB of logs')
})

test('article list filters by source and paginates with size (AC-07)', async ({ page }) => {
  await page.goto('/articles?source=cloudflare&size=2')
  await expect(page.getByTestId('article-source-filter')).toHaveValue('cloudflare')
  await expect(page.getByTestId('article-row')).toHaveCount(2)
  await expect(page.getByTestId('articles-pager')).toContainText('Page 1 of 2')

  await page.getByRole('button', { name: 'Next' }).click()
  await expect(page).toHaveURL(/page=1/)
  await expect(page.getByTestId('articles-pager')).toContainText('Page 2 of 2')
})

test('debounces search by 300 ms and only sends the last query', async ({ page, request }) => {
  await page.goto('/articles')
  const search = page.getByTestId('article-search')
  await search.fill('a')
  await search.fill('a ')
  await search.fill('a t')
  await search.fill('a to')
  await page.waitForTimeout(900)
  await expect(page).toHaveURL(/q=a\+to|q=a%20to/)

  const recorded = await request.get('http://127.0.0.1:8099/__test__/requests')
  const body = (await recorded.json()) as { requests: string[] }
  const searches = body.requests.filter((r) => r.startsWith('GET /api/v1/articles'))
  const queries = searches.map((r) => new URL(r.slice(4), 'http://stub').searchParams.get('q'))
  // Only the final debounced value is ever requested — no 'a', 'a ', 'a t' round trips.
  expect(queries.filter((q) => q !== null && q !== 'a to')).toHaveLength(0)
  expect(queries.at(-1)).toBe('a to')
})

test('empty search result renders an explicit empty state', async ({ page }) => {
  await page.goto('/articles?q=zzzz-no-match')
  await expect(page.getByTestId('articles-empty')).toContainText('No articles found')
})

test('renders a ProblemDetail code and action when the API fails', async ({ page, request }) => {
  await forceStubError(request, 'OPS-DEPENDENCY-DOWN', 503)
  await page.goto('/')

  const alert = page.getByTestId('catalog-error')
  await expect(alert).toBeVisible()
  await expect(alert).toContainText('OPS-DEPENDENCY-DOWN')
  await expect(alert).toContainText('Check service health')
  await expect(alert.getByRole('button', { name: 'Retry' })).toBeVisible()
})

test('triggering a backfill from the dashboard creates one job (US-01, AC-09)', async ({ page }) => {
  await page.goto('/')
  // Slack has no active job in the fixture; Cloudflare has a running one (see next test).
  const slack = page.getByTestId('source-card').filter({ hasText: 'Slack Engineering' })
  await slack.getByTestId('source-crawl').click()
  await expect(page.getByTestId('catalog-notice')).toContainText('backfill job')
  await expect(page.getByTestId('catalog-notice').getByRole('link', { name: 'View job' })).toHaveAttribute(
    'href',
    /^\/jobs\//,
  )
})

test('duplicate active job surfaces JOB-DUPLICATE-ACTIVE with the active job link', async ({ page }) => {
  await page.goto('/')
  const cloudflare = page.getByTestId('source-card').filter({ hasText: 'Cloudflare' })
  await cloudflare.getByTestId('source-crawl').click()

  const alert = page.getByTestId('catalog-error')
  await expect(alert).toContainText('A job for this source is already running')
  await expect(alert.getByRole('link', { name: 'Open the active job' })).toHaveAttribute(
    'href',
    '/jobs/0192f0c9-1b77-7a2e-8c10-4d9e5b2a0012',
  )
})
