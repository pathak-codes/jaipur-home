import { ReactNode } from "react";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  return (
    <p className={`text-xs font-medium uppercase tracking-widest text-[var(--muted)] ${className}`}>
      {children}
    </p>
  );
}
