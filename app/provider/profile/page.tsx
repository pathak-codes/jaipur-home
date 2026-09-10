"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
import { StarRating } from "../../../components/shared/StarRating";
import { DEMO_PROVIDERS, DEMO_SERVICES } from "../../../data/demo";
import { ShieldIcon, MapPinIcon, PhoneIcon, WalletIcon, ChevronRightIcon } from "../../../components/ui/icons";

export default function ProviderProfilePage() {
  const { t, lang, setLang } = useLanguage();
  const router = useRouter();

  const provider = DEMO_PROVIDERS[0];

  const rows = [
    { label: t("documents"), value: "2 uploaded" },
    { label: t("emergency_contact"), value: "Sita Devi · 9876XXXXX" },
  ];

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("my_profile")}</h1>
      </div>

      <Card className="p-5">
        <div className="flex items-start gap-4">
          <Avatar src={provider.photo} name={provider.name} size="lg" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-[var(--primary)]">{provider.name}</p>
              {provider.verified && <ShieldIcon className="w-4 h-4 text-[var(--success)]" />}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={provider.rating} showValue />
              <span className="text-xs text-[var(--muted)]">({provider.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant={provider.kycStatus === "verified" ? "success" : "warning"} size="sm">
                {provider.kycStatus === "verified" ? t("verified") : t("pending_approval")}
              </Badge>
              <Badge variant="default" size="sm">{provider.experienceYears} yrs exp.</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)] mb-2">{t("skills")}</p>
            <div className="flex flex-wrap gap-2">
              {provider.skills.map((sid) => {
                const svc = DEMO_SERVICES.find((s) => s.id === sid);
                return (
                  <span key={sid} className="px-3 py-1 rounded-full bg-[var(--primary)]/5 text-xs font-medium text-[var(--primary)] border border-[var(--primary)]/15">
                    {svc?.name_en ?? sid}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-3 space-y-2">
            <div className="flex items-center gap-2">
              <MapPinIcon className="w-4 h-4 text-[var(--muted)]" />
              <span className="text-sm text-[var(--foreground)]">{provider.address}, {provider.city}</span>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="w-4 h-4 text-[var(--muted)]" />
              <span className="text-sm text-[var(--muted)]">{provider.phone?.replace(/(\d{3})(\d{3})(\d{4})/, "$1XX$3")}</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-0 divide-y divide-[var(--primary)]/10">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between p-4">
            <span className="text-sm text-[var(--muted)]">{label}</span>
            <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>
          </div>
        ))}
      </Card>

      <Card className="p-0 divide-y divide-[var(--primary)]/10">
        <button
          onClick={() => router.push("/provider/wallet")}
          className="w-full flex items-center justify-between p-4 hover:bg-[var(--primary)]/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <WalletIcon className="w-5 h-5 text-[var(--muted)]" />
            <span className="text-sm font-medium text-[var(--foreground)]">{t("wallet")}</span>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-[var(--muted)]" />
        </button>
        <button
          onClick={() => router.push("/provider/subscription")}
          className="w-full flex items-center justify-between p-4 hover:bg-[var(--primary)]/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-[var(--muted)]">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
            <span className="text-sm font-medium text-[var(--foreground)]">{t("subscription")}</span>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-[var(--muted)]" />
        </button>
      </Card>

      <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center gap-3">
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[var(--muted)]">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="text-sm font-medium text-[var(--foreground)]">{t("language")}</span>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--primary)]/5 border border-[var(--primary)]/15 text-[var(--primary)]"
        >
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-[var(--primary)]/20 text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-sm font-medium">{t("logout")}</span>
      </button>
    </div>
  );
}
