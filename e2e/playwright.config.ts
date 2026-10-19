import { defineConfig, devices } from '@playwright/test'
import { fileURLToPath } from 'node:url'

// Playwright configuration (https://playwright.dev/docs/test-configuration).
//
// Two projects:
//   ui     — shell + the three remote MFE dev servers + a deterministic stub API.
//            Runs with zero infrastructure; this is the TDD gate for the web layer.
//   stack  — the real compose stack through nginx at 127.0.0.1:8090 (api-service contract
//            tests). Enabled with E2E_STACK=1 once `docker compose up -d` is running.
//
// The stub API is a test double, never shipped: it mirrors the frozen spec 06 file 03
// contract so the UI can be driven before the backend exists.

const here = fileURLToPath(new URL('.', import.meta.url))
const webRoot = fileURLToPath(new URL('../web', import.meta.url))

const STUB_PORT = 8099
const SHELL_PORT = 5173

export default defineConfig({
  testDir: './tests',
  // The stub keeps per-test state; one worker keeps expectations deterministic.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:${SHELL_PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
    locale: 'en-US',
    timezoneId: 'UTC',
  },
  projects: [
    {
      name: 'ui',
      testIgnore: /api-contract\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'stack',
      testMatch: /api-contract\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.E2E_STACK_URL ?? 'http://127.0.0.1:8090',
      },
    },
  ],
  webServer: process.env.E2E_STACK
    ? undefined
    : [
        {
          command: `node support/stub-api.ts`,
          cwd: here,
          url: `http://127.0.0.1:${STUB_PORT}/__test__/health`,
          reuseExistingServer: !process.env.CI,
          timeout: 30_000,
        },
        {
          command: 'npm run dev:catalog',
          cwd: webRoot,
          url: 'http://127.0.0.1:5181/src/mfe.ts',
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
        },
        {
          command: 'npm run dev:reader',
          cwd: webRoot,
          url: 'http://127.0.0.1:5182/src/mfe.ts',
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
        },
        {
          command: 'npm run dev:admin',
          cwd: webRoot,
          url: 'http://127.0.0.1:5183/src/mfe.ts',
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
        },
        {
          command: 'npm run dev:shell',
          cwd: webRoot,
          url: `http://127.0.0.1:${SHELL_PORT}`,
          reuseExistingServer: !process.env.CI,
          timeout: 60_000,
          env: { VITE_API_PROXY_TARGET: `http://127.0.0.1:${STUB_PORT}` },
        },
      ],
})
