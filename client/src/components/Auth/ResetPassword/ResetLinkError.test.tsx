import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ResetLinkError from "./ResetLinkError";

describe("ResetLinkError", () => {
  it("renders the reset link error container", () => {
    render(<ResetLinkError />);

    expect(screen.getByTestId("reset-link-error")).toBeInTheDocument();
  });

  it("displays the invalid or expired link message", () => {
    render(<ResetLinkError />);

    expect(screen.getByText("Link invalid or expired")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This password reset link is no longer valid. Reset links expire after 1 hour and can only be used once.",
      ),
    ).toBeInTheDocument();
  });

  it("provides a link to request a new password reset link", () => {
    render(<ResetLinkError />);

    expect(screen.getByRole("link", { name: /request a new link/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /request a new link/i })).toHaveAttribute(
      "href",
      "/auth/forgot-password",
    );
  });

  it("provides a link to go back to sign in", () => {
    render(<ResetLinkError />);

    expect(screen.getByRole("link", { name: /back to sign in/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to sign in/i })).toHaveAttribute(
      "href",
      "/auth/signin",
    );
  });
});
