import { Avatar } from "../ui/Avatar";
import { ShieldIcon, StarIcon } from "../ui/icons";
import type { DemoProvider } from "../../lib/types";
import { DEMO_SERVICES } from "../../data/demo";

interface ProviderCardProps {
  provider: DemoProvider;
  size?: "sm" | "md" | "lg";
  showSkills?: boolean;
  showDistance?: boolean;
}

export function ProviderCard({ provider, size = "md", showSkills = false }: ProviderCardProps) {
  const skillNames = provider.skills
    .map((sid) => DEMO_SERVICES.find((s) => s.id === sid)?.name_en ?? sid)
    .join(", ");

  return (
    <div className="flex items-center gap-3">
      <Avatar src={provider.photo} name={provider.name} size={size} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-[var(--foreground)] truncate">{provider.name}</p>
          {provider.verified && (
            <ShieldIcon className="w-3.5 h-3.5 text-[var(--success)] flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <StarIcon className="w-3.5 h-3.5 text-[var(--warning)]" />
          <span className="text-xs text-[var(--muted)]">
            {provider.rating} · {provider.experienceYears} yrs
          </span>
        </div>
        {showSkills && skillNames && (
          <p className="text-xs text-[var(--muted)] mt-0.5 truncate">{skillNames}</p>
        )}
      </div>
    </div>
  );
}
