// Runtime registry of the remote MFEs (spec 07 file 02). Dev: each remote runs on
// its own Vite server and exports its entry module. Prod: nginx serves the built
// bundles under /mfe/. VITE_MFE_<NAME>_URL overrides both (build-time, optional).

export type RemoteName = 'catalog' | 'reader' | 'admin'

interface RemoteDef {
  tag: string
  devUrl: string
  prodUrl: string
  envVar: string
}

const REMOTES: Record<RemoteName, RemoteDef> = {
  catalog: {
    tag: 'tb-catalog-app',
    devUrl: 'http://127.0.0.1:5181/src/mfe.ts',
    prodUrl: '/mfe/catalog/tb-catalog.js',
    envVar: 'VITE_MFE_CATALOG_URL',
  },
  reader: {
    tag: 'tb-reader-app',
    devUrl: 'http://127.0.0.1:5182/src/mfe.ts',
    prodUrl: '/mfe/reader/tb-reader.js',
    envVar: 'VITE_MFE_READER_URL',
  },
  admin: {
    tag: 'tb-admin-app',
    devUrl: 'http://127.0.0.1:5183/src/mfe.ts',
    prodUrl: '/mfe/admin/tb-admin.js',
    envVar: 'VITE_MFE_ADMIN_URL',
  },
}

export function remoteTag(name: RemoteName): string {
  return REMOTES[name].tag
}

export function remoteUrl(name: RemoteName): string {
  const remote = REMOTES[name]
  const env = import.meta.env as Record<string, string | undefined>
  return env[remote.envVar] ?? (import.meta.env.DEV ? remote.devUrl : remote.prodUrl)
}
