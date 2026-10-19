// Loads a remote MFE bundle once per tag and resolves when its custom element is
// defined (spec 07 file 02). Scripts are injected, never bundled; failures surface
// to the caller so the shell can render a retry state.

const pending = new Map<string, Promise<void>>()

export function ensureRemote(tag: string, url: string, timeoutMs = 20_000): Promise<void> {
  if (customElements.get(tag)) return Promise.resolve()

  const inflight = pending.get(tag)
  if (inflight) return inflight

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = url
    script.dataset.mfe = tag

    const timer = setTimeout(() => {
      pending.delete(tag)
      script.remove()
      reject(new Error(`Timed out loading ${tag} from ${url}`))
    }, timeoutMs)

    customElements.whenDefined(tag).then(() => {
      clearTimeout(timer)
      resolve()
    })
    script.onerror = () => {
      clearTimeout(timer)
      pending.delete(tag)
      script.remove()
      reject(new Error(`Failed to load ${tag} from ${url}`))
    }
    document.head.append(script)
  })

  pending.set(tag, promise)
  return promise
}
