import path from "path";
import { coverageConfigDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text"],
      exclude: [
        "src/stories/**",
        "src/api/**",
        "src/components/svg/**",
        "src/routes/**",
        "src/types/**",
        "src/store/**",
        "**/*.stories.tsx",
        "**/*.stories.ts",
        "**/*.test.ts",
        "**/*.test.tsx",
        "**/routeTree.gen.ts",
        "**/__vitest_test__/**",
        "**/*.config.{js,ts}",
        "storybook-static/**",
        "src/lib/**",
        "src/components/ui/**",
        "src/app.tsx",
        "src/main.tsx",
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
