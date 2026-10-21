import { configDefaults, defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    exclude: ["e2e/**", ...configDefaults.exclude],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      exclude: [
        "src/index.ts",
        "src/env.ts",
        "vitest.setup.ts",
        "**/*.test.ts",
        "**/*.config.{js,ts}",
        "prisma/**",
        ".wrangler/**",
        "dist/**",
        ...configDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
