const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * typescript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: ['@vercel/style-guide/eslint/node', '@vercel/style-guide/eslint/typescript'].map(require.resolve),
  plugins: ['react-hooks'],
  parserOptions: {
    project
  },
  globals: {
    React: true,
    JSX: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    }
  },
  rules: {
    'no-console': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'no-nested-ternary': 0,
    'import/no-named-as-default-member': 0,
    '@typescript-eslint/consistent-type-definitions': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    'no-lonely-if': 0,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'coverage/', '*.test.ts']
};
