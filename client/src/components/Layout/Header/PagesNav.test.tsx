import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PagesNav from "./PagesNav";

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
  useLocation: () => ({ pathname: "/features" }),
}));

describe("PagesNav", () => {
  it("renders all main pages including Home, FAQ and Release Notes", () => {
    render(<PagesNav />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about-us");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
    expect(screen.getByRole("link", { name: "Release Notes" })).toHaveAttribute(
      "href",
      "/release-notes",
    );
  });

  it("marks the current page with the active chip style", () => {
    render(<PagesNav />);

    const active = screen.getByRole("link", { name: "Features" });
    expect(active.className).toContain("bg-[#ff7900]/12");
    expect(active.className).toContain("text-primary");

    const inactive = screen.getByRole("link", { name: "Home" });
    expect(inactive.className).not.toContain("bg-[#ff7900]/12");
  });
});
