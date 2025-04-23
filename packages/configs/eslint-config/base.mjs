// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import turboConfig from 'eslint-config-turbo/flat'
// import eslintConfigPrettier from 'eslint-config-prettier/flat'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  turboConfig,
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@typescript-eslint/ban-ts-comment': 0,
      'turbo/no-undeclared-env-vars': [
        'error',
        {
          allowList: ['^ENV_[A-Z]+$'],
        },
      ],
    },
  },
  // eslintConfigPrettier,
)
