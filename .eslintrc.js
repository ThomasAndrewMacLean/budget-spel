module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    // 'comma-dangle': ['error', 'never'],
    'no-multi-spaces': ['error', { exceptions: { Property: false } }],
    'key-spacing': ['error'],
    'no-multiple-empty-lines': 'error',
    'space-in-parens': ['error', 'never'],
    quotes: ['error', 'single'],
  },
};
