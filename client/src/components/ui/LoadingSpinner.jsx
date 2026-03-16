export default function LoadingSpinner({ size = "md", className = "" }) {
  const sz = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" }[size];
  return (
    <div
      className={`${sz} border-2 border-t-transparent rounded-full animate-spin ${className}`}
      style={{ borderColor: "var(--brand)", borderTopColor: "transparent" }}
      role="status"
      aria-label="Loading"
    />
  );
}
