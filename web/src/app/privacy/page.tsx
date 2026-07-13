import { Navbar, Footer } from "@/components/layout";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-text-muted text-xs mb-8">Last updated: July 2026</p>
        <div className="space-y-8 text-text-secondary text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">1. Information We Collect</h2>
            <p>We collect your email address, display name, and public competitive programming handles. We fetch your publicly available stats from Codeforces, LeetCode, AtCoder, and CodeChef APIs. We do not access private data.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">2. How We Use Your Data</h2>
            <p>Your data is used solely to generate analytics dashboards and public profiles. We never sell your personal information to third parties.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">3. Data Storage</h2>
            <p>All data is stored securely using industry-standard encryption. We use Neon (PostgreSQL) for structured data and Upstash (Redis) for caching.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">4. Your Rights</h2>
            <p>You can export or delete all your data at any time from your Settings page. Account deletion is permanent and irreversible.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text-primary mb-3">5. Contact</h2>
            <p>For privacy concerns, reach out to privacy@codestats.dev.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
