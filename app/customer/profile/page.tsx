"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { Card } from "../../../components/ui/Card";
import { ChevronRightIcon, MapPinIcon, BellIcon, FileTextIcon, HelpCircleIcon, LogoutIcon } from "../../../components/ui/icons";

function MenuRow({ icon: Icon, label, value, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; value?: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-[var(--surface)] transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[var(--muted)]" />
        <span className="text-sm text-[var(--foreground)]">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-[var(--muted)]">{value}</span>}
        <ChevronRightIcon className="w-4 h-4 text-[var(--muted)]" />
      </div>
    </button>
  );
}

export default function CustomerProfilePage() {
  const { t, lang, setLang } = useLanguage();
  const { state } = useDemo();

  const rows = [
    { icon: MapPinIcon, label: t("saved_addresses"), value: "1" },
    { icon: BellIcon, label: t("notification_prefs") },
    { icon: HelpCircleIcon, label: t("help_support") },
    { icon: FileTextIcon, label: t("terms_of_service") },
  ];

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5 bg-[var(--background)]">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("profile")}</h1>
      </div>

      <Card className="p-4 bg-[var(--surface)] border border-[var(--border)] shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[var(--primary)] flex items-center justify-center shadow-sm">
            <span className="text-xl font-bold text-white">
              {state.customer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="text-base font-semibold text-[var(--primary)]">{state.customer.name}</p>
            <p className="text-sm text-[var(--muted)]">{state.customer.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1XX$3")}</p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[var(--primary)]">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <span className="text-sm font-medium text-[var(--foreground)]">{t("language")}</span>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--surface)]"
        >
          {lang === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      <Card className="p-0 divide-y divide-[var(--border)]">
        {rows.map(({ icon, label, value }) => (
          <MenuRow key={label} icon={icon} label={label} value={value} />
        ))}
      </Card>

      <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-[var(--danger)]/30 text-[var(--danger)] bg-[var(--danger)]/5 hover:bg-[var(--danger)]/10 transition-colors">
        <LogoutIcon className="w-5 h-5" />
        <span className="text-sm font-medium">{t("logout")}</span>
      </button>

      <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
        <p className="text-xs text-[var(--muted)] text-center">
          {t("demo_simulation")} — JaipurHome v1.0
        </p>
      </div>
    </div>
  );
}
