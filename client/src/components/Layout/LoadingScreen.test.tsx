import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("renders the loading screen container", () => {
    render(<LoadingScreen />);

    expect(screen.getByTestId("loading-screen")).toBeInTheDocument();
  });
});
