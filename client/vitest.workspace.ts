import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { defineWorkspace } from "vitest/config";

const storybookUrl = process.env.STORYBOOK_URL;

const storybookPlugin = storybookUrl
  ? storybookTest({ storybookUrl })
  : storybookTest({ storybookScript: "pnpm storybook --no-open" });

const jsdomProject = {
  extends: "./vitest.config.ts",
  name: "jsdom",
};

const browserTest = (name: string) => ({
  extends: "./vite.config.ts",
  plugins: [storybookPlugin],
  test: {
    name: `storybook-${name}`,
    browser: {
      enabled: true,
      headless: true,
      instances: [{ browser: name }],
      provider: "playwright",
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
});

export default defineWorkspace([
  jsdomProject,
  browserTest("chromium"),
  browserTest("firefox"),
  browserTest("webkit"),
]);
