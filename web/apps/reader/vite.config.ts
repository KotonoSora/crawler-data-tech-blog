import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Remote MFE (spec 07): prod build emits one ESM bundle that registers the custom
// element; the shell loads it from /mfe/reader/tb-reader.js. Dev server: 5182.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5182,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090',
        changeOrigin: false,
      },
    },
  },
  build: {
    lib: {
      entry: 'src/mfe.ts',
      formats: ['es'],
      fileName: () => 'tb-reader.js',
    },
    sourcemap: false,
  },
})
