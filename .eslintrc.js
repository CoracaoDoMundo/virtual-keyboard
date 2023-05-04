module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:jsonc/recommended-with-json'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': ['error', 'always', { ignorePackages: true }],
    // 'no-plusplus': 'off',
    // 'eol-line': 'off',
    // 'prefer-destructuring': 'off',
    // 'no-alert': 'off',
  },
};
