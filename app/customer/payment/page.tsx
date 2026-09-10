"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { DEMO_SERVICES } from "../../../data/demo";
import { useDemo } from "../../../lib/demoStore";
import { CheckIcon } from "../../../components/ui/icons";

export default function PaymentPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const [method, setMethod] = useState<"online" | "cash" | null>(null);

  const job = state.activeJob;
  const service = job ? DEMO_SERVICES.find((s) => s.id === job.serviceId) : null;
  const amount = job?.amount ?? service?.demoPrice ?? 299;

  function handlePay() {
    if (!method) return;
    dispatch({ type: "MAKE_PAYMENT", method });
    router.push("/customer/invoice/JHS-001");
  }

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-6">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("select_payment")}</h1>
      </div>

      <Card>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted)]">{t("service")}</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">{service ? (lang === "hi" ? service.name_hi : service.name_en) : "—"}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--muted)]">{t("provider")}</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">{state.matchedProvider?.name}</p>
          </div>
          <div className="border-t border-[var(--border)] pt-3 flex items-center justify-between">
            <p className="text-base font-semibold text-[var(--foreground)]">{t("total_amount")}</p>
            <p className="text-xl font-bold text-[var(--primary)]">₹{amount}</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3">
        {[
          { value: "online" as const, label: t("online"), sub: "UPI, Card, Net Banking" },
          { value: "cash" as const, label: t("cash"), sub: "Pay after service" },
        ].map(({ value, label, sub }) => (
          <Card
            key={value}
            interactive={method !== value}
            onClick={() => setMethod(value)}
            className={method === value ? "border-[var(--primary)] bg-[var(--primary)]/5" : ""}
          >
            <div className="p-4 flex items-center gap-4">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                method === value ? "border-[var(--primary)] bg-[var(--primary)]" : "border-[var(--border)]"
              }`}>
                {method === value && <CheckIcon className="w-3 h-3 text-white" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
                <p className="text-xs text-[var(--muted)]">{sub}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
        <p className="text-xs text-[var(--muted)] text-center">
          {t("demo_simulation")} — {lang === "en" ? "No real payment is processed" : "कोई वास्तविक भुगतान नहीं किया जाता"}
        </p>
      </div>

      <div className="mt-auto">
        <Button size="lg" fullWidth onClick={handlePay} disabled={!method}>
          {t("pay_now")}
        </Button>
      </div>
    </div>
  );
}
