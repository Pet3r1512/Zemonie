import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryTag from "./CategoryTag";

describe("CategoryTag", () => {
  it("displays the category name for a known category id", () => {
    render(<CategoryTag categoryId="1" />);

    expect(screen.getByText("Salary")).toBeInTheDocument();
  });

  it("applies the category color class", () => {
    render(<CategoryTag categoryId="1" />);

    expect(screen.getByText("Salary")).toHaveClass("bg-emerald-500");
  });

  it("displays different category names for different ids", () => {
    render(<CategoryTag categoryId="2" />);
    expect(screen.getByText("Bonus")).toBeInTheDocument();

    render(<CategoryTag categoryId="3" />);
    expect(screen.getByText("Freelance")).toBeInTheDocument();
  });
});
