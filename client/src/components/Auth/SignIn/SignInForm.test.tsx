import { SignInFormType } from "@/lib/types/signinform";
import { useMutation } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { vi } from "vitest";
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
