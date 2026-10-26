import { expect, test } from "@playwright/test";

test.describe("Sign Up Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/signup", {
      waitUntil: "load",
      timeout: 30000,
    });
    const form = page.locator("form");
    await expect(form).toBeVisible({ timeout: 20000 });
  });
});
