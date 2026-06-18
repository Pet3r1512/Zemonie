import AdditionalFeatures from "./AdditionalFeatures";
import CTASection from "./CTASection";
import HeroSection from "./HeroSection";
import InteractiveShowcase from "./InteractiveShowcase";
import MainFeaturesGrid from "./MainFeaturesGrid";

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
