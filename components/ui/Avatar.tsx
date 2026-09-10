import Image from "next/image";
import { HTMLAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

export function Avatar({ src, name, size = "md", className = "", ...props }: AvatarProps) {
  const sizes = { sm: "w-8 h-8", md: "w-12 h-12", lg: "w-16 h-16" };
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`relative overflow-hidden rounded-full bg-[var(--surface)] flex items-center justify-center ${sizes[size]} ${className}`}
      {...props}
    >
      {src ? (
        <Image src={src} alt={name} fill className="object-cover" />
      ) : (
        <span className="text-sm font-medium text-[var(--muted)]">{initials}</span>
      )}
    </div>
  );
}
