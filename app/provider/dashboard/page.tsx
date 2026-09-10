"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { Card } from "../../../components/ui/Card";
import { WrenchIcon, StarIcon, ClockIcon, MapPinIcon, CheckIcon, ChevronRightIcon } from "../../../components/ui/icons";

export default function ProviderDashboardPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();

  const isAvailable = state.providerAvailability === "available";
  const todayEarnings = 890;
  const weekEarnings = 3420;
  const todayJobs = 3;
  const rating = 4.8;
  const acceptanceRate = 92;

  useEffect(() => {
    if (state.providerAvailability === "available" && !state.incomingRequest) {
      const timer = setTimeout(() => {
        dispatch({
          type: "INCOMING_REQUEST",
          request: {
            id: "r1",
            customerId: "c1",
            serviceId: "s1",
            description: "Kitchen pipe leaking, need urgent repair",
            location: { address: "42, Vaishali Nagar, Jaipur", lat: 26.9124, lng: 75.7873 },
            status: "offered",
            createdAt: new Date(),
          },
        });
        router.push("/provider/incoming");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.providerAvailability, state.incomingRequest, dispatch, router]);

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {lang === "hi" ? "नमस्ते" : "Good morning"}
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Ramesh Kumar</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: isAvailable ? "var(--success)" : "var(--muted)" }} />
          <span className="text-xs font-medium" style={{ color: isAvailable ? "var(--success)" : "var(--muted)" }}>
            {isAvailable ? (lang === "en" ? "Online" : "ऑनलाइन") : (lang === "en" ? "Offline" : "ऑफलाइन")}
          </span>
        </div>
      </div>

      <Card className="overflow-hidden" style={{ border: "2px solid var(--primary)" }}>
        <div className="p-5" style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}>
          <p className="text-sm font-medium text-white/80">{t("todays_earnings_short")}</p>
          <p className="text-4xl font-bold text-white mt-1">₹{todayEarnings}</p>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs text-white/80">
              {lang === "en" ? "↑ 12% from yesterday" : "कल से +12%"}
            </span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: WrenchIcon, value: todayJobs, label: lang === "en" ? "Jobs" : "जॉब्स" },
          { icon: StarIcon, value: rating, label: lang === "en" ? "Rating" : "रेटिंग" },
          { icon: CheckIcon, value: `${acceptanceRate}%`, label: lang === "en" ? "Accept" : "स्वीकार" },
        ].map(({ icon: Icon, value, label }) => (
          <Card key={label}>
            <div className="p-3 text-center">
              <Icon className="w-5 h-5 mx-auto mb-1 text-[var(--primary)]" />
              <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{value}</p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>{label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
              {lang === "en" ? "This Week" : "इस हफ्ते"}
            </p>
            <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>₹{weekEarnings}</p>
          </div>
          <div className="w-full h-2 rounded-full" style={{ background: "var(--border)" }}>
            <div className="h-2 rounded-full" style={{ background: "var(--primary)", width: "65%" }} />
          </div>
          <p className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            {lang === "en" ? "₹5,200 weekly goal" : "₹5,200 साप्ताहिक लक्ष्य"}
          </p>
        </div>
      </Card>

      {isAvailable && !state.incomingRequest && (
        <Card style={{ border: "1px dashed var(--accent)" }}>
          <div className="p-4 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: "rgba(217,119,6,0.1)" }}>
              <ClockIcon className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{t("watch_for_requests")}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
              {lang === "en" ? "A new request will arrive shortly" : "नई रिक्वेस्ट जल्द आएगी"}
            </p>
          </div>
        </Card>
      )}

      {!isAvailable && (
        <Card>
          <div className="p-4 text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: "var(--border)" }}>
              <MapPinIcon className="w-6 h-6 text-[var(--muted)]" />
            </div>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {lang === "en"
                ? "Turn on availability to receive job requests"
                : "जॉब रिक्वेस्ट पाने के लिए उपलब्धता चालू करें"}
            </p>
          </div>
        </Card>
      )}

      <Card>
        <div className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: "var(--muted)" }}>
            {lang === "en" ? "Quick Actions" : "त्वरित कार्य"}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: lang === "en" ? "Earnings" : "कमाई", route: "/provider/earnings" },
              { label: lang === "en" ? "History" : "इतिहास", route: "/provider/history" },
            ].map(({ label, route }) => (
              <button
                key={route}
                onClick={() => router.push(route)}
                className="p-3 rounded-lg text-sm font-medium text-center transition-colors flex items-center justify-center gap-2"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              >
                {label}
                <ChevronRightIcon className="w-4 h-4 text-[var(--muted)]" />
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
