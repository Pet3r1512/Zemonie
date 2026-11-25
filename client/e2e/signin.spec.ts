import { test, expect, type Page } from "@playwright/test";

async function waitForTurnstile(page: Page) {
  await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, {
    timeout: 15000,
  });
}

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
    await page.locator('button[type="submit"]').click();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.locator("#email").fill("bad@bad");
    await page.locator("#password").fill("password123");
    await page.locator('button[type="submit"]').click();
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

  test("signs in with valid credentials and redirects to dashboard", async ({ page, context }) => {
    const email = `e2e-signin-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
    const password = "validpassword123";

    await page.goto("/auth/signup", { waitUntil: "load", timeout: 30000 });
    await page.locator("#email").fill(email);
    await page.locator("#name").fill("Valid Name");
    await page.locator("#password").fill(password);
    await page.locator("#confirmPassword").fill(password);
    await page.getByRole("checkbox").check();
    await waitForTurnstile(page);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 30000 });

    await context.clearCookies();
    await page.goto("/auth/signin", { waitUntil: "load", timeout: 30000 });
    await page.locator("#email").fill(email);
    await page.locator("#password").fill(password);
    await waitForTurnstile(page);
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 15000 });
  });
});
