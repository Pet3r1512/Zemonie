import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "pnpm --dir ../server dev",
      port: 8787,
      reuseExistingServer: true,
      timeout: 30000,
    },
    {
      command: "pnpm --dir . dev --host",
      port: 5173,
      reuseExistingServer: true,
      timeout: 30000,
    },
  ],
});
