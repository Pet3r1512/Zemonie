import FeatureCards from "./FeatureCards";

export default function Features() {
  return (
    <section
      aria-label="features-section"
      className="lg:my-24 text-center max-w-6xl mx-auto space-y-6"
    >
      <h1
        role="heading"
        className="text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl"
      >
        Powerful <strong className="text-primary">Features</strong>
      </h1>
      <p
        role="description"
        className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
      >
        Everything you need to manage your money effectively in one place
      </p>
      <FeatureCards />
    </section>
  );
}
