import { SignUpFormType } from "@/lib/types/signupform";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import SignUpForm from "./SignUpForm";
import { userEvent } from "@storybook/testing-library";

vi.mock("@/api/users/auth/SignUpEmail", () => ({
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
    mutate: vi.fn(async (credential: SignUpFormType) => {
      try {
        const data = {
          email: credential.email,
          name: credential.name,
          password: credential.password,
          confirmPassword: credential.confirmPassword,
        };
        onSuccess?.(data);
      } catch (err) {
        onError?.(err);
      }
    }),
    isPending: false,
  })),
}));

vi.mock("../SignInViaGoogleBtn", () => ({
  default: () => <button>Sign In with Google</button>,
}));

function renderForm(className?: string) {
  return render(<SignUpForm className={className} />);
}

describe("Rendering", () => {
  it("renders the sign up form container", () => {
    renderForm();
    expect(screen.getByTestId("signup-form-container")).toBeInTheDocument();
  });

  it("renders all form fields", () => {
    renderForm();

    expect(screen.getByRole("email-input")).toBeInTheDocument();
    expect(screen.getByRole("name-input")).toBeInTheDocument();
    expect(screen.getByRole("password")).toBeInTheDocument();
    expect(screen.getByRole("confirmPassword")).toBeInTheDocument();
  });

  it("renders the submit button with correct label", () => {
    renderForm();

    expect(screen.getByRole("submit-btn")).toHaveTextContent(
      "Create New Account",
    );
  });

  it("renders the sign in navigation link", () => {
    renderForm();

    const nav = screen.getByRole("signin-nav");
    expect(nav).toBeInTheDocument();
    expect(nav.querySelector("a")).toHaveAttribute("href", "/auth/signin");
  });

  it("renders the Google sign-in button", () => {
    renderForm();

    expect(screen.getByText("Sign In with Google")).toBeInTheDocument();
  });

  it("renders the Calrio brand name", () => {
    renderForm();

    expect(screen.getByTestId("brand-name")).toBeInTheDocument();
    expect(screen.getByTestId("brand-name")).toHaveTextContent("Clario");
  });

  it("applies the className prop to the container", () => {
    renderForm("my-custom-class");

    expect(screen.getByTestId("signup-form-container")).toHaveClass(
      "my-custom-class",
    );
  });
});

describe("Password visibility toggle", () => {
  it("hides password by default", () => {
    renderForm();

    expect(screen.getByRole("password")).toHaveAttribute("type", "password");
  });

  it("toggles password visibility when eye icon is clicked", async () => {
    renderForm();

    const toggle = screen.getByTestId("password-toggle");
    await userEvent.click(toggle);
    expect(screen.getByRole("password")).toHaveAttribute("type", "text");
  });

  it("hides confirm password by default", () => {
    renderForm();

    expect(screen.getByRole("confirmPassword")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("toggles confirm password visibility when eye icon is clicked", async () => {
    renderForm();

    const toggle = screen.getByTestId("confirm-password-toggle");
    await userEvent.click(toggle);
    expect(screen.getByRole("confirmPassword")).toHaveAttribute("type", "text");
  });
});

describe("Email validation", () => {
  it("shows error when email is empty on submit", async () => {
    renderForm();

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Email is required")).toBeInTheDocument();
    });
  });

  it("shows error for invalid email format", async () => {
    renderForm();

    await userEvent.type(
      screen.getByRole("email-input"),
      "example-of-bad-email",
    );
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("accepts a valid email address", async () => {
    renderForm();

    await userEvent.type(
      screen.getByRole("email-input"),
      "exampleofgoodemail@email.com",
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Invalid email address"),
      ).not.toBeInTheDocument();
    });
  });
});

describe("Name input validation", () => {
  it("shows error when name is empty", async () => {
    renderForm();

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Your name is required")).toBeInTheDocument();
    });
  });

  it("shows error when name is too short", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("name-input"), "J");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Name is too short")).toBeInTheDocument();
    });
  });

  it("shows error when name contains invalid characters (such as numbers)", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("name-input"), "NameWithNumbers123");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid name using letters only"),
      ).toBeInTheDocument();
    });
  });

  it("accepts a valid name contains only 1 word", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("name-input"), "Vi");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.queryByText("Your name is required"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Name is too short")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a valid name using letters only"),
      ).not.toBeInTheDocument();
    });
  });

  it("accepts a valid name contains 2 words with space", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("name-input"), "John Doe");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.queryByText("Your name is required"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Name is too short")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a valid name using letters only"),
      ).not.toBeInTheDocument();
    });
  });
});

describe("Password validation", () => {
  it("shows error when the password is too short", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password"), "1234567");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 8 characters long"),
      ).toBeInTheDocument();
    });
  });
});
