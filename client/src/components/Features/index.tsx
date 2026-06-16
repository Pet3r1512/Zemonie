import HeroSection from "./HeroSection";
import MainFeaturesGrid from "./MainFeaturesGrid";
import InteractiveShowcase from "./InteractiveShowcase";
import AdditionalFeatures from "./AdditionalFeatures";
import CTASection from "./CTASection";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grow">
        <HeroSection />
        <MainFeaturesGrid />
        <InteractiveShowcase />
        <AdditionalFeatures />
        <CTASection />
      </main>
    </div>
  );
}
