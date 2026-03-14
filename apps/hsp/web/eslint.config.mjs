// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook'
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
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      "react/no-unknown-property": ["off", { "ignore": ["JSX"] }],
    }
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.content-collections/**',
      '.storybook/**',
    ],
  },
])
