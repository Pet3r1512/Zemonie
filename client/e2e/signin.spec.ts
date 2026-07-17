import { test, expect } from "@playwright/test";

const USER_EMAIL = process.env.TEST_USER_EMAIL || "";
const USER_PASSWORD = process.env.TEST_USER_PASSWORD || "";

test.describe("Sign In Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/signin", { waitUntil: "load", timeout: 30000 });
    const form = page.locator("form");
    await expect(form).toBeVisible({ timeout: 20000 });
  });

  test("renders the sign-in form", async ({ page }) => {
    await expect(page.getByText("Welcome back")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.locator('button[type="submit"]').click({ force: true });
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.locator("#email").fill("bad@bad");
    await page.locator("#password").fill("password123");
    await page.locator('button[type="submit"]').click({ force: true });
    await expect(page.getByTestId("form-error-msg")).toBeVisible({ timeout: 5000 });
  });

  test("toggles password visibility", async ({ page }) => {
    const passwordInput = page.locator("#password");
    await passwordInput.fill("secret123");
    await expect(passwordInput).toHaveAttribute("type", "password");
    await page.getByTestId("password-toggle").click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await page.getByTestId("password-toggle").click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("navigates to sign up page", async ({ page }) => {
    await page.getByRole("link", { name: /sign up/i }).click();
    await expect(page).toHaveURL("/auth/signup");
  });

  test.describe("authenticated", () => {
    test.skip(!USER_EMAIL || !USER_PASSWORD, "set TEST_USER_EMAIL and TEST_USER_PASSWORD env vars");

    test("signs in with valid credentials and redirects to dashboard", async ({ page }) => {
      await page.locator("#email").fill(USER_EMAIL);
      await page.locator("#password").fill(USER_PASSWORD);
      await page.locator('button[type="submit"]').click({ force: true });
      await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
    });
  });
});
