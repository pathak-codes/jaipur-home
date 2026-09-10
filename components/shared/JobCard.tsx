import type { JobStatus } from "../../lib/types";
import { DEMO_SERVICES, DEMO_PROVIDERS } from "../../data/demo";
import { Badge } from "../ui/Badge";
import { MapPinIcon, ClockIcon } from "../ui/icons";

interface JobCardProps {
  jobId: string;
  serviceId: string;
  providerId?: string;
  status: JobStatus;
  date: Date;
  amount?: number;
  compact?: boolean;
}

const STATUS_VARIANT: Record<JobStatus, "default" | "success" | "warning" | "danger" | "accent" | "primary"> = {
  CREATED: "default",
  MATCHING: "warning",
  OFFERED: "warning",
  ACCEPTED: "accent",
  ON_THE_WAY: "primary",
  ARRIVED: "primary",
  COMPLETION_PENDING: "warning",
  COMPLETED: "success",
  PAYMENT_PENDING: "warning",
  PAID: "success",
  REVIEWED: "success",
  CANCELLED: "danger",
};

const STATUS_LABEL: Record<JobStatus, { en: string; hi: string }> = {
  CREATED: { en: "Created", hi: "बनाया" },
  MATCHING: { en: "Matching", hi: "मिलान" },
  OFFERED: { en: "Offered", hi: "ऑफर" },
  ACCEPTED: { en: "Accepted", hi: "स्वीकृत" },
  ON_THE_WAY: { en: "On the way", hi: "रास्ते में" },
  ARRIVED: { en: "Arrived", hi: "पहुंचे" },
  COMPLETION_PENDING: { en: "Pending", hi: "बाकी" },
  COMPLETED: { en: "Completed", hi: "पूर्ण" },
  PAYMENT_PENDING: { en: "Payment pending", hi: "भुगतान बाकी" },
  PAID: { en: "Paid", hi: "भुगतान किया" },
  REVIEWED: { en: "Reviewed", hi: "समीक्षित" },
  CANCELLED: { en: "Cancelled", hi: "रद्द" },
};

export function JobCard({ jobId, serviceId, providerId, status, date, amount, compact = false }: JobCardProps) {
  const service = DEMO_SERVICES.find((s) => s.id === serviceId);
  const provider = providerId ? DEMO_PROVIDERS.find((p) => p.id === providerId) : null;

  const dateStr = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(date);

  if (compact) {
    return (
      <div className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center">
            <span className="text-xs font-bold text-[var(--primary)]">{jobId.slice(-4)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--foreground)] truncate max-w-[160px]">{service?.name_en ?? serviceId}</p>
            <p className="text-xs text-[var(--muted)]">{dateStr}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={STATUS_VARIANT[status]} size="sm">
            {STATUS_LABEL[status].en}
          </Badge>
          {amount && <span className="text-sm font-semibold text-[var(--foreground)]">₹{amount}</span>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-[var(--border)] bg-white">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{jobId}</p>
          <p className="text-base font-semibold text-[var(--foreground)] mt-0.5">{service?.name_en}</p>
          {provider && <p className="text-sm text-[var(--muted)] mt-0.5">{provider.name}</p>}
        </div>
        <Badge variant={STATUS_VARIANT[status]} size="sm">
          {STATUS_LABEL[status].en}
        </Badge>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3.5 h-3.5" />
            {dateStr}
          </span>
          {provider && (
            <span className="flex items-center gap-1">
              <MapPinIcon className="w-3.5 h-3.5" />
              Jaipur
            </span>
          )}
        </div>
        {amount && <span className="text-base font-bold text-[var(--foreground)]">₹{amount}</span>}
      </div>
    </div>
  );
}
