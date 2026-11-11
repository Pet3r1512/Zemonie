import CTASection from "@/components/Layout/Home/CTASection";
import FeatureGrid from "@/components/Layout/Home/FeatureGrid";
import Hero from "@/components/Layout/Home/Hero";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import SEO from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <SEO title="Home" canonicalPath="/" />
      <Header hideHeader={false} />
      <Hero />
      {/* <Showcase /> */}
      <FeatureGrid />
      <CTASection />
      <Footer />
    </>
  );
}
