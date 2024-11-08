import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  files: './src/**/*.{test,spec}.ts',
  concurrentBrowsers: 3,
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.ts'], // Incluir solo archivos en src
    reporter: ['text', 'html'],
    all: true, // Incluir todos los archivos, aunque no se importen
    skipFull: false, // No omitir archivos al 100%
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  plugins: [
    vitePlugin(),
    esbuildPlugin({
      ts: true,
      target: 'esnext',
      loaders: {
        '.ts': 'ts',
      },
    }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
};
