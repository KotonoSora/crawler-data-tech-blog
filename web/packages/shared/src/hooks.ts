import { useEffect, useRef, useState } from 'react'

import { UiError } from './api'

export interface AsyncState<T> {
  data: T | null
  error: Error | null
  loading: boolean
}

export interface AsyncOptions {
  /** Re-fetch on this interval while mounted. 0 / undefined disables polling. */
  pollMs?: number
}

/**
 * Fetch-on-change helper shared by the remotes (no cross-MFE state, spec 07 file 02).
 *
 * - Every effect run owns an AbortController: a dependency change aborts the in-flight
 *   request so a slow response can never overwrite a newer one (search-as-you-type).
 * - `pollMs` re-fetches on an interval (job screens poll every 30 s while a job is active).
 * - Aborted requests are ignored: they are a normal consequence of typing or unmounting.
 */
export function useAsync<T>(
  load: (signal: AbortSignal) => Promise<T>,
  deps: unknown[],
  options?: AsyncOptions,
) {
  const loadRef = useRef(load)
  loadRef.current = load

  const [state, setState] = useState<AsyncState<T>>({ data: null, error: null, loading: true })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    let active = true
    setState((previous) => ({ ...previous, loading: true, error: null }))
    loadRef
      .current(controller.signal)
      .then((data) => {
        if (!active || controller.signal.aborted) return
        setState({ data, error: null, loading: false })
      })
      .catch((error: unknown) => {
        if (!active || controller.signal.aborted) return
        if (error instanceof UiError && error.code === 'UI-ABORTED') return
        setState((previous) => ({
          data: previous.data,
          error: error instanceof Error ? error : new Error(String(error)),
          loading: false,
        }))
      })
    return () => {
      active = false
      controller.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])

  const pollMs = options?.pollMs ?? 0
  useEffect(() => {
    if (!pollMs) return
    const timer = setInterval(() => setTick((value) => value + 1), pollMs)
    return () => clearInterval(timer)
  }, [pollMs])

  return { ...state, reload: () => setTick((value) => value + 1) }
}

/** Debounce a fast-changing value (search input) by `delayMs`. */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])
  return debounced
}
