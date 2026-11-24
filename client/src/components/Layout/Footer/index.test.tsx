import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Footer from "./index";

vi.mock("./FooterTop", () => ({
  default: () => <div data-testid="footer-top" />,
}));

vi.mock("./FooterBottom", () => ({
  default: () => <div data-testid="footer-bottom" />,
}));

describe("Footer", () => {
  it("renders a footer landmark", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders the footer top and bottom sections", () => {
    render(<Footer />);

    expect(screen.getByTestId("footer-top")).toBeInTheDocument();
    expect(screen.getByTestId("footer-bottom")).toBeInTheDocument();
  });

  it("renders a divider between the sections", () => {
    const { container } = render(<Footer />);

    expect(container.querySelector(".divider")).toBeInTheDocument();
  });
});
