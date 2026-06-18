import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookie-policy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Zemonie's cookie policy — we only use essential cookies for authentication. No tracking, no ads."
        canonicalPath="/cookie-policy"
      />
      <Page className="py-12">
        <div className="max-w-3xl mx-auto px-5 lg:px-0">
          <div className="mb-10">
            <div className="w-16 h-1 bg-primary rounded-full mb-4" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
              Cookie Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Last updated: May 2026</p>
          </div>

          <div className="rounded-2xl bg-white dark:bg-dark-bg shadow-2xl p-8 lg:p-10 space-y-8">
            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                1. What Are Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Cookies are small text files stored on your device by your web browser. They help
                websites remember your preferences and keep you logged in.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">2. Cookies We Use</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Zemonie uses a minimal set of cookies, strictly for authentication and session
                management:
              </p>

              <div className="w-full overflow-x-auto rounded-lg border border-neutral-200 dark:border-dark-card">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-100 dark:bg-dark-card border-b border-neutral-200 dark:border-dark-card">
                      <th className="text-left px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                        Cookie
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                        Purpose
                      </th>
                      <th className="text-left px-5 py-3 font-semibold text-gray-700 dark:text-gray-300">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-neutral-200 dark:border-dark-card last:border-b-0 lg:hover:bg-gray-100 dark:lg:hover:bg-dark-card transition-all duration-150 ease-linear">
                      <td className="px-5 py-3">
                        <code className="bg-neutral-100 dark:bg-dark-card px-1.5 py-0.5 rounded text-sm font-mono">
                          session_token
                        </code>
                      </td>
                      <td className="px-5 py-3 text-gray-700 dark:text-gray-300">
                        Authentication session cookie set by Better-Auth
                      </td>
                      <td className="px-5 py-3 text-gray-700 dark:text-gray-300">
                        Session / persistent
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 rounded-r-xl p-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm font-medium">
                  We do <strong>not</strong> use cookies for:
                </p>
                <ul className="list-disc pl-5 mt-1.5 space-y-0.5 text-sm text-gray-700 dark:text-gray-300">
                  <li>Advertising or tracking</li>
                  <li>Analytics (no Google Analytics or similar)</li>
                  <li>Third-party data collection</li>
                  <li>Social media features</li>
                </ul>
              </div>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                3. Why We Use Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The only cookie we use is strictly necessary for the Service to function. It allows
                you to stay logged in as you navigate between pages. Without this cookie, you would
                need to log in again on every page visit.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                4. Managing Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You can control or delete cookies through your browser settings. Note that disabling
                the session cookie will prevent you from staying logged in, and you will need to
                re-authenticate on each visit.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">
                5. Changes to This Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Cookie Policy from time to time. Changes will be posted on this
                page with an updated "Last updated" date.
              </p>
            </section>

            <div className="h-px bg-neutral-200 dark:bg-dark-card" />

            <section>
              <h2 className="text-xl lg:text-2xl font-bold text-primary mb-3">6. Contact</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about this Cookie Policy, please reach out via our{" "}
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
