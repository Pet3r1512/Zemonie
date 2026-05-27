import SEO from "@/components/SEO";
import About from "@/components/AboutUs";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about-us")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Zemonie — the team building the future of personal finance for Gen Z."
        canonicalPath="/about-us"
      />
      <Page pageName="About Us" fullScreen>
        <About />
      </Page>
    </>
  );
}
