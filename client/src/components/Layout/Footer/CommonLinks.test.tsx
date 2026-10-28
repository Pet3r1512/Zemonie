import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CommonLinks from "./CommonLinks";

describe("CommonLinks", () => {
  it("renders the common links section", () => {
    render(<CommonLinks />);

    expect(screen.getByTestId("common-links")).toBeInTheDocument();
  });

  it("renders product links", () => {
    render(<CommonLinks />);

    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Features" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Release Notes" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "FAQ" })).toBeInTheDocument();
  });

  it("renders company links", () => {
    render(<CommonLinks />);

    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About Us" })).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<CommonLinks />);

    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Terms of Service" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cookie Policy" })).toBeInTheDocument();
  });

  it("links have correct hrefs", () => {
    render(<CommonLinks />);

    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/features");
    expect(screen.getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about-us");
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
});
