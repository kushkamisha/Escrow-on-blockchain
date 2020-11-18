module.exports = {
  env: {
    browser: true,
    es2020: true,
    mocha: true,
    jquery: true,
  },
  globals: {
    contract: 'readonly',
    artifacts: 'readonly',
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    semi: ['error', 'never'],
  },
}
