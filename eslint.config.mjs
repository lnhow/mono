import base from '@repo/eslint-config/base.mjs'
import turboConfig from 'eslint-config-turbo/flat'

export default [
  ...turboConfig,
  ...base,
]
