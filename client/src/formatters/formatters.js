/*
  - Format a rating number – adds + prefix for positive deltas
  e.g. 1847 -> "1847", 120 -> "+120"
*/

export function formatRating(value, showSign = false) {
  if (value == null) return "—";
  return showSign && value > 0 ? `+${value}` : String(value);
}

/*
  - Format a large count with K suffix
  e.g. 1200 -> "1.2K", 500 -> "500"
*/

export function formatCount(value) {
  if (value == null) return "–";
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return String(value);
}

/*
  - Format a date string to "March 15, 2026"
*/

export function FormatDate(dateStr) {
  if (!dateStr) return "–";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/*
  - Format a Unix timestamp (Codeforces uses these)
*/

export function FormatUnixDate(timestamp) {
  if (!timestamp) return "–";
  return formatDate(new Date(timestamp * 1000));
}

export function FormatVerdict(verdict) {
  const map = {
    OK: { label: "AC", color: "var(--success)" },
    WRONG_ANSWER: { label: "WA", color: "var(--danger)" },
    TIME_LIMIT_EXCEEDED: { label: "TLE", color: "var(--warning)" },
    MEMORY_LIMIT_EXCEEDED: { label: "MLE", color: "var(--warning)" },
    RUNTIME_ERROR: { label: "RE", color: "var(--danger)" },
    COMPILATION_ERROR: { label: "CE", color: "var(--danger)" },
    Accepted: { label: "AC", color: "var(--success)" },
    "Wrong Answer": { label: "WA", color: "var(--danger)" },
  };
  return map[verdict] || { label: verdict, color: "var(--text-tertiary)" };
}
