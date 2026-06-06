import { SignInFormType } from "@/lib/types/signinform";
import { useMutation } from "@tanstack/react-query";
import { vi } from "vitest";

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
