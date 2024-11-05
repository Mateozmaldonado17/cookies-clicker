import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DocbrokUI',
      fileName: (format) => `docbrok-ui.${format}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['lit', 'lit-element', '@lit/react'],
      output: {
        globals: {
          'lit': 'lit',
          'lit-element': 'LitElement',
          '@lit/react': 'LitReact',
        },
      },
    },
  },
});
