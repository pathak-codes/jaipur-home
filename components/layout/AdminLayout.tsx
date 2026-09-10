"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { useLanguage } from "../../lib/i18n/useLanguage";
import type { DictKey } from "../../lib/i18n/dict";
import {
  MenuIcon,
  XIcon,
  HomeIcon,
  ShieldIcon,
  UserIcon,
  FileTextIcon,
  WalletIcon,
  AlertIcon,
} from "../../components/ui/icons";
import { NotificationBell } from "../../components/ui/NotificationBell";
import { DEMO_NOTIFICATIONS } from "../../lib/notifications";

interface AdminLayoutProps {
  children: ReactNode;
}

const NAV_ITEMS: {
  href: string;
  labelKey: DictKey;
  icon: React.ComponentType<{ className?: string }>;
  exact?: boolean;
}[] = [
  {
    href: "/admin",
    labelKey: "admin_dashboard",
    exact: true,
    icon: HomeIcon,
  },
  {
    href: "/admin/verification",
    labelKey: "admin_verification",
    icon: ShieldIcon,
  },
  {
    href: "/admin/providers",
    labelKey: "admin_providers",
    icon: UserIcon,
  },
  {
    href: "/admin/users",
    labelKey: "admin_users",
    icon: UserIcon,
  },
  {
    href: "/admin/jobs",
    labelKey: "admin_jobs",
    icon: FileTextIcon,
  },
  {
    href: "/admin/transactions",
    labelKey: "admin_transactions",
    icon: WalletIcon,
  },
  {
    href: "/admin/complaints",
    labelKey: "admin_complaints",
    icon: AlertIcon,
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const { t, lang, setLang } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-[var(--background)]">
      {/* Mobile hamburger */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg bg-white border border-[var(--border)] shadow-sm"
      >
        {sidebarOpen ? (
          <XIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-[var(--border)] flex flex-col transform transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo section */}
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-[var(--foreground)]">
                JaipurHome
              </span>
              <span className="block text-[10px] text-[var(--muted)]">
                Admin
              </span>
            </div>
            {DEMO_NOTIFICATIONS.length > 0 && (
              <span className="ml-auto min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-[var(--primary)] text-white text-[10px] font-bold">
                {DEMO_NOTIFICATIONS.length}
              </span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map(({ href, labelKey, icon: Icon, exact }) => {
            const isActive = exact
              ? pathname === href
              : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Language toggle */}
        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <NotificationBell notifications={DEMO_NOTIFICATIONS} onClose={() => {}} />
              <span className="text-xs text-[var(--muted)]">
                {t("admin_name")}
              </span>
            </div>
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-2 py-1 rounded text-[10px] font-medium bg-[var(--surface)] text-[var(--muted)] hover:bg-[var(--border)]"
            >
              {lang === "en" ? "हिंदी" : "EN"}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 lg:p-6 overflow-auto bg-[var(--background)]">
          {children}
        </main>
      </div>
    </div>
  );
}
