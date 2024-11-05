import typescriptEslintParser from '@typescript-eslint/parser';
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import litPlugin from 'eslint-plugin-lit';

export default [
  {
    ignores: ['node_modules/**/*', 'dist/**/*'],
  },
  {
    files: ['src/**/*.ts', 'test/**/*.ts', 'src/**/*.js', 'test/**/*.js'],
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 2021,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin,
      'lit': litPlugin,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'lit/no-invalid-html': 'error',
      'lit/no-useless-template-literals': 'warn',
    },
  },
];
