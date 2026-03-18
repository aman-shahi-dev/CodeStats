export default function PlatformField({
  label,
  color,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-1">
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ background: color }}
        ></span>
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-primary)" }}
        >
          {label}
        </span>
      </div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
}
