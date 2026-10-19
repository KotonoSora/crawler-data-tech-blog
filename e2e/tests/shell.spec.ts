import { expect, test } from '@playwright/test'

import { forceStubError, recordedRequests, resetStub } from '../support/env'

// Shell contract: spec 07 file 02 §3 / file 03 §2. The shell owns routing, header/nav,
// the remote loader and the 404; every other screen is a remote element.

test.beforeEach(async ({ request }) => {
  await resetStub(request)
})

test('serves the English shell frame on every route', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByTestId('app-shell')).toBeVisible()
  await expect(page.getByTestId('nav-sources')).toHaveAttribute('href', '/')
  await expect(page.getByTestId('nav-articles')).toHaveAttribute('href', '/articles')
  await expect(page.getByTestId('nav-jobs')).toHaveAttribute('href', '/jobs')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Sources')
})

test('mounts each remote custom element for its route', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('tb-catalog-app')).toHaveCount(1)

  await page.goto('/articles')
  await expect(page.locator('tb-catalog-app')).toHaveAttribute('view', 'articles')

  await page.goto('/articles/0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341')
  await expect(page.locator('tb-reader-app')).toHaveAttribute(
    'article-id',
    '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341',
  )

  await page.goto('/jobs')
  await expect(page.locator('tb-admin-app')).toHaveCount(1)

  await page.goto('/sources/cloudflare')
  await expect(page.locator('tb-catalog-app')).toHaveAttribute('view', 'source')
  await expect(page.locator('tb-catalog-app')).toHaveAttribute('source-key', 'cloudflare')
})

test('deep links survive a full reload (history fallback in dev and prod)', async ({ page }) => {
  await page.goto('/jobs')
  await page.reload()
  await expect(page.locator('tb-admin-app')).toHaveCount(1)

  await page.goto('/articles?q=logs&source=cloudflare&page=0&size=50')
  await page.reload()
  await expect(page.getByTestId('articles-page')).toBeVisible()
  await expect(page.getByTestId('article-search')).toHaveValue('logs')
  await expect(page.getByTestId('article-source-filter')).toHaveValue('cloudflare')
})

test('renders the shell 404 for an unknown path', async ({ page }) => {
  await page.goto('/does-not-exist')
  await expect(page.getByTestId('shell-404')).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('404')
  await page.getByRole('link', { name: 'Back to sources' }).click()
  await expect(page).toHaveURL('/')
})

test('navigation intents from a remote flow through the shell (tb:navigate)', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('source-card').first().getByTestId('source-open').click()
  await expect(page).toHaveURL(/\/sources\/[a-z0-9-]+$/)
  await expect(page.getByTestId('source-detail')).toBeVisible()
})

test('keeps the URL as the only retained state (no browser storage, no cookies)', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('sources-page')).toBeVisible()
  await page.getByTestId('nav-articles').click()
  await expect(page.getByTestId('articles-page')).toBeVisible()

  const storage = await page.evaluate(() => ({
    local: window.localStorage.length,
    session: window.sessionStorage.length,
    cookie: document.cookie,
  }))
  expect(storage.local).toBe(0)
  expect(storage.session).toBe(0)
  expect(storage.cookie).toBe('')
})

test('shows a dependency banner when the ops summary reports OPS-DEPENDENCY-DOWN', async ({
  page,
  request,
}) => {
  await forceStubError(request, 'OPS-DEPENDENCY-DOWN', 503)

  await page.goto('/')
  await expect(page.getByTestId('shell-banner')).toBeVisible()
  await expect(page.getByTestId('shell-banner')).toContainText('dependency')
})

test('hides the dependency banner when every service is up', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByTestId('sources-page')).toBeVisible()
  await expect(page.getByTestId('shell-banner')).toHaveCount(0)
})

test('is English-only: no Vietnamese locale strings are rendered', async ({ page }) => {
  for (const path of ['/', '/articles', '/jobs']) {
    await page.goto(path)
    const text = (await page.locator('body').innerText()).toLowerCase()
    for (const forbidden of ['tiếng việt', 'ngôn ngữ', 'bài viết', 'tìm kiếm', 'nguồn']) {
      expect(text).not.toContain(forbidden)
    }
  }
})

test('loads each remote bundle exactly once per session (cached loader)', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.getByTestId('sources-page')).toBeVisible()
  await page.getByTestId('nav-articles').click()
  await expect(page.getByTestId('articles-page')).toBeVisible()
  await page.getByTestId('nav-sources').click()
  await expect(page.getByTestId('sources-page')).toBeVisible()

  const loaded = await page.evaluate(() =>
    Array.from(document.querySelectorAll('script[data-mfe]')).map((el) => el.getAttribute('data-mfe')),
  )
  expect(new Set(loaded).size).toBe(loaded.length)
  expect(loaded).toContain('tb-catalog-app')
  expect(await recordedRequests(request)).not.toContain('GET /mfe/catalog/tb-catalog.js')
})
