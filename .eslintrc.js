module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'semi': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'vue/require-default-prop': 'off',
  },
};
