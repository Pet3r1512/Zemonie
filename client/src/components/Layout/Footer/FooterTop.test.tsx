import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FooterTop from "./FooterTop";

vi.mock("@/components/Banner/VersionTag", () => ({
  default: () => <div data-testid="version-tag">v1.0.0</div>,
}));

vi.mock("../Logo", () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock("./CommonLinks", () => ({
  default: () => <div data-testid="common-links">CommonLinks</div>,
}));

describe("FooterTop", () => {
  it("renders the footer top container", () => {
    render(<FooterTop />);

    expect(screen.getByTestId("footertop-container")).toBeInTheDocument();
  });

  it("renders the logo", () => {
    render(<FooterTop />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<FooterTop />);

    expect(screen.getByText(/Smart money management for/)).toBeInTheDocument();
    expect(screen.getByText("GenZ")).toBeInTheDocument();
  });

  it("renders the version tag", () => {
    render(<FooterTop />);

    expect(screen.getByTestId("version-tag")).toBeInTheDocument();
  });

  it("renders common links", () => {
    render(<FooterTop />);

    expect(screen.getByTestId("common-links")).toBeInTheDocument();
  });
});
