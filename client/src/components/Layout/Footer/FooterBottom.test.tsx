import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FooterBottom from "./FooterBottom";

describe("FooterBottom", () => {
  it("renders the copyright text", () => {
    render(<FooterBottom />);

    expect(screen.getByText(/All rights reserved\./i)).toBeInTheDocument();
    expect(screen.getByText("Zemonie")).toBeInTheDocument();
  });

  it("renders the GitHub link opening in a new tab", () => {
    render(<FooterBottom />);

    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://github.com/Pet3r1512/Zemonie");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
