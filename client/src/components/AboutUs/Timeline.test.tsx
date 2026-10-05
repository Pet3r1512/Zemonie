import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Timeline from "./Timeline";

const milestones = [
  { year: "2024", title: "The Beginning" },
  { year: "2025", title: "Product Development" },
  { year: "April 2026", title: "Closed Beta Launch" },
  { year: "May 2026", title: "Open Beta Release" },
  { year: "Sep 2026", title: "Official Release 🚀" },
];

describe("Timeline", () => {
  it("renders the section heading and subtitle", () => {
    render(<Timeline />);

    expect(screen.getByRole("heading", { name: "Our journey" })).toBeInTheDocument();
    expect(screen.getByText("From idea to impact")).toBeInTheDocument();
  });

  it("renders all milestone years", () => {
    render(<Timeline />);

    milestones.forEach(({ year }) => {
      expect(screen.getByText(year)).toBeInTheDocument();
    });
  });

  it("renders all milestone titles", () => {
    render(<Timeline />);

    milestones.forEach(({ title }) => {
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    });
  });

  it("renders each milestone description", () => {
    render(<Timeline />);

    expect(screen.getByText(/Zemonie was founded with a simple vision/)).toBeInTheDocument();
    expect(screen.getByText(/The core product began taking shape/)).toBeInTheDocument();
    expect(screen.getByText(/The first closed beta was released/)).toBeInTheDocument();
    expect(screen.getByText(/Zemonie opened its beta access to the public/)).toBeInTheDocument();
    expect(screen.getByText(/Zemonie launches its first official version/)).toBeInTheDocument();
  });

  it("highlights the last milestone with a ping indicator", () => {
    const { container } = render(<Timeline />);

    expect(container.querySelector(".animate-ping")).toBeInTheDocument();
  });

  it("applies the highlighted border only to the last milestone", () => {
    const { container } = render(<Timeline />);

    const highlighted = container.querySelectorAll(".border-primary.border-2");
    expect(highlighted.length).toBe(1);
  });
});
