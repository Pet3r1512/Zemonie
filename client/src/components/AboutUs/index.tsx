import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Lightbulb,
  Shield,
  Globe,
} from "lucide-react";
import Team from "./Team";
import Timeline from "./Timeline";

const values = [
  {
    icon: Heart,
    title: "People First",
    description:
      "We build for real humans with real financial lives. Every decision starts with the question: does this genuinely help our users?",
  },
  {
    icon: Shield,
    title: "Trust by Design",
    description:
      "Your financial data is sensitive. We treat it that way — with transparent practices, strong security, and a strict no-selling policy.",
  },
  {
    icon: Lightbulb,
    title: "Clarity over Complexity",
    description:
      "Money is already complicated. Our job is to make it simpler — never to add another layer of jargon or noise.",
  },
  {
    icon: Globe,
    title: "Built for Everyone",
    description:
      "Financial wellness shouldn't be a luxury. We design for users at every income level, from first paycheck to retirement planning.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
              <Sparkles size={16} className="text-primary mr-2" />
              <span className="text-sm font-medium text-primary">
                Our Story
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              We're building the
              <br />
              <span className="text-primary">future of personal finance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              <strong className="text-primary">Zemonie</strong> started with a
              simple belief: managing money should feel empowering, not
              overwhelming. We're here to make that real.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-gray-50 dark:bg-neutral-800/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-secondary mb-4">
                What we believe
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                The principles that guide every decision we make
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="p-8 rounded-2xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Timeline />
        <Team />

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-linear-to-br from-primary to-secondary rounded-3xl p-12 md:p-16 text-center shadow-2xl">
              <TrendingUp size={48} className="text-white/30 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Join us on the journey
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Whether you're just starting or scaling up, we'd love to help
                you take control of your finances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Started Free
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <a
                  href="https://github.com/Pet3r1512/Zemonie"
                  target="_blank"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border-2 border-white rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
