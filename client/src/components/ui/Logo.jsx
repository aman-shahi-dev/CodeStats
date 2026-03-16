export function Logo() {
  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: "var(--brand)" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect
          x="1"
          y="10"
          width="3"
          height="7"
          rx="1"
          fill="white"
          opacity="0.6"
        />
        <rect
          x="6"
          y="6"
          width="3"
          height="11"
          rx="1"
          fill="white"
          opacity="0.8"
        />
        <rect x="11" y="2" width="3" height="15" rx="1" fill="white" />
        <rect
          x="16"
          y="7"
          width="2"
          height="10"
          rx="1"
          fill="white"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
