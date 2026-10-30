import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, beforeEach } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders the theme toggle checkbox", () => {
    render(<ThemeToggle />);

    expect(screen.getByRole("checkbox", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("toggles theme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggle = screen.getByRole("checkbox", { name: /toggle theme/i });
    await user.click(toggle);

    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("persists theme preference to localStorage", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggle = screen.getByRole("checkbox", { name: /toggle theme/i });
    await user.click(toggle);
    await user.click(toggle);

    expect(localStorage.getItem("theme")).toBe("light");
  });
});
