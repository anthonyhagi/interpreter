module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: false,
    node: true,
    jest: true,
  },
};
