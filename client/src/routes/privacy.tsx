import SEO from "@/components/SEO";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Zemonie's privacy policy — learn how we collect, use, and protect your personal data."
        canonicalPath="/privacy"
      />
      <Page className="py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-0">
          <div className="mb-10">
            <div className="w-16 h-1 bg-primary rounded-full mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Privacy Policy
            </h1>
            <p className="text-gray-500 mt-2">Last updated: May 2026</p>
          </div>

        <div className="rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl p-8 lg:p-10 space-y-8">
          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We collect only the information necessary to provide the Service:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Account Information:</strong> Your name, email address,
                and avatar selection when you create an account
              </li>
              <li>
                <strong>Transaction Data:</strong> Income and expense records
                you voluntarily enter, including amounts, categories,
                descriptions, and dates
              </li>
              <li>
                <strong>Session Data:</strong> Authentication session tokens
                managed by Better-Auth to keep you logged in
              </li>
            </ul>
            <div className="mt-4 bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 rounded-r-xl p-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium">
                We do <strong>not</strong> collect:
              </p>
              <ul className="list-disc pl-5 mt-1.5 space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
                <li>Bank account numbers or financial institution details</li>
                <li>Phone numbers</li>
                <li>Government-issued identification numbers</li>
                <li>Credit or debit card numbers</li>
                <li>Real-time location data</li>
              </ul>
            </div>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300">
              <li>To provide and maintain the Service</li>
              <li>
                To generate analytics, charts, and insights from your data
              </li>
              <li>To authenticate your identity and manage your session</li>
              <li>To improve the Service based on usage patterns</li>
            </ul>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              3. Data Storage and Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your data is stored securely using PostgreSQL (via Neon) with
              Prisma ORM. We use industry-standard security measures to protect
              your information. Authentication is handled by Better-Auth, which
              manages password hashing and session validation.
            </p>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              4. Data Sharing
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We do not sell, trade, or share your personal data with third
              parties for their marketing purposes. Aggregated, anonymized data
              may be used internally for analytics and product improvement.
            </p>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              5. Your Rights
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-700 dark:text-gray-300">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your transaction data</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              To exercise these rights, you can manage your data through your
              account settings or contact us via our{" "}
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

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              6. Data Retention
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We retain your data for as long as your account is active. If you
              delete your account, your personal information and transaction
              data will be permanently removed from our systems.
            </p>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              7. Children's Privacy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The Service is not directed at children under 13. We do not
              knowingly collect personal information from children under 13. If
              we become aware that a child under 13 has provided us with
              personal data, we will take steps to delete it.
            </p>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

          <section>
            <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
              9. Contact
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please reach
              out via our{" "}
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
