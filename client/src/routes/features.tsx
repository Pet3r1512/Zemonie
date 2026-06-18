import Features from "@/components/Features";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute, } from "@tanstack/react-router";

export const Route = createFileRoute("/features",)({
  component: RouteComponent,
},);

function RouteComponent() {
  return (
    <>
      <SEO
        title="Features"
        description="Discover powerful features for tracking income, categorising expenses, and visualising your financial data with Zemonie."
        canonicalPath="/features"
      />
      <Page pageName="Features" fullScreen>
        <Features />
      </Page>
    </>
  );
}
