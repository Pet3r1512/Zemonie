import { HelmetProvider } from "react-helmet-async";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SEO from "./SEO";

describe("SEO", () => {
  it("renders the page title with site suffix", () => {
    render(
      <HelmetProvider>
        <SEO title="Dashboard" />
      </HelmetProvider>,
    );

    expect(document.querySelector("title")?.textContent).toBe("Dashboard | Zemonie");
  });

  it("renders meta description", () => {
    render(
      <HelmetProvider>
        <SEO title="Dashboard" />
      </HelmetProvider>,
    );

    const meta = document.querySelector('meta[name="description"]');
    expect(meta).toBeInTheDocument();
    expect(meta?.getAttribute("content")).toContain("Zemonie is the all-in-one money management");
  });

  it("renders canonical URL", () => {
    render(
      <HelmetProvider>
        <SEO title="Dashboard" canonicalPath="/dashboard" />
      </HelmetProvider>,
    );

    const link = document.querySelector('link[rel="canonical"]');
    expect(link).toBeInTheDocument();
    expect(link?.getAttribute("href")).toBe("https://www.zemonie.site/dashboard");
  });

  it("renders Open Graph tags", () => {
    render(
      <HelmetProvider>
        <SEO title="Dashboard" />
      </HelmetProvider>,
    );

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(
      "Dashboard | Zemonie",
    );
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe(
      "website",
    );
  });
});
