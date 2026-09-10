import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "accent" | "primary";
  size?: "sm" | "md";
}

export function Badge({ variant = "default", size = "md", className = "", children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-[var(--surface)] text-[var(--foreground)]",
    success: "bg-[var(--success)]/10 text-[var(--success)]",
    warning: "bg-[var(--warning)]/10 text-[var(--warning)]",
    danger: "bg-[var(--danger)]/10 text-[var(--danger)]",
    accent: "bg-[var(--accent-muted)] text-[var(--accent)]",
    primary: "bg-[var(--primary)]/10 text-[var(--primary)]",
  };

  const sizes = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
