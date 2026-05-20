import { defineWorkspace } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

export default defineWorkspace([
  "./vitest.config.ts",
  {
    extends: "./vite.config.ts",
    plugins: [
      storybookTest({
        storybookScript: "pnpm storybook --no-open",
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        headless: true,
        name: "chromium",
        provider: "playwright",
      },
      setupFiles: ["./.storybook/vitest.setup.ts"],
    },
  },
]);
