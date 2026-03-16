export default function Input({
  label,
  error,
  helperText,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="label" htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      <input
        className={`input ${error ? "error" : ""} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
