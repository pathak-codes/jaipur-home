"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { DEMO_JOBS, DEMO_SERVICES, DEMO_CUSTOMER, DEMO_PROVIDERS } from "../../../data/demo";
import { ClockIcon, CheckIcon, StarIcon } from "../../../components/ui/icons";

const STATUS_VARIANT: Record<string, "default" | "success" | "warning" | "danger" | "accent" | "primary"> = {
  COMPLETED: "success",
  REVIEWED: "success",
  CANCELLED: "danger",
};

const STATUS_LABEL: Record<string, { en: string; hi: string }> = {
  COMPLETED: { en: "Completed", hi: "पूर्ण" },
  REVIEWED: { en: "Reviewed", hi: "समीक्षित" },
  CANCELLED: { en: "Cancelled", hi: "रद्द" },
};

export default function ProviderHistoryPage() {
  const { lang } = useLanguage();

  const currentProviderId = DEMO_PROVIDERS[0].id;
  const completedJobs = DEMO_JOBS.filter(
    (job) => (job.status === "COMPLETED" || job.status === "REVIEWED") && job.providerId === currentProviderId
  );

  return (
    <div className="p-5 max-w-lg mx-auto w-full bg-[var(--background)]">
      <div className="mb-6">
        <h1 className="text-lg font-bold text-[var(--foreground)]">
          {lang === "en" ? "Job History" : "काम का इतिहास"}
        </h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {lang === "en" ? "Your completed jobs" : "आपके पूर्ण किए गए काम"}
        </p>
      </div>

      {completedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CheckIcon className="w-12 h-12 text-[var(--muted)] mb-3" />
          <p className="text-base font-medium text-[var(--foreground)]">
            {lang === "en" ? "No completed jobs yet" : "अभी तक कोई पूर्ण काम नहीं"}
          </p>
          <p className="text-sm text-[var(--muted)] mt-1">
            {lang === "en" ? "Completed jobs will appear here" : "पूर्ण किए गए काम यहां दिखाई देंगे"}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {completedJobs.map((job) => {
            const service = DEMO_SERVICES.find((s) => s.id === job.serviceId);
            const customer = job.customerId === DEMO_CUSTOMER.id ? DEMO_CUSTOMER : null;
            const date = job.completedAt ?? job.acceptedAt ?? new Date();
            const dateStr = new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(date);

            return (
              <Card key={job.id} className="p-4 bg-[var(--surface)] border border-[var(--border)] shadow-sm">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs font-medium text-[var(--muted)] uppercase tracking-wider">
                      {job.id}
                    </p>
                    <p className="text-base font-semibold text-[var(--foreground)] mt-0.5">
                      {lang === "hi" ? service?.name_hi : service?.name_en ?? job.serviceId}
                    </p>
                  </div>
                  <Badge variant={STATUS_VARIANT[job.status] ?? "default"}>
                    {STATUS_LABEL[job.status]?.[lang as "en" | "hi"] ?? job.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-[var(--muted)]">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>{dateStr}</span>
                  </div>
                  {customer && (
                    <span>{customer.name}</span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-1 text-sm">
                    <StarIcon className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span className="font-medium text-[var(--foreground)]">
                      ₹{job.amount}
                    </span>
                    <span className="text-[var(--muted)] text-xs ml-1">DEMO</span>
                  </div>
                  {job.completedAt && (
                    <span className="text-xs text-[var(--muted)]">
                      {lang === "en" ? "Earned" : "कमाया"}
                    </span>
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
