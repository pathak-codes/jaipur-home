"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { DEMO_SERVICES } from "../../../data/demo";
import { useDemo } from "../../../lib/demoStore";
import { CheckIcon } from "../../../components/ui/icons";

export default function CompletionPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const dispatched = useRef(false);

  useEffect(() => {
    if (!dispatched.current && state.activeJob) {
      dispatched.current = true;
      dispatch({ type: "COMPLETE_JOB" });
    }
  }, [state.activeJob, dispatch]);

  const job = state.activeJob;
  const service = job ? DEMO_SERVICES.find((s) => s.id === job.serviceId) : null;

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-6">
      <div className="flex flex-col items-center text-center pt-4">
        <div className="w-20 h-20 rounded-full bg-[var(--success)]/10 flex items-center justify-center mb-4">
          <CheckIcon className="w-10 h-10 text-[var(--success)]" />
        </div>
        <h1 className="text-xl font-bold text-[var(--success)]">{t("job_completed")}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {lang === "en" ? "Your service has been completed" : "आपकी सेवा पूर्ण हो गई है"}
        </p>
      </div>

      <Card>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--muted)]">{t("service")}</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {service ? (lang === "hi" ? service.name_hi : service.name_en) : "—"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--muted)]">{t("provider")}</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              {state.matchedProvider?.name ?? "—"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--muted)]">{t("amount")}</p>
            <p className="text-base font-bold text-[var(--primary)]">
              ₹{job?.amount ?? service?.demoPrice ?? 299} <span className="text-[10px] font-normal text-[var(--muted)]">(DEMO)</span>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[var(--muted)]">{t("payment_method")}</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">{t("payment_pending")}</p>
          </div>
        </div>
      </Card>

      <div className="mt-auto">
        <Button size="lg" fullWidth onClick={() => router.push("/customer/payment")}>
          {t("pay_now")}
        </Button>
      </div>
    </div>
  );
}
