import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AdditionalFeatures from "./AdditionalFeatures";

describe("AdditionalFeatures", () => {
  it("renders all feature cards", () => {
    render(<AdditionalFeatures />);

    expect(screen.getByText("Your Data, Your Rules")).toBeInTheDocument();
    expect(screen.getByText("Instant Sync Everywhere")).toBeInTheDocument();
    expect(screen.getByText("Smart Recurring Tracking")).toBeInTheDocument();
    expect(screen.getByText("Budget & Savings")).toBeInTheDocument();
    expect(screen.getByText("Level Up Your Money Game")).toBeInTheDocument();
    expect(screen.getByText("Shareable Reports")).toBeInTheDocument();
  });

  it("renders feature badges", () => {
    render(<AdditionalFeatures />);

    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("Developing")).toBeInTheDocument();
    expect(screen.getAllByText("Coming Soon")).toHaveLength(2);
  });

  it("renders the section heading", () => {
    render(<AdditionalFeatures />);

    expect(screen.getByText("And there's more")).toBeInTheDocument();
  });
});
