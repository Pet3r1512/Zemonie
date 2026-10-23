import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FormErrorMessage from "./FormErrorMessage";

describe("FormErrorMessage", () => {
  it("renders the provided message", () => {
    render(<FormErrorMessage message="Invalid email address" />);

    expect(screen.getByTestId("form-error-msg")).toHaveTextContent("Invalid email address");
  });

  it("renders the message inside a paragraph element", () => {
    render(<FormErrorMessage message="Password is required" />);

    const message = screen.getByTestId("form-error-msg");
    expect(message.tagName).toBe("P");
  });

  it("applies the error styling", () => {
    render(<FormErrorMessage message="Something went wrong" />);

    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
  });
});
