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

  test("shows errors for invalid email address", async ({ page }) => {
    await page.locator("#email").fill("bademail@bad");
    await page.locator("#name").fill("Valid Name");
    await page.locator("#password").fill("validpassword123");
    await page.locator("#confirmPassword").fill("validpassword123");
    await page.getByRole("checkbox").check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Invalid email address")).toBeVisible();
    await expect(page.getByText("Name is too short")).not.toBeVisible();
    await expect(page.getByText("Please enter a valid name using letters only")).not.toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).not.toBeVisible();
    await expect(
      page.getByText("Minimum 8 characters, at least one letter and one number"),
    ).not.toBeVisible();
    await expect(page.getByText("Confirm password is required")).not.toBeVisible();
    await expect(
      page.getByText("You must accept the terms and privacy policies"),
    ).not.toBeVisible();
  });

  test("shows errors for invalid name (short name)", async ({ page }) => {
    await page.locator("#email").fill("validemail@email.com");
    await page.locator("#name").fill("a");
    await page.locator("#password").fill("validpassword123");
    await page.locator("#confirmPassword").fill("validpassword123");
    await page.getByRole("checkbox").check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Invalid email address")).not.toBeVisible();
    await expect(page.getByText("Name is too short")).toBeVisible();
    await expect(page.getByText("Please enter a valid name using letters only")).not.toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).not.toBeVisible();
    await expect(
      page.getByText("Minimum 8 characters, at least one letter and one number"),
    ).not.toBeVisible();
    await expect(page.getByText("Confirm password is required")).not.toBeVisible();
    await expect(
      page.getByText("You must accept the terms and privacy policies"),
    ).not.toBeVisible();
  });

  test("shows errors for invalid name", async ({ page }) => {
    await page.locator("#email").fill("validemail@email.com");
    await page.locator("#name").fill("InvalidName@");
    await page.locator("#password").fill("validpassword123");
    await page.locator("#confirmPassword").fill("validpassword123");
    await page.getByRole("checkbox").check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Invalid email address")).not.toBeVisible();
    await expect(page.getByText("Name is too short")).not.toBeVisible();
    await expect(page.getByText("Please enter a valid name using letters only")).toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).not.toBeVisible();
    await expect(
      page.getByText("Minimum 8 characters, at least one letter and one number"),
    ).not.toBeVisible();
    await expect(page.getByText("Confirm password is required")).not.toBeVisible();
    await expect(
      page.getByText("You must accept the terms and privacy policies"),
    ).not.toBeVisible();
  });

  test("shows errors for invalid password", async ({ page }) => {
    await page.locator("#email").fill("validemail@email.com");
    await page.locator("#name").fill("Valid Name");
    await page.locator("#password").fill("shortpw");
    await page.locator("#confirmPassword").fill("shortpw");
    await page.getByRole("checkbox").check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Invalid email address")).not.toBeVisible();
    await expect(page.getByText("Name is too short")).not.toBeVisible();
    await expect(page.getByText("Please enter a valid name using letters only")).not.toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).toBeVisible();
    await expect(
      page.getByText("Minimum 8 characters, at least one letter and one number"),
    ).not.toBeVisible();
    await expect(page.getByText("Confirm password is required")).not.toBeVisible();
    await expect(
      page.getByText("You must accept the terms and privacy policies"),
    ).not.toBeVisible();
  });

  test("shows errors when password and confirm password do not match", async ({ page }) => {
    await page.locator("#email").fill("validemail@email.com");
    await page.locator("#name").fill("Valid Name");
    await page.locator("#password").fill("validpassword1");
    await page.locator("#confirmPassword").fill("validpassword2");
    await page.getByRole("checkbox").check();
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Invalid email address")).not.toBeVisible();
    await expect(page.getByText("Name is too short")).not.toBeVisible();
    await expect(page.getByText("Please enter a valid name using letters only")).not.toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).not.toBeVisible();
    await expect(
      page.getByText("Minimum 8 characters, at least one letter and one number"),
    ).not.toBeVisible();
    await expect(page.getByText("The passwords do not match")).toBeVisible();
    await expect(page.getByText("Confirm password is required")).not.toBeVisible();
    await expect(
      page.getByText("You must accept the terms and privacy policies"),
    ).not.toBeVisible();
  });

  test("shows errors when do not check the checkbox", async ({ page }) => {
    await page.locator("#email").fill("validemail@email.com");
    await page.locator("#name").fill("Valid Name");
    await page.locator("#password").fill("validpassword1");
    await page.locator("#confirmPassword").fill("validpassword1");
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Invalid email address")).not.toBeVisible();
    await expect(page.getByText("Name is too short")).not.toBeVisible();
    await expect(page.getByText("Please enter a valid name using letters only")).not.toBeVisible();
    await expect(page.getByText("Password must be at least 8 characters long")).not.toBeVisible();
    await expect(
      page.getByText("Minimum 8 characters, at least one letter and one number"),
    ).not.toBeVisible();
    await expect(page.getByText("The passwords do not match")).not.toBeVisible();
    await expect(page.getByText("Confirm password is required")).not.toBeVisible();
    await expect(page.getByText("You must accept the terms and privacy policies")).toBeVisible();
  });

  test("toggles password visibility", async ({ page }) => {
    const passwordInput = page.locator("#password");
    const confirmPasswordInput = page.locator("#confirmPassword");

    await passwordInput.fill("validPassword1");
    await confirmPasswordInput.fill("validPassword1");

    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");

    await page.getByTestId("password-toggle").click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");

    await page.getByTestId("password-toggle").click();
    await expect(passwordInput).toHaveAttribute("type", "password");
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  test("navigates to sign in page", async ({ page }) => {
    await page.getByRole("link", { name: /sign in/i }).click();
    await expect(page).toHaveURL("/auth/signin");
  });
});
