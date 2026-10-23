import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders a full-screen centered container", () => {
    const { container } = render(<LoadingScreen />);
    const wrapper = container.firstElementChild as HTMLElement;

    expect(wrapper).toHaveClass("w-screen", "h-screen", "flex", "items-center", "justify-center");
  });

  it("renders the loading indicator", () => {
    render(<LoadingScreen />);

    expect(screen.getByRole("status", { name: /loading/i })).toBeInTheDocument();
  });

  it("renders exactly one loading indicator", () => {
    render(<LoadingScreen />);

    expect(screen.getAllByRole("status")).toHaveLength(1);
  });
});
