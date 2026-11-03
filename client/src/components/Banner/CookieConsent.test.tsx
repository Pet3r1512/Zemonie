import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CookieConsent from "./CookieConsent";
import { COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION } from "./useCookieConsent";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, className }: { children?: ReactNode; to: string; className?: string }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

describe("CookieConsent", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the cookie notice when consent has not been given", () => {
    render(<CookieConsent />);

    expect(screen.getByRole("region", { name: /cookie notice/i })).toBeInTheDocument();
    expect(screen.getByText(/essential cookies/i)).toBeInTheDocument();
  });

  it("links to the cookie policy", () => {
    render(<CookieConsent />);

    expect(screen.getByRole("link", { name: /cookie policy/i })).toHaveAttribute(
      "href",
      "/cookie-policy",
    );
  });

  it("hides the notice and stores consent after acknowledging", async () => {
    const user = userEvent.setup();
    render(<CookieConsent />);

    await act(async () => {
      await user.click(screen.getByRole("button", { name: /got it/i }));
    });

    expect(localStorage.getItem(COOKIE_CONSENT_KEY)).toBe(COOKIE_CONSENT_VERSION);
    expect(screen.queryByRole("region", { name: /cookie notice/i })).not.toBeInTheDocument();
  });

  it("does not render when consent was already given", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VERSION);
    render(<CookieConsent />);

    expect(screen.queryByRole("region", { name: /cookie notice/i })).not.toBeInTheDocument();
  });
});
