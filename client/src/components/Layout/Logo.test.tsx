import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "./Logo";

describe("Logo component test", () => {
  it("should render the logo image with correct src and alt", () => {
    render(<Logo />);

    const img = screen.getByAltText("Clario Logo");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/logo/Full_Logo.png");
    expect(img).toHaveAttribute("alt", "Clario Logo");
  });
});
