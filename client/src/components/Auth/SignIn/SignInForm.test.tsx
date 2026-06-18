/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignInFormType } from "@/lib/types/signinform";
import { userEvent } from "@storybook/testing-library";
import { useMutation } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { describe, it, vi } from "vitest";
import SignInForm from "./SignInForm";

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

    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
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

    expect(screen.getByTestId("signin-form-container")).toHaveClass("this-is-custom-className");
  });
});

describe("Password visibility toggle", () => {
  it("hides password by default", () => {
    renderForm();

    expect(screen.getByRole("password-input")).toHaveAttribute("type", "password");
  });

  it("toggles password visibility when eye icon is clicked", async () => {
    renderForm();

    const toggle = screen.getByTestId("password-toggle");
    await userEvent.click(toggle);

    expect(screen.getByRole("password-input")).toHaveAttribute("type", "text");
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

  it("accepts valid email address", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("email-input"), "thisisvalid@email.com");

    await waitFor(() => {
      expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
    });
  });

  it("shows error when email is invalid", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("email-input"), "thisisbademail");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.queryByText("Invalid email address")).toBeInTheDocument();
    });
  });
});

describe("Password validation", () => {
  it("shows error when password is too short", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password-input"), "1234567");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    });
  });

  it("shows error when password is empty", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("email-input"), "validemail@gmail.com");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });
});

const mockUseMutation = useMutation as ReturnType<typeof vi.fn>;

function buildMutation(overrides: Partial<{ isPending: boolean; mutateFn: () => void }> = {}) {
  const mutateFn = overrides.mutateFn ?? vi.fn();

  mockUseMutation.mockImplementation(() => ({
    mutate: mutateFn,
    isPending: overrides.isPending ?? false,
  }));

  return { mutateFn };
}

async function fillForm({
  email = "test@email.com",
  password = "Passwordvalid",
}: Partial<{
  email: string;
  password: string;
}> = {}) {
  const user = userEvent.setup();

  if (email) await user.type(screen.getByRole("email-input"), email);
  if (password) await user.type(screen.getByRole("password-input"), password);

  return user;
}

describe("Form submission", () => {
  it("calls mutate with the correct credentials on valid submit", async () => {
    const mutateFn = vi.fn();

    buildMutation({ mutateFn });
    renderForm();

    await fillForm();
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mutateFn).toHaveBeenCalledWith({
        email: "test@email.com",
        password: "Passwordvalid",
      });
    });
  });

  it("DOES NOT CALL mutate when form is invalid", async () => {
    const mutateFn = vi.fn();

    buildMutation({ mutateFn });
    renderForm();

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mutateFn).not.toHaveBeenCalled();
    });
  });

  it("diables submit button when mutation is pending", () => {
    buildMutation({ isPending: true });
    renderForm();

    expect(screen.getByRole("submit-btn")).toBeDisabled();
  });

  it("shows a spinner and hides label while mutation is pending", () => {
    buildMutation({ isPending: true });
    renderForm();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("Sign In")).not.toBeInTheDocument();
  });
});

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  Link: vi.fn(({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  )),
  useRouter: () => ({
    navigate: mockNavigate,
  }),
  createRouter: vi.fn(),
}));

describe("onSuccess callback tests", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("navigates to dashboard on success", async () => {
    mockUseMutation.mockImplementation(({ onSuccess }: any) => ({
      mutate: () => onSuccess({}),
      isPending: false,
    }));

    const user = userEvent.setup({ delay: null });
    renderForm();

    await user.type(screen.getByRole("email-input"), "test@email.com");
    await user.type(screen.getByRole("password-input"), "Passwordvalid");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({
        to: "/dashboard",
      });
    });
  });
});

describe("onError callback tests", () => {
  it("shows a generic toast for sign in failed", async () => {
    mockUseMutation.mockImplementation(({ onError }: any) => ({
      mutate: () =>
        onError({
          code: "UNKNOWN_ERROR",
          message: "Sign in failed",
        }),
      isPending: false,
    }));

    renderForm();

    await fillForm();
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Sign in failed");
    });
  });
});
