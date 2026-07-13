import { Navbar, Footer } from "@/components/layout";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6 md:px-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-6">About CodeStats</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-text-secondary text-sm leading-relaxed">
          <p>CodeStats is a precision analytics platform built for competitive programmers. We unify your performance data from Codeforces, LeetCode, AtCoder, and CodeChef into one beautiful, actionable dashboard.</p>
          <h2 className="text-xl font-semibold text-text-primary mt-8">Our Mission</h2>
          <p>We believe every competitive programmer deserves professional-grade analytics without the hassle of manual tracking. Our mission is to help you focus on what matters — solving problems and improving your rating.</p>
          <h2 className="text-xl font-semibold text-text-primary mt-8">The Team</h2>
          <p>CodeStats is built by competitive programmers, for competitive programmers. We understand the grind because we live it every day.</p>
          <h2 className="text-xl font-semibold text-text-primary mt-8">Open Source</h2>
          <p>CodeStats is open-source and community-driven. We believe in transparency and welcome contributions from developers worldwide.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
