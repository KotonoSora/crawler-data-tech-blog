import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Shell (host) MFE: owns routing and the one Tailwind stylesheet for every module
// (spec 07 file 01/02). Remotes are loaded at runtime from /mfe/<app>/ or the
// dev servers 5181-5183 — never bundled here. Dev server: 5173, /api -> 8090.
//
// VITE_API_PROXY_TARGET exists for the Playwright `ui` project: it points the proxy at
// the deterministic stub API (8099) so the suite runs with zero infrastructure. Production
// keeps the default (nginx edge at 8090).
const apiTarget = process.env.VITE_API_PROXY_TARGET ?? 'http://127.0.0.1:8090'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: apiTarget,
        changeOrigin: false,
      },
    },
  },
  build: {
    sourcemap: false,
  },
})
