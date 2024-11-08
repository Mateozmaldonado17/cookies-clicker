import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  optimizeDeps: {},
  test: {
    exclude: ['node_modules', 'dist', '**/*.spec.ts', '**/*.test.ts'],
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        globals: {
          'lit': 'lit',
          'lit-element': 'LitElement',
        },
      },
    },
  },
});
