"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { DEMO_JOBS, DEMO_SERVICES, DEMO_PROVIDERS } from "../../../data/demo";
import { ClockIcon } from "../../../components/ui/icons";

const STATUS_VARIANT: Record<string, "default" | "success" | "warning" | "danger" | "accent" | "primary"> = {
  CREATED: "default", MATCHING: "warning", OFFERED: "warning", ACCEPTED: "accent",
  ON_THE_WAY: "primary", ARRIVED: "primary", COMPLETION_PENDING: "warning",
  COMPLETED: "success", PAYMENT_PENDING: "warning", PAID: "success", REVIEWED: "success", CANCELLED: "danger",
};

const STATUS_LABEL: Record<string, { en: string; hi: string }> = {
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

export default function RequestsPage() {
  const { lang, t } = useLanguage();
  const allJobs = DEMO_JOBS;

  return (
    <div className="p-5 max-w-lg mx-auto w-full bg-[var(--background)]">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("request_history")}</h1>
      </div>

      {allJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-base font-medium text-[var(--foreground)]">{t("no_requests")}</p>
          <p className="text-sm text-[var(--muted)] mt-1">{t("find_service")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {allJobs.map((job) => {
            const service = DEMO_SERVICES.find((s) => s.id === job.serviceId);
            const provider = DEMO_PROVIDERS.find((p) => p.id === job.providerId);
            const date = job.acceptedAt ?? new Date();
            const dateStr = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(date);

            return (
              <Card key={job.id} className="p-4 bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">{job.id}</p>
                    <p className="text-base font-semibold text-[var(--foreground)] mt-0.5">
                      {service?.name_en ?? job.serviceId}
                    </p>
                    {provider && <p className="text-sm text-[var(--muted)] mt-0.5">{provider.name}</p>}
                  </div>
                  <Badge variant={STATUS_VARIANT[job.status] ?? "default"} size="sm">
                    {STATUS_LABEL[job.status]?.[lang === "hi" ? "hi" : "en"] ?? job.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    {dateStr}
                  </span>
                  {job.amount && (
                    <span className="font-semibold text-[var(--foreground)]">₹{job.amount}</span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
