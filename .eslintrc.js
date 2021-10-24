// https://eslint.org/docs/user-guide/configuring
// File taken from https://github.com/vuejs-templates/webpack/blob/1.3.1/template/.eslintrc.js, thanks.

module.exports = {
  // root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    webextensions: true,
    es6: true,
    jest: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    'eslint:recommended', 
    'plugin:vue/recommended',
    // '@vue/standard',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 'standard',
    // https://prettier.io/docs/en/index.html
    // 'plugin:prettier/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue', 
    // 'import',
    'jest'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'import/newline-after-import': ['error', { count: 1 }],
    // 'import/no-unresolved': [2, {commonjs: true, amd: true}],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
