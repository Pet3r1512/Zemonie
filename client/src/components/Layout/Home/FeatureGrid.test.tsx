import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FeatureGrid from "./FeatureGrid";

describe("FeatureGrid", () => {
  it("renders the section heading and lede", () => {
    render(<FeatureGrid />);

    expect(
      screen.getByRole("heading", { name: /Built for privacy\s*,\s*designed for\s*you/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/No bank logins, no data mining/)).toBeInTheDocument();
  });

  it("renders the six highlight cards", () => {
    render(<FeatureGrid />);

    expect(screen.getByText("Free & Open Source. Forever.")).toBeInTheDocument();
    expect(screen.getByText("Finance, But Fun")).toBeInTheDocument();
    expect(screen.getByText("Your Amounts Stay Yours")).toBeInTheDocument();
    expect(screen.getByText("You're In Control")).toBeInTheDocument();
    expect(screen.getByText("Recurring Transactions")).toBeInTheDocument();
    expect(screen.getByText("Shareable Achievements")).toBeInTheDocument();
  });
});
