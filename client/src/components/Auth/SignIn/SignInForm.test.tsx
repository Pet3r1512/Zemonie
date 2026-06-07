import { SignInFormType } from "@/lib/types/signinform";
// import { useMutation } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import SignInForm from "./SignInForm";
import { userEvent } from "@storybook/testing-library";

vi.mock("@/api/users/auth/SignInEmail", () => ({
  default: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(({ onSuccess, onError }) => ({
    mutate: vi.fn(async (credentials: SignInFormType) => {
      try {
        const data = {
          email: credentials.email,
          password: credentials.password,
        };
        onSuccess?.(data);
      } catch (err) {
        onError?.(err);
      }
    }),
    isPending: true,
  })),
}));

vi.mock("../SignInViaGoogleBtn.tsx", () => ({
  default: () => <button>Sign In with Google</button>,
}));

function renderForm(className?: string) {
  return render(<SignInForm className={className} />);
}

describe("Rendering", () => {
  it("renders the sign in form container", () => {
    renderForm();

    expect(screen.getByTestId("signin-form-container")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    renderForm();

    expect(screen.getByRole("email-input")).toBeInTheDocument();
    expect(screen.getByRole("password-input")).toBeInTheDocument();
  });

  it("renders the submit button with correct label", () => {
    renderForm();

    expect(
      screen.getByRole("button", { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  it("renders the sign up navigation link", () => {
    renderForm();

    const nav = screen.getByRole("signup-nav");
    expect(nav).toBeInTheDocument();
    expect(nav.querySelector("a")).toHaveAttribute("href", "/auth/signup");
  });

  it("renders the Google sign-in button", () => {
    renderForm();

    expect(screen.getByText("Sign In with Google")).toBeInTheDocument();
  });

  it("applies custom className prop to the container", () => {
    renderForm("this-is-custom-className");

    expect(screen.getByTestId("signin-form-container")).toHaveClass(
      "this-is-custom-className",
    );
  });
});

describe("Password visibility toggle", () => {
  it("hides password by default", () => {
    renderForm();

    expect(screen.getByRole("password-input")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("toggles password visibility when eye icon is clicked", async () => {
    renderForm();

    const toggle = screen.getByTestId("password-toggle");
    await userEvent.click(toggle);

    expect(screen.getByRole("password-input")).toHaveAttribute("type", "text");
  });
});
