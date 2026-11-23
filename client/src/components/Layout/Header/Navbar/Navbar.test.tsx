import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar from "./Navbar";

vi.mock("@/components/ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle" />,
}));

describe("Navbar", () => {
  it("renders the navigation list", () => {
    render(<Navbar />);

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    render(<Navbar />);

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("renders auth links with the correct hrefs", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Log In" })).toHaveAttribute("href", "/auth/signin");
    expect(screen.getByRole("link", { name: "Sign Up" })).toHaveAttribute("href", "/auth/signup");
  });

  it("renders each navigation entry as a list item", () => {
    render(<Navbar />);

    expect(within(screen.getByTestId("navbar")).getAllByRole("listitem")).toHaveLength(2);
  });

  it("highlights only the Sign Up link", () => {
    render(<Navbar />);

    const signUp = screen.getByRole("link", { name: "Sign Up" });
    expect(signUp.className).toContain("font-semibold");
    expect(signUp.getAttribute("style")).toContain("linear-gradient");

    const logIn = screen.getByRole("link", { name: "Log In" });
    expect(logIn.className).not.toContain("font-semibold");
    expect(logIn.getAttribute("style")).toBeNull();
  });
});
