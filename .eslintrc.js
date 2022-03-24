module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    'implicit-arrow-linebreak': 0,
    'no-unused-expressions': 0,
  },
};
