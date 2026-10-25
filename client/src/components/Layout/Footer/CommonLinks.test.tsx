import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CommonLinks from "./CommonLinks";

describe("CommonLinks", () => {
  it("renders all link group headings", () => {
    render(<CommonLinks />);

    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("renders product links", () => {
    render(<CommonLinks />);

    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: "Release Notes" })).toHaveAttribute(
      "href",
      "/release-notes",
    );
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  });

  it("renders company links", () => {
    render(<CommonLinks />);

    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about-us");
  });

  it("renders legal links", () => {
    render(<CommonLinks />);

    expect(screen.getByRole("link", { name: "Terms of Service" })).toHaveAttribute(
      "href",
      "/terms",
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
    expect(screen.getByRole("link", { name: "Cookie Policy" })).toHaveAttribute(
      "href",
      "/cookie-policy",
    );
  });
});
