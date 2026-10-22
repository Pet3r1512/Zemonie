import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SignInViaGoogleBtn from "./SignInViaGoogleBtn";

describe("SignInViaGoogleBtn", () => {
  it("renders the Google sign-in button", () => {
    render(<SignInViaGoogleBtn />);

    expect(screen.getByRole("button", { name: /login with google/i })).toBeInTheDocument();
  });

  it("renders the button as disabled", () => {
    render(<SignInViaGoogleBtn />);

    expect(screen.getByRole("button", { name: /login with google/i })).toBeDisabled();
  });

  it("renders the coming soon badge", () => {
    render(<SignInViaGoogleBtn />);

    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("renders the Google logo", () => {
    const { container } = render(<SignInViaGoogleBtn />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
