module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/strongly-recommended',
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
    'no-case-declarations': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-closing-bracket-spacing': 'off',
    'vue/html-end-tags': 'off',
    'vue/html-indent': 'off',
    'vue/html-quotes': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/mustache-interpolation-spacing': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-multi-spaces': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/v-bind-style': 'off',
    'vue/v-on-style': 'off',
  },
  globals: {
    mapboxgl: true,
  }
}
