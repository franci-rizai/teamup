module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-components': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-parsing-error': 'off',
    'eqeqeq': 'off',
    'curly': 'off',
    'quotes': 'off'
  }
};