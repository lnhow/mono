module.exports = {
  'root': true,
  'env': {
    'node': true,
    'es6': true,
    'browser': true
  },
  'extends': [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
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
  }
}
