import { describe, expect, it } from "vitest";
import FooterTop from "./FooterTop";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("FooterTop", () => {
  it("should render FooterTop container", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FooterTop />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("footertop-container")).toBeInTheDocument();
  });

  it("should render Logo", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FooterTop />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("logo-wrapper")).toBeInTheDocument();
  });

  it("should render correct text content", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FooterTop />
      </QueryClientProvider>,
    );

    const description = screen.getByText(
      /Smart money management for.*Take control of your finances today/,
    );

    expect(description).toHaveTextContent(
      "Smart money management for GenZ. Take control of your finances today.",
    );
  });

  it("should render Common links section", () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <FooterTop />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId("common-links")).toBeInTheDocument();
  });
});
