import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTheme } from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";

vi.mock("../hooks/useTheme", () => ({
  useTheme: vi.fn(),
}));

const mockUseTheme = vi.mocked(useTheme);
const toggleTheme = vi.fn();

beforeEach(() => {
  toggleTheme.mockClear();
  mockUseTheme.mockReturnValue({ theme: "light", toggleTheme });
});

describe("ThemeToggle", () => {
  it("renders an accessible checkbox", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("checkbox", { name: "Toggle theme" })).toBeInTheDocument();
  });

  it("is unchecked in light mode", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("is checked in dark mode", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", toggleTheme });
    render(<ThemeToggle />);

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls toggleTheme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("checkbox"));

    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
