import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@hsp/ui': fileURLToPath(new URL('../../packages/hsp/ui/src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
  },
})
