import { Release } from "@/components/Banner/Release";
import SEO, { SITE_URL } from "@/components/SEO";
import { warmupDb } from "@/lib/ping";
import { createRootRoute, Outlet } from "@tanstack/react-router";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zemonie",
  url: SITE_URL,
  description:
    "Zemonie is the all-in-one money management tool for Gen Z. Track income, label expenses, and visualise your financial data.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zemonie",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/zemonie_logo.webp`,
  description: "Personal finance management tool for Gen Z. Free, privacy-first, and easy to use.",
};

export const Route = createRootRoute({
  beforeLoad: () => {
    warmupDb();
  },
  component: () => (
    <>
      <SEO
        title="Finance Assistant for Gen Z"
        canonicalPath="/"
        jsonLd={[websiteSchema, organizationSchema] as unknown as Record<string, unknown>}
      />
      <Release />
      <Outlet />
    </>
  ),
});
