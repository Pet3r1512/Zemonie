import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "./Logo";

describe("Logo component test", () => {
  it("should render the logo image with correct src and alt", () => {
    render(<Logo />);

    const img = screen.getByAltText("Zemonie Logo");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/logo/zemonie_logo.webp");
    expect(img).toHaveAttribute("alt", "Zemonie Logo");
  });
});
