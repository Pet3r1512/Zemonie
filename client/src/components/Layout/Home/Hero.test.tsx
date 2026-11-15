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

    expect(screen.getByRole("link", { name: "Get Started" })).toHaveAttribute(
      "href",
      "/auth/signup",
    );
    expect(screen.getByRole("link", { name: "Learn More" })).toHaveAttribute("href", "/features");
  });

  it("does not render its own navigation (site Header provides it)", () => {
    render(<Hero />);

    expect(screen.queryByRole("navigation", { name: "Main" })).not.toBeInTheDocument();
  });

  it("renders light and dark dashboard screenshots, switched by theme", () => {
    render(<Hero />);

    const light = screen.getByAltText("Zemonie dashboard preview");
    const dark = screen.getByAltText("Zemonie dashboard preview in dark mode");

    expect(light).toHaveAttribute("src", "/screenshots/Hero-dashboard-light.webp");
    expect(light).toHaveClass("dark:hidden");
    expect(dark).toHaveAttribute("src", "/screenshots/Hero-dashboard-dark.webp");
    expect(dark).toHaveClass("hidden", "dark:block");
  });

  it("lazy-loads both screenshots so the hidden theme variant is not fetched", () => {
    render(<Hero />);

    expect(screen.getByAltText("Zemonie dashboard preview")).toHaveAttribute("loading", "lazy");
    expect(screen.getByAltText("Zemonie dashboard preview in dark mode")).toHaveAttribute(
      "loading",
      "lazy",
    );
  });
});
