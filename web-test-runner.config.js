import { esbuildPlugin } from "@web/dev-server-esbuild";
import { playwrightLauncher } from "@web/test-runner-playwright";

export default {
  rootDir: ".",
  files: "src/**/*.test.ts",
  concurrentBrowsers: 3,
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1,
    },
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      target: "esnext",
      decorators: true,
    }),
  ],
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    playwrightLauncher({ product: "webkit" }),
  ],
  testRunnerHtml: (testFramework) => `
    <html lang="en-US">
      <head></head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};