import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute, } from "@tanstack/react-router";

export const Route = createFileRoute("/terms",)({
  component: RouteComponent,
},);

function RouteComponent() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Zemonie's terms of service — the rules and guidelines for using our personal finance platform."
        canonicalPath="/terms"
      />
      <Page className="py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-0">
          <div className="mb-10">
            <div className="w-16 h-1 bg-primary rounded-full mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Terms of Service
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Last updated: May 2026</p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-dark-bg shadow-2xl p-8 lg:p-10 space-y-8">
            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing or using Zemonie ("the Service"), you agree to be bound by these Terms
                of Service. If you do not agree, please do not use the Service.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                2. Description of Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Zemonie is a free personal finance management tool designed for Gen Z users. The
                Service allows you to:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300">
                <li>Record and categorize your income and expenses</li>
                <li>View analytics and charts based on your transaction data</li>
                <li>Track your spending habits and financial trends</li>
              </ul>
              <div className="mt-4 bg-primary/15 dark:bg-primary/10 border-l-4 border-primary rounded-r-xl p-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                  Zemonie does <strong>not</strong>{" "}
                  collect or store sensitive financial information such as bank account numbers,
                  credit card details, or phone numbers. All transaction data is entered manually by
                  you and used solely for analysis and visualization.
                </p>
              </div>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">3. User Accounts</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials.
                Authentication and session management are handled by Better-Auth. You agree to
                notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                4. User Responsibilities
              </h2>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300">
                <li>You must be at least 13 years of age to use this Service</li>
                <li>You agree to provide accurate information when creating an account</li>
                <li>
                  You are solely responsible for the accuracy of the transaction data you enter
                </li>
                <li>You agree not to misuse the Service for any unlawful purpose</li>
              </ul>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">5. Data Usage</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The transaction data you enter is used exclusively to generate analytics, charts,
                and insights within your dashboard. We do not share your personal financial data
                with third parties. Aggregated, anonymized data may be used to improve the Service.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Zemonie is provided "as is" without any warranty. We are not responsible for any
                financial decisions you make based on the analytics provided by the Service. The
                Service is a tool for visualization and tracking, not financial advice.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                7. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on
                this page with an updated "Last updated" date. Continued use of the Service after
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">8. Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms, please reach out via our{" "}
                <a
                  href="https://github.com/Pet3r1512/Zemonie"
                  target="_blank"
                  className="text-primary hover:text-primary-dark underline underline-offset-2 transition-all duration-150 ease-linear"
                >
                  GitHub repository
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Page>
    </>
  );
}
