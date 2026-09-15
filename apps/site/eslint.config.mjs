import { defineConfig } from 'eslint/config'
import { nextJsConfig } from '@repo/eslint-config/next-js'

export default defineConfig([
  ...nextJsConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      'react/no-unknown-property': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      '.content-collections/**',
      'next-env.d.ts',
      'eslint.config.mjs',
      'postcss.config.mjs',
    ],
  },
])
