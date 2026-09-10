import type { DemoService } from "../../lib/types";
import { PlumbingIcon, ElectricalIcon, ACIcon, CleaningIcon, PaintingIcon } from "../ui/icons";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PlumbingIcon,
  ElectricalIcon,
  ACIcon,
  CleaningIcon,
  PaintingIcon,
};

interface ServiceCardProps {
  service: DemoService;
  lang?: "en" | "hi";
  compact?: boolean;
}

export function ServiceCard({ service, lang = "en", compact = false }: ServiceCardProps) {
  const IconComponent = ICON_MAP[service.icon] ?? PlumbingIcon;
  const name = lang === "hi" ? service.name_hi : service.name_en;

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] bg-white hover:bg-[var(--surface)] transition-colors cursor-pointer">
        <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-5 h-5 text-[var(--foreground)]" />
        </div>
        <p className="text-sm font-medium text-[var(--foreground)]">{name}</p>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-white hover:shadow-md transition-shadow cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-[var(--surface)] flex items-center justify-center mb-3">
        <IconComponent className="w-6 h-6 text-[var(--foreground)]" />
      </div>
      <p className="text-sm font-semibold text-[var(--foreground)]">{name}</p>
      {service.demoPrice && (
        <p className="text-xs text-[var(--muted)] mt-0.5">
          ₹{service.demoPrice} <span className="text-[10px]">(DEMO)</span>
        </p>
      )}
    </div>
  );
}
