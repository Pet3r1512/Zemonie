import Features from "@/components/Layout/Home/Features";
import Hero from "@/components/Layout/Home/Hero";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import FloatingLines from "@/components/ui/reactbits/floating-lines";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SEO title="Home" canonicalPath="/" />
      <FloatingLines
        {...({
          enabledWaves: ["top", "middle", "bottom"],
          lineCount: 8,
          lineDistance: 8,
          bendRadius: 8,
          bendStrength: -2,
          interactive: true,
          parallax: true,
          animationSpeed: 1,
          mixBlendMode: "normal",
          linesGradient: ["#ff7900", "#d9d9d9", "#f79d65"],
        } as any)}
      />
      <Page className="flex flex-col justify-center min-h-screen pb-10 md:pb-0">
        <Hero />
        <Features />
      </Page>
    </>
  );
}
