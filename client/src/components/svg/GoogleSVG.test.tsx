import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GoogleSVG from "./GoogleSVG";

describe("GoogleSVG", () => {
  it("renders the Google SVG icon", () => {
    const { container } = render(<GoogleSVG />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
  });

  it("has the correct viewBox", () => {
    const { container } = render(<GoogleSVG />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("viewBox", "-0.5 0 48 48");
  });

  it("contains Google color paths", () => {
    const { container } = render(<GoogleSVG />);
    const paths = container.querySelectorAll("path");

    expect(paths.length).toBeGreaterThan(0);
  });
});
