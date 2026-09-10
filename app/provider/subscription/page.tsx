"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { CheckIcon } from "../../../components/ui/icons";

const DEMO_RENEWS_DATE = new Date("2026-09-22T00:00:00");

export default function ProviderSubscriptionPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("subscription")}</h1>
      </div>

      <Card className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[var(--accent)] shadow-lg shadow-[var(--primary)]/25">
        <div className="p-5 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white">
              <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-white font-bold text-2xl">₹100</p>
            <p className="text-white/70 text-sm">{t("per_month")}</p>
          </div>
          <Badge variant="success" size="sm">{t("active")}</Badge>
        </div>
      </Card>

      <Card>
        <div className="p-4 space-y-3">
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("renews_on")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">
              {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
                DEMO_RENEWS_DATE
              )}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">Plan</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{t("monthly_plan")}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">Jobs included</p>
            <p className="text-sm font-medium text-[var(--foreground)]">Unlimited</p>
          </div>
        </div>
      </Card>

      <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/15">
        <p className="text-xs text-[var(--muted)] text-center">
          {t("subscription_note")}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {[
          { text: lang === "en" ? "Job offer notifications" : "जॉब ऑफर नोटिफिकेशन" },
          { text: lang === "en" ? "Daily settlement within 24 hours" : "24 घंटे में दैनिक सेटलमेंट" },
          { text: lang === "en" ? "Access to customer requests" : "ग्राहक रिक्वेस्ट तक पहुंच" },
        ].map(({ text }) => (
          <div key={text} className="flex items-center gap-2">
            <CheckIcon className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm text-[var(--foreground)]">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
