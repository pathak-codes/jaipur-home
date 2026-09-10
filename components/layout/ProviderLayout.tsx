"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useLanguage } from "../../lib/i18n/useLanguage";
import { useDemo } from "../../lib/demoStore";
import { HomeIcon, WrenchIcon, WalletIcon, UserIcon, CheckIcon, XIcon } from "../ui/icons";
import { NotificationBell } from "../ui/NotificationBell";
import { DEMO_NOTIFICATIONS } from "../../lib/notifications";

interface ProviderLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "/provider/dashboard", labelKey: "dashboard" as const, icon: HomeIcon },
  { href: "/provider/job", labelKey: "jobs" as const, icon: WrenchIcon },
  { href: "/provider/earnings", labelKey: "earnings" as const, icon: WalletIcon },
  { href: "/provider/profile", labelKey: "profile" as const, icon: UserIcon },
];

const ONBOARDING_ROUTES = ["/provider", "/provider/register", "/provider/verify"];

export function ProviderLayout({ children }: ProviderLayoutProps) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();
  const { state, dispatch } = useDemo();
  const isAvailable = state.providerAvailability === "available";
  const isOnboarding = ONBOARDING_ROUTES.some((r) => pathname === r || (r !== "/provider" && pathname.startsWith(r)));

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      {!isOnboarding && (
        <header className="sticky top-0 z-20 bg-white border-b border-[var(--border)]">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-3">
              <NotificationBell notifications={DEMO_NOTIFICATIONS} onClose={() => {}} />
              <button
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
              >
                {lang === "en" ? "हिंदी" : "English"}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch({ type: "TOGGLE_AVAILABILITY" })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isAvailable
                    ? "bg-green-50 text-[var(--success)]"
                    : "bg-stone-100 text-[var(--muted)]"
                }`}
              >
                {isAvailable ? (
                  <CheckIcon className="w-3.5 h-3.5" />
                ) : (
                  <XIcon className="w-3.5 h-3.5" />
                )}
                {isAvailable ? t("available") : t("unavailable")}
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 pb-20">
        {children}
      </main>

      {!isOnboarding && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-20">
          <div className="flex max-w-lg mx-auto">
            {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
              const isActive = pathname === href || (href !== "/provider/dashboard" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 transition-colors ${
                    isActive ? "text-[var(--primary)]" : "text-[var(--muted)]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{t(labelKey)}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
