import { ArrowRightIcon } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-linear-to-br from-primary to-secondary rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to take control of your finances?
          </h2>

          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who are already managing their money smarter.
          </p>

          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            Get Started Free
            <ArrowRightIcon size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
