import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HeroSection from "./HeroSection";

describe("HeroSection", () => {
  it("renders the hero heading", () => {
    render(<HeroSection />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Everything you need to\s*master your money/,
    );
  });

  it("renders the Sparkles feature label", () => {
    render(<HeroSection />);

    expect(screen.getByText("Powerful Features")).toBeInTheDocument();
  });

  it("renders the hero description", () => {
    render(<HeroSection />);

    expect(
      screen.getByText(
        /Powerful tools and intelligent insights to help you take control of your financial future./i,
      ),
    ).toBeInTheDocument();
  });
});
