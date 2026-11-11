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

    expect(screen.getAllByText("Dashboard").length).toBeGreaterThan(0);
    expect(screen.getByText("OVERVIEW")).toBeInTheDocument();
    expect(screen.getByText("Money Moves")).toBeInTheDocument();
    expect(screen.getByText("Budgets")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("+ Add")).toBeInTheDocument();
    expect(screen.getByText("Welcome back, Alex")).toBeInTheDocument();
    expect(screen.getByText("Total Balance")).toBeInTheDocument();
    expect(screen.getByText("A$12,480.50")).toBeInTheDocument();
    expect(screen.getByText("Net Savings")).toBeInTheDocument();
    expect(screen.getByText("Latest Income")).toBeInTheDocument();
    expect(screen.getByText("Latest Expense")).toBeInTheDocument();
    expect(screen.getByText("Income vs Expenses")).toBeInTheDocument();
    expect(screen.getByText("Spending by Category")).toBeInTheDocument();
    expect(screen.getByText("Last 7 Days Spendings")).toBeInTheDocument();
    expect(screen.queryByText("Zemonie Pro")).not.toBeInTheDocument();
  });
});
