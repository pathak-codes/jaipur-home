interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  variant?: "default" | "success" | "warning" | "danger" | "primary";
  trend?: "up" | "down" | "neutral";
}

export function MetricCard({ label, value, subValue, variant = "default" }: MetricCardProps) {
  const valueColors = {
    default: "text-[var(--foreground)]",
    success: "text-[var(--success)]",
    warning: "text-[var(--warning)]",
    danger: "text-[var(--danger)]",
    primary: "text-[var(--primary)]",
  };

  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-white">
      <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueColors[variant]}`}>{value}</p>
      {subValue && (
        <p className="text-xs text-[var(--muted)] mt-0.5">{subValue}</p>
      )}
    </div>
  );
}
