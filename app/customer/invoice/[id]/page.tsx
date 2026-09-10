"use client";

import { useLanguage } from "../../../../lib/i18n/useLanguage";
import { Card } from "../../../../components/ui/Card";
import { Button } from "../../../../components/ui/Button";
import { DEMO_SERVICES, DEMO_PROVIDERS, DEMO_CUSTOMER } from "../../../../data/demo";
import { useDemo } from "../../../../lib/demoStore";
import { CheckIcon } from "../../../../components/ui/icons";
import Link from "next/link";

const DEMO_INVOICE_NUM = `JHS-DEMO-782910`;
const DEMO_INVOICE_DATE = new Date("2026-09-07T14:30:00");

export default function InvoicePage() {
  const { lang, t } = useLanguage();
  const { state } = useDemo();

  const job = state.activeJob;
  const service = job ? DEMO_SERVICES.find((s) => s.id === job.serviceId) : null;
  const provider = job ? DEMO_PROVIDERS.find((p) => p.id === job.providerId) : null;

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5 bg-[var(--background)]">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("invoice")}</h1>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--warning)]/10 text-[var(--warning)] font-medium">
          {t("demo_simulation")}
        </span>
      </div>

      <Card className="p-5 bg-[var(--surface)] border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-[var(--primary)]">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-[var(--foreground)] text-[var(--primary)]">JaipurHome</p>
            <p className="text-xs text-[var(--muted)]">Jaipur, Rajasthan</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("invoice_number")}</p>
            <p className="text-sm font-medium text-[var(--foreground)] break-all">{job?.id ?? DEMO_INVOICE_NUM}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("date_time")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">
              {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(DEMO_INVOICE_DATE)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("service")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{service ? (lang === "hi" ? service.name_hi : service.name_en) : "—"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("provider")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{provider?.name ?? "—"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("customer")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{DEMO_CUSTOMER.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("payment_method")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">{job?.paymentMethod === "cash" ? t("cash") : t("online")}</p>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-4 space-y-2">
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("service")}</p>
            <p className="text-sm font-medium text-[var(--foreground)]">₹{job?.amount ?? service?.demoPrice ?? 299}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-[var(--muted)]">{t("platform_commission")}</p>
            <p className="text-sm font-medium text-[var(--muted)]">₹{((job?.amount ?? 299) * 0.2).toFixed(0)}</p>
          </div>
          <div className="flex justify-between border-t border-[var(--border)] pt-2 mt-2">
            <p className="text-base font-bold text-[var(--foreground)]">{t("total_amount")}</p>
            <p className="text-base font-bold text-[var(--primary)] bg-[var(--primary)]/5 px-2 py-0.5 rounded">₹{job?.amount ?? service?.demoPrice ?? 299}</p>
          </div>
        </div>

        <div className="mt-6 p-3 rounded-lg bg-[var(--success)]/5 border border-[var(--success)]/20 flex items-center gap-2">
          <CheckIcon className="w-4 h-4 text-[var(--success)]" />
          <p className="text-xs text-[var(--success)]">
            {lang === "en" ? "Payment verified" : "भुगतान सत्यापित"}
          </p>
        </div>
      </Card>

      <Button variant="secondary" size="lg" fullWidth onClick={() => window.print()}>
        {lang === "en" ? "Download / Print" : "डाउनलोड / प्रिंट"}
      </Button>

      <Link href="/customer/review" className="block">
        <Button size="lg" fullWidth className="rounded-xl">
          {lang === "en" ? "Rate Your Experience" : "अपना अनुभव रेट करें"}
        </Button>
      </Link>

      <div className="text-center">
        <Link href="/customer" className="text-sm text-[var(--primary)] font-medium">
          {lang === "en" ? "← Back to Home" : "← होम पर वापस"}
        </Link>
      </div>
    </div>
  );
}
