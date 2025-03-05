import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: 'tests/e2e',
  webServer: {
    command: "npm run dev",
    port: 3000
  },
  use: {
    headless: true,
    baseURL: "http://localhost:3000"
  }
});
