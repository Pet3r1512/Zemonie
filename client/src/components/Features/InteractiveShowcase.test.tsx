import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InteractiveShowcase from "./InteractiveShowcase";

describe("InteractiveShowcase", () => {
  it("renders the section heading", () => {
    render(<InteractiveShowcase />);

    expect(screen.getByText("See it in action")).toBeInTheDocument();
  });

  it("renders all showcase items", () => {
    render(<InteractiveShowcase />);

    expect(screen.getByText("Real-time Insights")).toBeInTheDocument();
    expect(screen.getByText("Smart Automation")).toBeInTheDocument();
    expect(screen.getByText("Goal Tracking")).toBeInTheDocument();
  });

  it("renders showcase item descriptions", () => {
    render(<InteractiveShowcase />);

    expect(
      screen.getByText(/Get instant visibility into your spending patterns/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Automatically organize and track your transactions/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Set financial goals and watch your progress/)).toBeInTheDocument();
  });
});
