import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { vitePlugin } from '@remcovaes/web-test-runner-vite-plugin';

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts',
  concurrentBrowsers: 3,
  nodeResolve: true,
  coverage: true,
  coverageConfig: {
    include: ['src/**/*.ts'],
    reporter: ['text', 'html'],
    all: true,
    skipFull: false,
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
    // FUCK FIREFOX!!!!! playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  testRunnerHtml: (testFramework) => {
    return `
    <html lang="en-US">
      <head></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `;
  },
};
