import HeroSection from "./HeroSection";
import MainFeaturesGrid from "./MainFeaturesGrid";
import InteractiveShowcase from "./InteractiveShowcase";
import AdditionalFeatures from "./AdditionalFeatures";
import CTASection from "./CTASection";

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
