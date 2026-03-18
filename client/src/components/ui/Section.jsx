export default function Section({ title, subtitle, danger = false, children }) {
  return (
    <div className="surface p-6">
      <div className="mb-4">
        <h2
          className="text-sm font-semibold mb-0.5"
          style={{ color: danger ? "var(--danger)" : "var(--text-primary)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
      <div
        style={
          danger
            ? { borderTop: "1px solid var(--danger-bg)", paddingTop: "1rem" }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
}
