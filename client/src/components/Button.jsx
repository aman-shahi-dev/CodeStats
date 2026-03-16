export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  ...props
}) {
  const variantClass = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    danger: "btn-primary",
  }[variant];

  const sizeClass = {
    sm: "text-xs px-3 py-1.5",
    md: "",
    lg: "text-base px-6 py-3",
  }[size];

  const dangerStyle =
    variant === "danger"
      ? { backgroundColor: "var(--danger)", color: "#fff" }
      : {};

  return (
    <button
      className={`${variantClass} ${sizeClass} ${className}`}
      style={dangerStyle}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin">
            Loading...
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
