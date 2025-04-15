require('@repo/eslint-config/utils/resolve-plugins.js')

module.exports = {
  extends: ['@repo/eslint-config/nextjs.js'],
  ignorePatterns: ['**/_generated/**'],
}
