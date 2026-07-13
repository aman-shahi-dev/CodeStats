import { Navbar, Footer } from "@/components/layout";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-text-muted text-xs mb-8">Last updated: July 2026</p>
        <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">1. Acceptance</h2>
            <p>By using CodeStats, you agree to these terms. If you do not agree, please do not use the service.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">2. Service Description</h2>
            <p>CodeStats provides analytics dashboards by aggregating publicly available data from competitive programming platforms. We are not affiliated with Codeforces, LeetCode, AtCoder, or CodeChef.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">3. User Accounts</h2>
            <p>You are responsible for maintaining the security of your account. You must provide accurate platform handles. Impersonation of other users is strictly prohibited.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">4. Fair Use</h2>
            <p>Automated scraping of CodeStats, API abuse, or any activity that degrades service quality for other users is prohibited.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">5. Limitation of Liability</h2>
            <p>CodeStats is provided &ldquo;as is&rdquo; without warranties. We are not liable for inaccurate data from third-party platforms.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
