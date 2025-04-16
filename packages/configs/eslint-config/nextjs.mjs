// @ts-check
import base from './base.mjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import eslint from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all,
})
export default [
  ...compat.extends('next'),
  {
    files: ['*.jsx', '*.tsx', '*.js', '*.ts'],
    globals: {
      React: true,
      JSX: true,
    },
  },
  ...base,
]

// import eslint from '@eslint/js';

// export default tseslint.config(
//   eslint.configs.recommended,
//   tseslint.configs.recommended,
// )

//

// module.exports = {
//   // 'root': true,
//   'env': {
//     'node': true,
//     'es6': true,
//     'browser': true
//   },
//   'plugins': [
//     '@typescript-eslint',
//   ],
//   'extends': [
//     'eslint:recommended',
//     'next',
//     'next/core-web-vitals',
//     'plugin:@typescript-eslint/recommended',
//     'prettier'
//   ],
//   'rules': {
//     'quotes': [
//       'error',
//       'single'
//     ],
//     'semi': [
//       'error',
//       'never'
//     ],
//     '@typescript-eslint/ban-ts-comment': 0,
//   },
//   globals: {
//     React: true,
//     JSX: true,
//   },
// }
