import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Hero from "./Hero";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...rest
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));

describe("Home hero", () => {
  it("renders the headline and call to action buttons", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain("Zemonie");
    expect(heading.textContent).toContain("Master Your Money,");
    expect(heading.textContent).toContain("Smarter, Faster, Safer.");

    const started = screen.getAllByRole("link", { name: "Get Started" });
    expect(started.length).toBeGreaterThan(0);
    for (const link of started) {
      expect(link).toHaveAttribute("href", "/auth/signup");
    }
    expect(screen.getByRole("link", { name: "Learn More" })).toHaveAttribute("href", "/features");
  });

  it("does not render its own navigation (site Header provides it)", () => {
    render(<Hero />);

    expect(screen.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
  });

  it("renders the product dashboard preview", () => {
    render(<Hero />);

    expect(screen.getByText("Money managed (since inception)")).toBeInTheDocument();
    expect(screen.getByText("$214,402")).toBeInTheDocument();
    expect(screen.getByText("Daily spending dynamics")).toBeInTheDocument();
    expect(screen.getByText("January 2026")).toBeInTheDocument();
    expect(screen.getByText("Zemonie Pro")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
  });
});
