import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { Release } from "./Release";

const mockSetVisible = vi.fn();

vi.mock("@/hooks/useCurrentUrl", () => ({
  useCurrentUrl: () => ({ currUrl: "/" }),
}));

vi.mock("@/components/Banner/useReleaseBanner", () => ({
  RELEASE_BANNER_KEY: "zemonie-release-banner-dismissed",
  useReleaseBannerVisible: () => [true, mockSetVisible],
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, onClick, className }: any) => (
    <a href={to} onClick={onClick} className={className}>
      {children}
    </a>
  ),
}));

describe("Release banner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders the release banner message", () => {
    render(<Release />);

    expect(screen.getByText("Zemonie official version is out now.")).toBeInTheDocument();
  });

  it("renders the try it out link", () => {
    render(<Release />);

    expect(screen.getByRole("link", { name: /try it out/i })).toBeInTheDocument();
  });

  it("dismisses the banner on close button click", async () => {
    const user = userEvent.setup();
    render(<Release />);

    await user.click(screen.getByRole("button", { name: /dismiss/i }));

    expect(localStorage.getItem("zemonie-release-banner-dismissed")).toBe("true");
    expect(mockSetVisible).toHaveBeenCalledWith(false);
  });
});
