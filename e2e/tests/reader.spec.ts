import { expect, test } from '@playwright/test'

import { ARTICLE, resetStub } from '../support/env'

// Reader MFE (spec 07 file 03 §2, file 05 §2). BA 06 AC-08: Markdown renders from the
// archive, every image resolves to the api asset path, and no raw HTML executes.

test.beforeEach(async ({ request }) => {
  await resetStub(request)
})

test('renders an archived article with metadata and attribution (AC-08)', async ({ page }) => {
  await page.goto(`/articles/${ARTICLE.cloudflareLogs}`)
  await expect(page.getByTestId('reader-page')).toBeVisible()

  await expect(page.getByRole('heading', { level: 1 })).toContainText('How we moved 40 PB of logs')
  await expect(page.getByTestId('reader-byline')).toContainText('A. Engineer')
  await expect(page.getByTestId('reader-status')).toHaveText('archived')
  await expect(page.getByTestId('reader-body')).toContainText('Cloudflare moves a lot of logs')
  await expect(page.getByTestId('reader-body').locator('h2')).toContainText('Architecture')
  await expect(page.getByTestId('reader-body').locator('table')).toBeVisible()
  await expect(page.getByTestId('reader-body').locator('pre code')).toContainText('hello archive')
  await expect(page.getByTestId('reader-attribution')).toContainText(
    'https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/',
  )
})

test('rewrites relative images to the api asset path and never hotlinks (BR-10, AC-14)', async ({
  page,
}) => {
  await page.goto(`/articles/${ARTICLE.cloudflareLogs}`)
  const image = page.getByTestId('reader-body').locator('img')
  await expect(image).toHaveCount(1)
  await expect(image).toHaveAttribute(
    'src',
    `/api/v1/articles/${ARTICLE.cloudflareLogs}/assets/img-001-0a1b2c3d.png`,
  )
  // The image really loads from the API (not a broken/remote URL).
  await expect(image).toHaveJSProperty('complete', true)
  expect(await image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0)
})

test('sanitizes raw HTML and never executes scripts (file 05 §2)', async ({ page }) => {
  await page.goto(`/articles/${ARTICLE.cloudflareLogs}`)
  await expect(page.getByTestId('reader-body')).toBeVisible()

  await expect(page.getByTestId('reader-body').locator('script')).toHaveCount(0)
  const pwned = await page.evaluate(() => (window as unknown as { __pwned?: boolean }).__pwned)
  expect(pwned).toBeUndefined()
  // The literal script text must not leak into the rendered body either.
  await expect(page.getByTestId('reader-body')).not.toContainText('__pwned')
})

test('opens external links safely in a new tab', async ({ page }) => {
  await page.goto(`/articles/${ARTICLE.cloudflareLogs}`)
  const link = page.getByTestId('reader-body').getByRole('link', { name: 'original announcement' })
  await expect(link).toHaveAttribute('href', 'https://blog.cloudflare.com/how-we-moved-40-pb-of-logs/')
  await expect(link).toHaveAttribute('target', '_blank')
  await expect(link).toHaveAttribute('rel', /noopener/)
  await expect(link).toHaveAttribute('rel', /noreferrer/)
})

test('exposes the raw Markdown link and the archive metadata card', async ({ page }) => {
  await page.goto(`/articles/${ARTICLE.cloudflareLogs}`)
  await expect(page.getByTestId('reader-raw-link')).toHaveAttribute(
    'href',
    `/api/v1/articles/${ARTICLE.cloudflareLogs}/content`,
  )
  await expect(page.getByTestId('reader-raw-link')).toHaveAttribute('target', '_blank')

  const meta = page.getByTestId('reader-metadata')
  await expect(meta).toContainText('9f2c1d4e8a7b')
  await expect(meta).toContainText('2026-10-01')
})

test('a failed article offers retry and re-queues exactly once (US-13)', async ({ page, request }) => {
  await page.goto(`/articles/${ARTICLE.cloudflareFailed}`)
  await expect(page.getByTestId('reader-status')).toHaveText('failed')

  const retry = page.getByTestId('reader-retry')
  await expect(retry).toBeEnabled()
  await retry.click()
  await expect(page.getByTestId('reader-notice')).toContainText('Retry queued')
  await expect(page.getByTestId('reader-status')).toHaveText('queued')
  await expect(retry).toBeDisabled()

  const recorded = await request.get('http://127.0.0.1:8099/__test__/requests')
  const body = (await recorded.json()) as { requests: string[] }
  expect(body.requests.filter((r) => r.endsWith('/retry'))).toHaveLength(1)
})

test('an archived article cannot be retried', async ({ page }) => {
  await page.goto(`/articles/${ARTICLE.cloudflareLogs}`)
  await expect(page.getByTestId('reader-retry')).toBeDisabled()
})

test('unknown article id renders ART-NOT-FOUND guidance', async ({ page }) => {
  await page.goto('/articles/0192f0c1-0000-7000-8000-000000000000')
  const alert = page.getByTestId('reader-error')
  await expect(alert).toContainText('Article is not archived')
  await expect(alert.getByRole('link', { name: 'articles list' })).toHaveAttribute('href', '/articles')
})

test('reader navigation back to the list goes through the shell router', async ({ page }) => {
  await page.goto(`/articles/${ARTICLE.slackSearch}`)
  await page.getByTestId('reader-back').click()
  await expect(page).toHaveURL('/articles')
  await expect(page.getByTestId('articles-page')).toBeVisible()
})
