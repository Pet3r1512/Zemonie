import Features from "@/components/Layout/Home/Features";
import Hero from "@/components/Layout/Home/Hero";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Page className="flex items-center justify-center min-h-screen">
      <section className="flex flex-col gap-y-24 my-24 lg:my-0">
        <Hero />
        <Features />
      </section>
    </Page>
  );
}
