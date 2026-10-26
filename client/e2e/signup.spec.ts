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

  test("renders the sign-up form", async ({ page }) => {
    await expect(page.getByText("Create An Account")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#confirmPassword")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.locator('button[type="submit"]').click({ force: true });
    await expect(page.getByText("Email is required"));
    await expect(page.getByText("Your name is required"));
    await expect(page.getByText("Password is required"));
    await expect(page.getByText("Confirm password is required"));
    await expect(page.getByText("You must accept the terms and privacy policies"));
  });
});
