import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <main className="page-container flex flex-col items-center justify-center min-h-[80vh] text-center gap-6">
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
