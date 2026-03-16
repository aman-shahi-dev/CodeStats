export function NotFoundPage() {
  return (
    <main className="page-container flex flex-col items-center justify-center min-h-[80vh] text-center gap-4">
      <p
        className="text-6xl font-semibold"
        style={{ color: "var(--text-tertiary)" }}
      >
        404
      </p>
      <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
        Page not found
      </p>
      <Link to="/" className="btn-secondary" style={{ display: "inline-flex" }}>
        Go Home
      </Link>
    </main>
  );
}
