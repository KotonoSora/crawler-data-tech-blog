import { describe, expect, it } from 'vitest'

import { ensureRemote } from './mfe-loader'

describe('ensureRemote', () => {
  it('resolves immediately when the element is already defined', async () => {
    customElements.define('tb-test-defined-app', class extends HTMLElement {})
    await expect(
      ensureRemote('tb-test-defined-app', 'http://example.invalid/never-loaded.js'),
    ).resolves.toBeUndefined()
  })

  it('rejects once the timeout passes for a bundle that never registers', async () => {
    await expect(
      ensureRemote('tb-test-timeout-app', 'http://example.invalid/never-loaded.js', 50),
    ).rejects.toThrowError(/Timed out loading tb-test-timeout-app/)
    // A failed load must not be cached: a retry can inject a fresh script.
    await expect(
      ensureRemote('tb-test-timeout-app', 'http://example.invalid/never-loaded.js', 50),
    ).rejects.toThrowError(/Timed out loading tb-test-timeout-app/)
  })
})
