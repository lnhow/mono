module.exports = {
  'root': true,
  'env': {
    'node': true,
    'es6': true,
    'browser': true
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'extends': [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  'rules': {
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  },
  globals: {
    React: true,
    JSX: true,
  },
}
