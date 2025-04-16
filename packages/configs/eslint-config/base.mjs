// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier/flat'

export default [
  tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
    },
  }),
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
    },
  },
  eslintConfigPrettier,
]
