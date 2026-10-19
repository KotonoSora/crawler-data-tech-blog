import { createElement, useEffect, useState } from 'react'
import { TriangleAlert } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@techblog/ui/components/alert'
import { Button } from '@techblog/ui/components/button'
import { Skeleton } from '@techblog/ui/components/skeleton'

import { ensureRemote } from './mfe-loader'
import { remoteTag, remoteUrl, type RemoteName } from './remotes'

// Mounts one remote: loads its bundle, then renders the custom element with the
// attributes for the current route. State flows down as attributes; navigation
// flows up as `tb:navigate` (handled once, in the shell layout).
export function RemoteHost({ name, attrs }: { name: RemoteName; attrs: Record<string, string> }) {
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    ensureRemote(remoteTag(name), remoteUrl(name))
      .then(() => {
        if (!cancelled) setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('failed')
      })
    return () => {
      cancelled = true
    }
  }, [name, attempt])

  if (status === 'loading') {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <Alert variant="destructive">
        <TriangleAlert />
        <AlertTitle>The {name} module failed to load</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>Check that its dev server (or /mfe/{name}/) is reachable, then retry.</p>
          <Button size="sm" variant="outline" onClick={() => setAttempt((value) => value + 1)}>
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  return createElement(remoteTag(name), attrs)
}
