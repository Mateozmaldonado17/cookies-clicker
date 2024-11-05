import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      external: ['lit', 'lit-element', '@lit/react'],
      output: {
        globals: {
          'lit': 'lit',
          'lit-element': 'LitElement',
        },
      },
    },
  },
});
