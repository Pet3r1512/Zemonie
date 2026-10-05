import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Values from "./Values";

const valueTitles = [
  "People First",
  "Trust by Design",
  "Clarity over Complexity",
  "Built for Everyone",
];

describe("Values", () => {
  it("renders the section heading and subtitle", () => {
    render(<Values />);

    expect(screen.getByRole("heading", { name: "What we believe" })).toBeInTheDocument();
    expect(
      screen.getByText("The principles that guide every decision we make"),
    ).toBeInTheDocument();
  });

  it("renders all four value titles", () => {
    render(<Values />);

    valueTitles.forEach((title) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  it("renders each value description", () => {
    render(<Values />);

    expect(
      screen.getByText(/We build for real humans with real financial lives/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Your financial data is sensitive/)).toBeInTheDocument();
    expect(screen.getByText(/Money is already complicated/)).toBeInTheDocument();
    expect(screen.getByText(/Financial wellness shouldn't be a luxury/)).toBeInTheDocument();
  });

  it("renders one icon per value card", () => {
    const { container } = render(<Values />);

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBe(valueTitles.length);
  });
});
