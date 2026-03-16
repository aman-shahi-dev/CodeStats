export function DashboardPage() {
  return (
    <main className="page-container">
      <h2
        className="text-2xl font-semibold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Dashboard
      </h2>
      <p style={{ color: "var(--text-secondary)" }}>
        Your stats will appear here. Go to Settings to connect your accounts.
      </p>
    </main>
  );
}
