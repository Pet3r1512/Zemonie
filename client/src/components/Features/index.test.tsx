import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Features from "./index";

describe("Features", () => {
  it("renders the Features page section", () => {
    render(<Features />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Everything you need to\s*master your money/,
    );
    expect(screen.getByText("And there's more")).toBeInTheDocument();
    expect(
      screen.getByText("Ready to take control of your finances?", { exact: false }),
    ).toBeInTheDocument();
  });

  it("renders all feature section headings", () => {
    render(<Features />);

    expect(screen.getByText("Real-time Insights")).toBeInTheDocument();
    expect(screen.getByText("Your Data, Your Rules")).toBeInTheDocument();
  });

  it("renders CTA signup link", () => {
    render(<Features />);

    expect(screen.getByRole("link", { name: /get started free/i })).toHaveAttribute(
      "href",
      "/auth/signup",
    );
  });
});
