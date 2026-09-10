import { StarIcon } from "../ui/icons";

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

export function StarRating({ rating, max = 5, size = "sm", showValue = false }: StarRatingProps) {
  const sizes = { sm: "w-3.5 h-3.5", md: "w-4 h-4", lg: "w-5 h-5" };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <StarIcon
          key={i}
          className={`${sizes[size]} ${i < Math.floor(rating) ? "text-[var(--warning)]" : "text-[var(--border)]"}`}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-xs font-medium text-[var(--muted)]">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
