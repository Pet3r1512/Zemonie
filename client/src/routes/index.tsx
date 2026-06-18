import Features from "@/components/Layout/Home/Features";
import Hero from "@/components/Layout/Home/Hero";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SEO title="Home" canonicalPath="/" />
      <Page className="flex flex-col justify-center min-h-screen pb-10 md:pb-0">
        <Hero />
        <Features />
      </Page>
    </>
  );
}
