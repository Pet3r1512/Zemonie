import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FooterBottom from "./FooterBottom";

describe("FooterBottom", () => {
  it("renders the copyright text", () => {
    render(<FooterBottom />);

    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    expect(screen.getByText("Zemonie")).toBeInTheDocument();
  });

  it("renders the GitHub link", () => {
    render(<FooterBottom />);

    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/Pet3r1512/Zemonie",
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("target", "_blank");
  });

  it("displays the current year", () => {
    render(<FooterBottom />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
