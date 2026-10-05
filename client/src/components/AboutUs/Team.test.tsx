import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Team from "./Team";

describe("Team", () => {
  it("renders the team badge and section heading", () => {
    render(<Team />);

    expect(screen.getByText("Our Team")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "The people behind Zemonie" })).toBeInTheDocument();
    expect(screen.getByText("A small team with a big vision")).toBeInTheDocument();
  });

  it("renders the member name, role, bio and initials", () => {
    render(<Team />);

    expect(screen.getByText("Peter Pham")).toBeInTheDocument();
    expect(screen.getByText("Founder & CEO")).toBeInTheDocument();
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("PP")).toBeInTheDocument();
  });

  it("links the member name to their profile in a new tab", () => {
    render(<Team />);

    const link = screen.getByRole("link", { name: "Peter Pham" });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/peterpham1512/");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
