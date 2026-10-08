import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    exclude: ["e2e/**", ...configDefaults.exclude],
    env: {
      // This is just a mock key for testing
      ENCRYPTION_KEY: "aPgrW7q9UmpPXeancDAj/QW/0YOuoNbj+vUjVtjFPJo=",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
