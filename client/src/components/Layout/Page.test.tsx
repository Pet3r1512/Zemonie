import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page from "./Page";

vi.mock("./Header", () => ({
  default: ({ hideHeader }: { hideHeader: boolean }) => (
    <div data-testid="header" data-hide-header={String(hideHeader)} />
  ),
}));

vi.mock("./Footer", () => ({
  default: () => <div data-testid="footer" />,
}));

describe("Page", () => {
  it("renders its children", () => {
    render(
      <Page>
        <p>Page content</p>
      </Page>,
    );

    expect(screen.getByText("Page content")).toBeInTheDocument();
  });

  it("renders the header and footer", () => {
    render(<Page>content</Page>);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("renders a main landmark and the page body section", () => {
    render(<Page>content</Page>);

    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("page-body")).toBeInTheDocument();
  });

  it("passes hideHeader to the header", () => {
    render(<Page hideHeader>content</Page>);

    expect(screen.getByTestId("header")).toHaveAttribute("data-hide-header", "true");
  });

  it("defaults hideHeader to false", () => {
    render(<Page>content</Page>);

    expect(screen.getByTestId("header")).toHaveAttribute("data-hide-header", "false");
  });

  it("applies pageName to the page body section", () => {
    render(<Page pageName="custom-page-class">content</Page>);

    expect(screen.getByRole("page-body")).toHaveClass("custom-page-class");
  });

  it("applies className to the inner content container", () => {
    render(<Page className="custom-content-class">content</Page>);

    const section = screen.getByRole("page-body");
    const inner = section.firstElementChild as HTMLElement;

    expect(inner).toHaveClass("custom-content-class");
  });

  it("renders a constrained layout by default", () => {
    render(<Page>content</Page>);

    const section = screen.getByRole("page-body");
    const inner = section.firstElementChild as HTMLElement;

    expect(section).toHaveClass("max-w-360");
    expect(inner).toHaveClass("max-w-7xl");
  });

  it("renders a full-screen layout when fullScreen is set", () => {
    render(<Page fullScreen>content</Page>);

    const section = screen.getByRole("page-body");
    const inner = section.firstElementChild as HTMLElement;

    expect(section).not.toHaveClass("max-w-360");
    expect(inner).toHaveClass("w-screen");
    expect(inner).not.toHaveClass("max-w-7xl");
  });
});
