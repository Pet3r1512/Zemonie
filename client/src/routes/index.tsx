import Features from "@/components/Layout/Home/Features";
import Hero from "@/components/Layout/Home/Hero";
import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import Ferrofluid from "@/components/ui/reactbits/ferro-fluid";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SEO title="Home" canonicalPath="/" />
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
        <Ferrofluid
          colors={["#ff7900", "#ff7900", "#ff7900"]}
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
      </div>
      <Page className="flex flex-col justify-center min-h-screen pb-10 md:pb-0">
        <Hero />
        <Features />
      </Page>
    </>
  );
}
