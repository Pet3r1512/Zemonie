import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CTASection from "./CTASection";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("CTASection", () => {
  it("renders the CTA heading", () => {
    render(<CTASection />);

    expect(screen.getByText(/Ready to take control of your finances\?/i)).toBeInTheDocument();
  });

  it("renders the CTA description", () => {
    render(<CTASection />);

    expect(
      screen.getByText(/Join thousands of users who are already managing their money smarter./i),
    ).toBeInTheDocument();
  });

  it("renders the Get Started Free link pointing to sign-up", () => {
    render(<CTASection />);

    const link = screen.getByRole("link", { name: /get started free/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/auth/signup");
  });
});
