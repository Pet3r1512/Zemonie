import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import About from "./index";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("About page", () => {
  it("renders the hero heading and tagline", () => {
    render(<About />);

    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByText(/future of personal finance/)).toBeInTheDocument();
    expect(screen.getByText("Zemonie")).toBeInTheDocument();
  });

  it("renders the Values, Timeline and Team sections", () => {
    render(<About />);

    expect(screen.getByRole("heading", { name: "What we believe" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Our journey" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The people behind Zemonie" })).toBeInTheDocument();
  });

  it("renders the CTA section heading", () => {
    render(<About />);

    expect(screen.getByRole("heading", { name: "Join us on the journey" })).toBeInTheDocument();
  });

  it("links 'Get Started Free' to the signup page", () => {
    render(<About />);

    const link = screen.getByRole("link", { name: /Get Started Free/ });
    expect(link).toHaveAttribute("href", "/auth/signup");
  });

  it("links 'Get in Touch' to the GitHub repo in a new tab", () => {
    render(<About />);

    const link = screen.getByRole("link", { name: "Get in Touch" });
    expect(link).toHaveAttribute("href", "https://github.com/Pet3r1512/Zemonie");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
