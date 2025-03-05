// vitest.config.ts
import { defineConfig } from "vitest/config";
import vue from '@vitejs/plugin-vue';
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./"),
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: ['tests/e2e/**', '**/node_modules/**'],
  },
});
