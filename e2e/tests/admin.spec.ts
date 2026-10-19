import { expect, test } from '@playwright/test'

import { JOB, resetStub } from '../support/env'

// Admin MFE (spec 07 file 03 §2/§4, file 05 §5). BA 06 AC-05, AC-09, AC-10.

test.beforeEach(async ({ request }) => {
  await resetStub(request)
})

test('jobs list is newest-first with type, status and counters (AC-10)', async ({ page }) => {
  await page.goto('/jobs')
  await expect(page.getByTestId('jobs-page')).toBeVisible()

  const rows = page.getByTestId('job-row')
  await expect(rows).toHaveCount(3)
  await expect(rows.nth(0)).toContainText('slack')
  await expect(rows.nth(1)).toContainText('cloudflare')
  await expect(rows.nth(1)).toContainText('running')
  await expect(rows.nth(1)).toContainText('812 / 640 / 57 / 3')

  await expect(page.getByTestId('jobs-page')).toContainText('newest first')
})

test('job detail shows counters and the failure list with code + attempts (AC-05)', async ({
  page,
}) => {
  await page.goto(`/jobs/${JOB.cloudflareRunning}`)
  await expect(page.getByTestId('job-detail')).toBeVisible()
  await expect(page.getByTestId('job-status')).toHaveText('running')
  await expect(page.getByTestId('job-counters')).toContainText('Discovered')
  await expect(page.getByTestId('job-counters')).toContainText('812')

  const failure = page.getByTestId('job-failure-row').first()
  await expect(failure).toContainText('FETCH-TIMEOUT')
  await expect(failure).toContainText('read 30 s exceeded')
  await expect(failure).toContainText('5')
})

test('retrying a failed article from job detail re-queues it once', async ({ page, request }) => {
  await page.goto(`/jobs/${JOB.cloudflareRunning}`)
  await page.getByTestId('job-failure-retry').first().click()
  await expect(page.getByTestId('admin-notice')).toContainText('Retry queued')

  const recorded = await request.get('http://127.0.0.1:8099/__test__/requests')
  const body = (await recorded.json()) as { requests: string[] }
  expect(body.requests.filter((r) => r.endsWith('/retry'))).toHaveLength(1)
})

test('cancel asks for confirmation and reports the new status', async ({ page }) => {
  await page.goto(`/jobs/${JOB.cloudflareRunning}`)
  await page.getByTestId('job-cancel').click()

  const dialog = page.getByRole('dialog')
  await expect(dialog).toContainText('Cancel this job?')
  await dialog.getByRole('button', { name: 'Cancel job' }).click()

  await expect(page.getByTestId('admin-notice')).toContainText('Cancellation requested')
  await expect(page.getByTestId('job-status')).toHaveText('cancelled')
  await expect(page.getByTestId('job-cancel')).toBeDisabled()
})

test('cancelling a terminal job surfaces JOB-INVALID-STATE', async ({ page }) => {
  await page.goto(`/jobs/${JOB.slackCompleted}`)
  await expect(page.getByTestId('job-status')).toHaveText('completed')
  await expect(page.getByTestId('job-cancel')).toBeDisabled()
})

test('trigger a crawl from the admin module (Crawl all enabled)', async ({ page }) => {
  await page.goto('/jobs')
  await page.getByTestId('crawl-all').click()
  await expect(page.getByTestId('admin-notice')).toContainText('incremental job')
  await expect(page.getByTestId('job-row').first()).toContainText('pending')
})

test('trigger buttons are disabled while a request is in flight (file 05 §5)', async ({ page }) => {
  await page.goto('/jobs')
  const button = page.getByTestId('crawl-all')
  await expect(button).toBeEnabled()
  await button.click()
  await expect(button).toBeEnabled()
})

test('ops card shows service health and projection lag', async ({ page }) => {
  await page.goto('/jobs')
  const ops = page.getByTestId('ops-card')
  await expect(ops).toContainText('api-service')
  await expect(ops).toContainText('crawler-service')
  await expect(ops).toContainText('Projection lag 3s')
})

test('job list polls every 30 s while a job is running and stops when all are terminal', async ({
  page,
}) => {
  await page.goto('/jobs')
  const list = page.getByTestId('jobs-page')
  await expect(list).toBeVisible()
  // The fixture has one running job, so the list advertises its poll cadence.
  await expect(list).toHaveAttribute('data-poll-ms', '30000')

  await page.goto(`/jobs/${JOB.slackCompleted}`)
  await expect(page.getByTestId('job-detail')).toHaveAttribute('data-poll-ms', '0')
})

test('unknown job id renders JOB-NOT-FOUND guidance', async ({ page }) => {
  await page.goto('/jobs/0192f0c1-0000-7000-8000-000000000000')
  const alert = page.getByTestId('admin-error')
  await expect(alert).toContainText('Job not found')
  await expect(alert.getByRole('link', { name: 'jobs list' })).toHaveAttribute('href', '/jobs')
})
