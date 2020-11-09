module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  plugins: ['prettier'],
  extends: ['airbnb-base', 'prettier'],
  globals: ['ethers'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
  },
}
