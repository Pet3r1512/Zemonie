import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineWorkspace } from "vitest/config";

const storybookUrl = process.env.STORYBOOK_URL;

const storybookPlugin = storybookUrl
  ? storybookTest({ storybookUrl })
  : storybookTest({ storybookScript: "pnpm storybook --no-open" });

const browserTest = (name: string) => ({
  extends: "./vite.config.ts",
  plugins: [storybookPlugin],
  test: {
    name: `storybook-${name}`,
    browser: {
      enabled: true,
      headless: true,
      name,
      provider: "playwright",
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});

export default defineWorkspace([
  "./vitest.config.ts",
  browserTest("chromium"),
  browserTest("firefox"),
  browserTest("webkit"),
]);
