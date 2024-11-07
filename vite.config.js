import { defineConfig } from 'vite';
import { resolve } from 'path';
import { globbySync } from 'globby';
import path from 'path';

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
    preserveEntrySignatures: 'strict',
    input: {
      main: resolve(__dirname, 'src/index.ts'),
      ...globbySync('src/**/*.test.ts').reduce((entries, file) => {
        const name = path.relative('src', file).replace(/\.ts$/, '');
        entries[name] = resolve(__dirname, file);
        return entries;
      }, {}),
    },
  },
});
