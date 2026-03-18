import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main className="page-container flex flex-col items-center justify-center min-h-[80vh] text-center gap-6">
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
        style={{
          background: "color-mix(in srgb, var(--brand) 12%, transparent)",
          color: "var(--brand)",
          border: "1px solid color-mix(in srgb, var(--brand) 30%, transparent)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ background: "var(--brand)" }}
        />
        Now in beta
      </div>
      <h1
        className="text-4xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Track your coding journey
      </h1>
      <p
        className="text-lg max-w-md"
        style={{ color: "var(--text-secondary)" }}
      >
        Unify your Codeforces, LeetCode, and AtCoder stats in one dashboard.
      </p>
      <div className="flex gap-3">
        <Link
          to="/register"
          className="btn-primary transition duration-300 active:scale-95"
        >
          Get started free
        </Link>
        <Link
          to="/login"
          className="btn-secondary transition duration-300 active:scale-95"
        >
          Sign In
        </Link>
      </div>
    </main>
  );
}
