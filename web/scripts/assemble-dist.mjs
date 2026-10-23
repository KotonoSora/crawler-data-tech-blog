// Assembles the deployable layout described in spec 07 file 01 §5:
//   web/dist/index.html + assets/        <- apps/shell/dist
//   web/dist/mfe/<app>/tb-<app>.js       <- apps/<app>/dist
// The individual apps still build into their own dist/ directories so the shell and each
// remote can be rebuilt independently; this script is the only step that creates web/dist.

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const webRoot = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(webRoot, 'dist')

const remotes = [
  ['catalog', 'tb-catalog.js'],
  ['reader', 'tb-reader.js'],
  ['admin', 'tb-admin.js'],
]

function requireFile(path) {
  if (!existsSync(path)) {
    throw new Error(`Missing build artifact: ${path}`)
  }
}

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

const shellDist = join(webRoot, 'apps', 'shell', 'dist')
requireFile(join(shellDist, 'index.html'))
for (const entry of readdirSync(shellDist)) {
  cpSync(join(shellDist, entry), join(dist, entry), { recursive: true })
}

for (const [app, bundle] of remotes) {
  const appDist = join(webRoot, 'apps', app, 'dist')
  requireFile(join(appDist, bundle))
  mkdirSync(join(dist, 'mfe', app), { recursive: true })
  // Remotes emit JS only (spec 07 file 01 §5); nothing else from their dist is deployed.
  cpSync(join(appDist, bundle), join(dist, 'mfe', app, bundle))
}

console.log(`web/dist assembled: shell + ${remotes.length} remote bundles`)
