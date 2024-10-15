/** @type {import('eslint').Linter.FlatConfig} */
const config = [
  {
    languageOptions: {
      globals: {
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    rules: {},
  },
  {
    files: ['*.ts'],
    languageOptions: {
      globals: {
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
      plugins: {
        prettier: require('eslint-plugin-prettier'),
      },
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      globals: {
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
    },
  },
];

module.exports = config;
