import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MainFeaturesGrid from "./MainFeaturesGrid";

describe("MainFeaturesGrid", () => {
  it("renders all feature cards", () => {
    render(<MainFeaturesGrid />);

    expect(screen.getByText("Transaction Tracking")).toBeInTheDocument();
    expect(screen.getByText("Category Management")).toBeInTheDocument();
    expect(screen.getByText("Spending Analysis")).toBeInTheDocument();
    expect(screen.getByText("Visual Reports")).toBeInTheDocument();
  });

  it("renders feature benefits lists", () => {
    render(<MainFeaturesGrid />);

    expect(screen.getByText("Add, edit & delete entries")).toBeInTheDocument();
    expect(screen.getByText("Recurring transactions")).toBeInTheDocument();
    expect(screen.getByText("Predefined categories")).toBeInTheDocument();
    expect(screen.getByText("Income vs expense view")).toBeInTheDocument();
    expect(screen.getByText("Monthly summaries")).toBeInTheDocument();
    expect(screen.getByText("Category breakdowns")).toBeInTheDocument();
  });

  it("renders feature descriptions", () => {
    render(<MainFeaturesGrid />);

    expect(
      screen.getByText(/Your finances at a glance\. Pie charts, bar charts, and a clean dashboard/),
    ).toBeInTheDocument();
  });
});
