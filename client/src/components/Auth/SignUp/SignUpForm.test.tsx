/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignUpFormType } from "@/lib/types/signupform";
import { userEvent } from "@storybook/testing-library";
import { useMutation } from "@tanstack/react-query";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { toast } from "sonner";
import { describe, it, vi } from "vitest";
import SignUpForm from "./SignUpForm";

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
          terms: true,
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

    expect(screen.getByRole("submit-btn")).toHaveTextContent("Create New Account");
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

  it("applies the className prop to the container", () => {
    renderForm("my-custom-class");

    expect(screen.getByTestId("signup-form-container")).toHaveClass("my-custom-class");
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

    expect(screen.getByRole("confirmPassword")).toHaveAttribute("type", "password");
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

    await userEvent.type(screen.getByRole("email-input"), "example-of-bad-email");
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });
  });

  it("accepts a valid email address", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("email-input"), "exampleofgoodemail@email.com");

    await waitFor(() => {
      expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
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
      expect(screen.getByText("Please enter a valid name using letters only")).toBeInTheDocument();
    });
  });

  it("accepts a valid name contains only 1 word", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("name-input"), "Vi");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.queryByText("Your name is required")).not.toBeInTheDocument();
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
      expect(screen.queryByText("Your name is required")).not.toBeInTheDocument();
      expect(screen.queryByText("Name is too short")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Please enter a valid name using letters only"),
      ).not.toBeInTheDocument();
    });
  });

  it("accepts a valid Vietnames name with space", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("name-input"), "Hùng Thúy");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.queryByText("Your name is required")).not.toBeInTheDocument();
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
      expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    });
  });

  it("shows error when the password has no number", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password"), "passwordwithoutnumber");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Minimum 8 characters, at least one letter and one number"),
      ).toBeInTheDocument();
    });
  });

  it("shows error when the password has no letter", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password"), "12345678910");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("Minimum 8 characters, at least one letter and one number"),
      ).toBeInTheDocument();
    });
  });

  it("accepts a valid password", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password"), "avalidpassword123");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.queryByText("Password must be at least 8 characters long"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Minimum 8 characters, at least one letter and one number"),
      ).not.toBeInTheDocument();
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

describe("Confirm password validation", () => {
  it("shows error when password and confirm password do not match", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password"), "password1");
    await userEvent.type(screen.getByRole("confirmPassword"), "password2");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByText("The passwords do not match")).toBeInTheDocument();
    });
  });

  it("accepts when password and confirm password match", async () => {
    renderForm();

    await userEvent.type(screen.getByRole("password"), "validpassword123");
    await userEvent.type(screen.getByRole("confirmPassword"), "validpassword123");

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.queryByText("The passwords do not match")).not.toBeInTheDocument();
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
  email = "test@example.com",
  name = "John Doe",
  password = "Password1",
  confirmPassword = "Password1",
  terms = true,
}: Partial<{
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}> = {}) {
  const user = userEvent.setup();
  if (email) await user.type(screen.getByRole("email-input"), email);
  if (name) await user.type(screen.getByRole("name-input"), name);
  if (password) await user.type(screen.getByRole("password"), password);
  if (confirmPassword) {
    await user.type(screen.getByRole("confirmPassword"), confirmPassword);
  }
  if (terms) await user.click(screen.getByRole("checkbox"));
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
        email: "test@example.com",
        name: "John Doe",
        password: "Password1",
        confirmPassword: "Password1",
        terms: true,
      });
    });
  });

  it("will NOT call mutate when form is invalid", async () => {
    const mutateFn = vi.fn();
    buildMutation({ mutateFn });
    renderForm();

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mutateFn).not.toHaveBeenCalled();
    });
  });

  it("disables submit button when mutation is pending", () => {
    buildMutation({ isPending: true });
    renderForm();
    expect(screen.getByRole("submit-btn")).toBeDisabled();
  });

  it("shows a spinner and hides label while mutation is pending", () => {
    buildMutation({ isPending: true });
    renderForm();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByText("Create New Account")).not.toBeInTheDocument();
  });
});

const mockNavigate = vi.fn();

vi.mock("@tanstack/react-router", () => ({
  Link: vi.fn(({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  )),
  useRouter: () => ({ navigate: mockNavigate }),
  createRouter: vi.fn(),
}));

describe("onSuccess callback tests", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls toast.success with the user's name", async () => {
    mockUseMutation.mockImplementation(({ onSuccess }: any) => ({
      mutate: () => onSuccess({ user: { name: "Hana" } }),
      isPending: false,
    }));

    renderForm();
    await fillForm();
    fireEvent.submit(screen.getByRole("form"));

    act(() => vi.advanceTimersByTime(1250));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Hana, Everything is done!");
    });
  });

  it("navigates to dashboard after 1250ms on success", async () => {
    mockUseMutation.mockImplementation(({ onSuccess }: any) => ({
      mutate: () => onSuccess({ user: { name: "Peter" } }),
      isPending: false,
    }));
    const user = userEvent.setup({ delay: null });
    renderForm();

    await user.type(screen.getByRole("email-input"), "test@example.com");
    await user.type(screen.getByRole("name-input"), "John Doe");
    await user.type(screen.getByRole("password"), "Password1");
    await user.type(screen.getByRole("confirmPassword"), "Password1");
    await user.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    act(() => vi.advanceTimersByTime(1250));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: "/dashboard" });
    });
  });
});

describe("onError callback", () => {
  it("shows a specific toast when USER_ALREADY_EXISTS error is thrown", async () => {
    mockUseMutation.mockImplementation(({ onError }: any) => ({
      mutate: () =>
        onError({
          code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
          message: "User already exists",
        }),
      isPending: false,
    }));

    renderForm();

    await fillForm();
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "This Email Is Existed. Please Sign In or Use Another Email",
      );
    });
  });

  it("shows a generic toast for unknown errors", async () => {
    mockUseMutation.mockImplementation(({ onError }: any) => ({
      mutate: () =>
        onError({
          code: "UNKNOWN_ERROR",
          message: "Something went wrong",
        }),
      isPending: false,
    }));

    renderForm();

    await fillForm();
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Something went wrong");
    });
  });

  it("keeps the sign up form visible after a failed submit", async () => {
    mockUseMutation.mockImplementation(({ onError }: any) => ({
      mutate: () =>
        onError({
          code: "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL",
          message: "User already exists",
        }),
      isPending: false,
    }));

    renderForm();

    await fillForm();
    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(screen.getByRole("submit-btn")).toBeInTheDocument();
      expect(screen.getByTestId("signup-form-container")).toBeInTheDocument();
    });
  });
});
