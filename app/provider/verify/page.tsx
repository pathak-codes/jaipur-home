"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { CheckIcon, ShieldIcon } from "../../../components/ui/icons";
import Link from "next/link";

const STAGES = [
  { id: "docs", label: { en: "Documents Submitted", hi: "दस्तावेज़ जमा" }, status: "done" as const },
  { id: "otp", label: { en: "OTP Verified", hi: "OTP सत्यापित" }, status: "done" as const },
  { id: "call", label: { en: "Call Verification", hi: "कॉल सत्यापन" }, status: "pending" as const },
  { id: "admin", label: { en: "Admin Approval", hi: "एडमिन स्वीकृति" }, status: "pending" as const },
];

export default function ProviderVerifyPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <header className="flex items-center px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <Link href="/provider/register" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--surface)]">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[var(--foreground)]">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <div className="flex-1 text-center pr-10">
          <p className="text-sm font-semibold text-[var(--foreground)]">{t("verification_status")}</p>
        </div>
      </header>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full flex flex-col gap-6">
        <div className="flex flex-col items-center text-center pt-4">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
            <ShieldIcon className="w-8 h-8 text-[var(--primary)]" />
          </div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">{t("under_review")}</h1>
          <p className="text-sm text-[var(--muted)] mt-2">{t("notify_approved")}</p>
        </div>

        <Card className="p-4">
          <div className="flex flex-col gap-4">
            {STAGES.map((stage, i) => (
              <div key={stage.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  stage.status === "done" ? "bg-[var(--primary)]" : "bg-[var(--primary)]/10"
                }`}>
                  {stage.status === "done" ? (
                    <CheckIcon className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-xs font-bold text-[var(--primary)]">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${stage.status === "done" ? "text-[var(--foreground)]" : "text-[var(--muted)]"}`}>
                    {stage.label[lang === "hi" ? "hi" : "en"]}
                  </p>
                  {stage.status === "pending" && (
                    <p className="text-xs text-[var(--muted)]">{lang === "en" ? "In progress..." : "प्रगति में..."}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/15">
          <p className="text-sm text-[var(--muted)] text-center">
            {lang === "en"
              ? "Verification typically takes 1-2 business days. You'll receive a notification once approved."
              : "सत्यापन में आमतौर पर 1-2 कार्य दिन लगते हैं। स्वीकृत होने पर आपको सूचना मिलेगी।"}
          </p>
        </div>

        <Link href="/provider/dashboard" className="mt-auto">
          <Card interactive className="w-full border-[var(--primary)]/20 hover:border-[var(--primary)]/40 hover:bg-[var(--primary)]/5">
            <div className="p-4 text-center">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {lang === "en" ? "Go to Dashboard" : "डैशबोर्ड पर जाएं"}
              </p>
            </div>
          </Card>
        </Link>
      </main>
    </div>
  );
}
