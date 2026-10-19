// Shared E2E constants + helpers. The stub API is a test fixture (support/stub-api.ts);
// it is never part of the shipped product.

export const STUB_URL = process.env.E2E_STUB_URL ?? 'http://127.0.0.1:8099'

type StubRequest = {
  post: (url: string, options?: { data?: unknown }) => Promise<unknown>
  get: (url: string) => Promise<{ json: () => Promise<unknown> }>
}

/** Reset the stub fixtures before each test so ordering assertions stay deterministic. */
export async function resetStub(request: StubRequest): Promise<void> {
  await request.post(`${STUB_URL}/__test__/reset`)
}

/** Force the stub to answer every product call with a ProblemDetail. */
export async function forceStubError(
  request: StubRequest,
  code = 'OPS-DEPENDENCY-DOWN',
  status = 503,
): Promise<void> {
  await request.post(`${STUB_URL}/__test__/mode`, { data: { mode: 'error', code, status } })
}

export async function clearStubError(request: StubRequest): Promise<void> {
  await request.post(`${STUB_URL}/__test__/mode`, { data: { mode: 'ok' } })
}

/** Every product request the stub has served since the last reset. */
export async function recordedRequests(request: StubRequest): Promise<string[]> {
  const response = await request.get(`${STUB_URL}/__test__/requests`)
  return ((await response.json()) as { requests: string[] }).requests
}

export const ARTICLE = {
  cloudflareLogs: '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e341',
  cloudflareEdge: '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e342',
  cloudflarePq: '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e343',
  cloudflareFailed: '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e344',
  slackSearch: '0192f0c1-8a4d-7c3e-9b21-5f0d2a77e345',
} as const

export const JOB = {
  cloudflareRunning: '0192f0c9-1b77-7a2e-8c10-4d9e5b2a0012',
  slackCompleted: '0192f0c9-1b77-7a2e-8c10-4d9e5b2a0013',
} as const
