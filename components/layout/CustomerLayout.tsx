"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useLanguage } from "../../lib/i18n/useLanguage";
import { HomeIcon, FileTextIcon, WalletIcon, UserIcon } from "../ui/icons";
import { NotificationBell } from "../ui/NotificationBell";
import { DEMO_NOTIFICATIONS } from "../../lib/notifications";

interface CustomerLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: "/customer", labelKey: "home" as const, icon: HomeIcon },
  { href: "/customer/requests", labelKey: "my_requests" as const, icon: FileTextIcon },
  { href: "/customer/wallet", labelKey: "wallet" as const, icon: WalletIcon },
  { href: "/customer/profile", labelKey: "profile" as const, icon: UserIcon },
];

export function CustomerLayout({ children }: CustomerLayoutProps) {
  const pathname = usePathname();
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <header className="sticky top-0 z-20 bg-white border-b border-[var(--border)]">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/customer" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-[var(--foreground)] text-base">JaipurHome</span>
          </Link>

          <div className="flex items-center gap-2">
            <NotificationBell notifications={DEMO_NOTIFICATIONS} onClose={() => {}} />
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--border)] transition-colors"
            >
              {lang === "en" ? "हिंदी" : "English"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-20 min-h-full">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--border)] z-20">
        <div className="flex max-w-lg mx-auto">
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon }) => {
            const isActive = pathname === href || (href !== "/customer" && pathname.startsWith(href));
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
    </div>
  );
}
