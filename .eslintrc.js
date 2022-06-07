module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'implicit-arrow-linebreak': 0,
    'no-unused-expressions': 0,
    'function-paren-newline': 0,
    'comma-dangle': 0,
    'guard-for-in': 0,
  },
};
