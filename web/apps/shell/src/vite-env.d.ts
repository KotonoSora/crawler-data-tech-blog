/// <reference types="vite/client" />

// The shell's vite.config.ts reads one build-time override. Declaring the tiny surface here
// keeps the browser workspace free of @types/node; Node executes the config with the real
// global, but `tsc --noEmit` only needs this shape.
declare const process: {
  env: Record<string, string | undefined>
}
