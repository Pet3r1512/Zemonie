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
  it("renders the old homepage CTA copy", () => {
    render(<CTASection />);

    expect(
      screen.getByRole("heading", { name: "Get started today and achieve your financial goals." }),
    ).toBeInTheDocument();
  });

  it("links Get started to sign-in and Explore features to features", () => {
    render(<CTASection />);

    expect(screen.getByRole("link", { name: /Get started/ })).toHaveAttribute(
      "href",
      "/auth/signin",
    );
    expect(screen.getByRole("link", { name: /Explore features/ })).toHaveAttribute(
      "href",
      "/features",
    );
  });
});
