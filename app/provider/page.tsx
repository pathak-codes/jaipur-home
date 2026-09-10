"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../lib/i18n/useLanguage";
import { Button } from "../../components/ui/Button";
import { MapPinIcon, ClockIcon, ShieldIcon, StarIcon, ChevronRightIcon, PhoneIcon } from "../../components/ui/icons";

export default function ProviderLandingPage() {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--background)" }}>
      <header className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--primary)" }}>
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-base font-bold" style={{ color: "var(--foreground)" }}>JaipurHome</span>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
          style={{ background: "var(--surface)", color: "var(--foreground)", border: "1px solid var(--border)" }}
        >
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </header>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full flex flex-col items-center">
        <div className="pt-8 pb-6 text-center">
          <div className="w-28 h-28 rounded-2xl overflow-hidden mb-5 mx-auto shadow-lg" style={{ border: "3px solid var(--primary)" }}>
            <Image
              src="/images/provider/toolkit.png"
              alt="Professional toolkit"
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm mb-1" style={{ color: "var(--muted)" }}>
            {lang === "en" ? "Welcome to" : "में आपका स्वागत है"}
          </p>
          <h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
            {t("earn_with_skills")}
          </h1>
          <p className="text-sm mt-3 leading-relaxed max-w-xs mx-auto" style={{ color: "var(--muted)" }}>
            {t("join_network")}
          </p>
        </div>

        <div className="w-full space-y-3 mb-6">
          {[
            { icon: MapPinIcon, label: lang === "en" ? "Work in Jaipur" : "जयपुर में काम करें", sub: lang === "en" ? "All areas covered" : "सभी क्षेत्र कवर" },
            { icon: ClockIcon, label: lang === "en" ? "Daily settlement" : "दैनिक सेटलमेंट", sub: lang === "en" ? "Within 24 hours" : "24 घंटे के भीतर" },
            { icon: ShieldIcon, label: lang === "en" ? "₹100/month subscription" : "₹100/महीना सब्सक्रिप्शन", sub: lang === "en" ? "Cancel anytime" : "कभी भी रद्द करें" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(194,65,12,0.1)" }}>
                <Icon className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{label}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full rounded-xl p-4 mb-6" style={{ background: "rgba(217,119,6,0.08)" }}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "var(--primary)", border: "2px solid var(--background)" }}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} className="w-3.5 h-3.5 text-[var(--accent)]" />
                ))}
                <span className="text-xs font-semibold ml-1" style={{ color: "var(--foreground)" }}>4.8</span>
              </div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {lang === "en" ? "500+ providers earning" : "500+ प्रोवाइडर कमा रहे हैं"}
              </p>
            </div>
          </div>
        </div>

        <Link href="/provider/register" className="w-full">
          <Button size="lg" fullWidth className="text-base font-semibold py-3.5 rounded-xl">
            <span className="flex items-center justify-center gap-2">
              {t("register_now")}
              <ChevronRightIcon className="w-5 h-5" />
            </span>
          </Button>
        </Link>

        <div className="mt-5 flex items-center gap-3 p-3 rounded-xl w-full" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <PhoneIcon className="w-4 h-4 flex-shrink-0 text-[var(--muted)]" />
          <div className="flex-1">
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              {t("already_registered")}
            </p>
          </div>
          <Link href="/provider/dashboard" className="text-sm font-semibold text-[var(--primary)]">
            {t("login")}
          </Link>
        </div>
      </main>
    </div>
  );
}
