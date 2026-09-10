"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../lib/i18n/useLanguage";
import { useDemo } from "../../lib/demoStore";
import { Card } from "../../components/ui/Card";
import { DEMO_SERVICES, DEMO_JOBS, DEMO_PROVIDERS } from "../../data/demo";
import { JobCard } from "../../components/shared/JobCard";
import { MapPinIcon, FileTextIcon, WalletIcon, HelpCircleIcon, UserIcon } from "../../components/ui/icons";

const SERVICE_IMG: Record<string, string> = {
  plumbing: "/images/services/plumbing.png",
  electrical: "/images/services/electrical.png",
  "ac-repair": "/images/services/ac-repair.png",
  cleaning: "/images/services/cleaning.png",
  painting: "/images/services/painting.png",
};

const QUICK_ACTIONS = [
  { key: "my_requests", icon: FileTextIcon, label_en: "My Requests", label_hi: "मेरी रिक्वेस्ट", href: "/customer/requests" },
  { key: "wallet", icon: WalletIcon, label_en: "Wallet", label_hi: "वॉलेट", href: "/customer/wallet" },
  { key: "help", icon: HelpCircleIcon, label_en: "Help", label_hi: "मदद", href: "#" },
  { key: "profile", icon: UserIcon, label_en: "Profile", label_hi: "प्रोफ़ाइल", href: "/customer/profile" },
];

export default function CustomerHomePage() {
  const { t, lang } = useLanguage();
  const { state } = useDemo();
  const router = useRouter();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("good_morning") : hour < 17 ? t("good_afternoon") : t("good_evening");

  const activeJob = state.activeJob;
  const recentJobs = DEMO_JOBS;

  return (
    <div className="min-h-screen pb-24">
      {/* Greeting Section */}
      <div className="bg-gradient-to-b from-[var(--background)] to-[#F5F0E8] px-5 pt-6 pb-5">
        <p className="text-sm text-[var(--muted)]">{greeting},</p>
        <h1 className="text-2xl font-bold text-[var(--foreground)] mt-0.5">{state.customer.name}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {lang === "hi" ? "हम आपकी कैसे मदद कर सकते हैं?" : "What can we help you with?"}
        </p>
      </div>

      <div className="px-5 max-w-lg mx-auto w-full flex flex-col gap-6 -mt-2">
        {/* Active Request */}
        {activeJob ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)] mb-2">
              {lang === "hi" ? "सक्रिय रिक्वेस्ट" : "Active Request"}
            </p>
            <Card className="border-l-4 border-l-[var(--primary)]">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                    <MapPinIcon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">
                      {(() => {
                        const svc = DEMO_SERVICES.find((s) => s.id === activeJob.serviceId);
                        return svc ? (lang === "hi" ? svc.name_hi : svc.name_en) : activeJob.serviceId;
                      })()}
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {(() => {
                        const provider = DEMO_PROVIDERS.find((p) => p.id === activeJob.providerId);
                        return provider ? provider.name : "";
                      })()}
                      {" · "}
                      {activeJob.etaMinutes} min {lang === "hi" ? "दूर" : "away"}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push("/customer/tracking")}
                className="w-full py-2.5 border-t border-[var(--border)] text-xs font-semibold text-[var(--primary)] hover:bg-[var(--primary)]/5 transition-colors"
              >
                {lang === "hi" ? "लाइव ट्रैक करें" : "Track Live"} →
              </button>
            </Card>
          </div>
        ) : (
          <div className="text-center py-6 rounded-xl border border-dashed border-[var(--border)] bg-white">
            <p className="text-sm font-medium text-[var(--foreground)]">{t("no_active_jobs")}</p>
            <button
              onClick={() => router.push("/customer/services")}
              className="mt-2 text-sm text-[var(--primary)] font-semibold"
            >
              {t("find_service")}
            </button>
          </div>
        )}

        {/* Quick Services Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              {t("popular_services")}
            </p>
            <button onClick={() => router.push("/customer/services")} className="text-xs text-[var(--primary)] font-medium">
              {t("view_all")} →
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {DEMO_SERVICES.map((service) => (
              <Card
                key={service.id}
                interactive
                onClick={() => router.push(`/customer/services/${service.id}`)}
              >
                <div className="p-3 flex flex-col items-center gap-2">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[var(--background)] flex items-center justify-center">
                    <Image
                      src={SERVICE_IMG[service.slug] ?? "/images/services/plumbing.png"}
                      alt={service.name_en}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-[var(--foreground)] leading-tight">
                      {lang === "hi" ? service.name_hi : service.name_en}
                    </p>
                    {service.demoPrice && (
                      <p className="text-[10px] text-[var(--muted)] mt-0.5">
                        ₹{service.demoPrice}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)] mb-3">
            {lang === "hi" ? "त्वरित क्रियाएं" : "Quick Actions"}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.key}
                  onClick={() => router.push(action.href)}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[var(--border)] hover:border-[var(--primary)]/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[var(--primary)]" />
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {lang === "hi" ? action.label_hi : action.label_en}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--muted)] mb-3">
            {t("recent_activity")}
          </p>
          <div className="flex flex-col">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                jobId={job.id}
                serviceId={job.serviceId}
                providerId={job.providerId}
                status={job.status}
                date={job.acceptedAt ?? new Date()}
                amount={job.amount}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
