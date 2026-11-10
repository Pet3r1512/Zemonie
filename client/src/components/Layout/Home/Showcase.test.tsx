import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Showcase from "./Showcase";

describe("Showcase", () => {
  it("renders the dashboard screenshot", () => {
    render(<Showcase />);

    expect(screen.getByAltText("Zemonie dashboard screenshot")).toBeInTheDocument();
    expect(screen.getByAltText("Zemonie dashboard screenshot")).toHaveAttribute(
      "src",
      "/screenshots/Dashboard-dark.webp",
    );
  });

  it("renders inside a labelled section", () => {
    render(<Showcase />);

    expect(screen.getByLabelText("dashboard-preview")).toBeInTheDocument();
  });
});
