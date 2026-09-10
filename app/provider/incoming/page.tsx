"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { useTimer } from "../../../lib/timer";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { CircularTimer } from "../../../components/ui/CircularTimer";
import { BellIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from "../../../components/ui/icons";
import { DEMO_SERVICES } from "../../../data/demo";

export default function IncomingRequestPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();

  const { seconds, start } = useTimer(30, () => {
    dispatch({ type: "REJECT_REQUEST" });
    router.push("/provider/dashboard");
  });

  useEffect(() => {
    start();
  }, [start]);

  const request = state.incomingRequest;
  if (!request) return null;

  const service = DEMO_SERVICES.find((s) => s.id === request.serviceId);

  function handleAccept() {
    dispatch({ type: "ACCEPT_REQUEST" });
    router.push("/provider/job");
  }

  function handleReject() {
    dispatch({ type: "REJECT_REQUEST" });
    router.push("/provider/dashboard");
  }

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--background)" }}>
      <div className="px-5 py-3 flex items-center gap-2" style={{ background: "rgba(217,119,6,0.12)", borderBottom: "2px solid var(--accent)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--accent)" }}>
          <BellIcon className="w-4 h-4 text-white" />
        </div>
        <p className="text-sm font-bold text-[var(--accent)]">{t("new_job_request")}</p>
      </div>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="relative">
            <CircularTimer seconds={seconds} maxSeconds={30} size={120} strokeWidth={10} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold" style={{ color: seconds > 10 ? "var(--primary)" : seconds > 5 ? "var(--accent)" : "var(--danger)" }}>
                {seconds}
              </span>
              <span className="text-xs" style={{ color: "var(--muted)" }}>{t("seconds")}</span>
            </div>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>{t("accept_before")}</p>
        </div>

        <Card style={{ border: "2px solid var(--primary)" }}>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "var(--border)" }}>
                <Image
                  src={`/images/services/${service?.slug || "plumbing"}.png`}
                  alt={service?.name_en || "Service"}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                  {lang === "hi" ? service?.name_hi : service?.name_en}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: "rgba(194,65,12,0.1)", color: "var(--primary)" }}>
                    {lang === "hi" ? "सेवा" : "Service"}
                  </span>
                  <span className="text-sm font-bold" style={{ color: "var(--foreground)" }}>₹{service?.demoPrice}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: "var(--background)", borderLeft: "4px solid var(--accent)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--muted)" }}>
                {t("customer_problem")}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>
                &ldquo;{request.description}&rdquo;
              </p>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <MapPinIcon className="w-5 h-5 flex-shrink-0 text-[var(--primary)]" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: "var(--foreground)" }}>{request.location.address}</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>2.3 km away</p>
              </div>
              <ArrowRightIcon className="w-4 h-4 flex-shrink-0 text-[var(--accent)]" />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <ClockIcon className="w-5 h-5 flex-shrink-0 text-[var(--accent)]" />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>~8 mins</p>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {lang === "en" ? "Estimated travel time" : "अनुमानित यात्रा समय"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex gap-3 mt-auto pb-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleReject}
            fullWidth
            className="py-4 text-base font-semibold rounded-xl"
          >
            {t("reject")}
          </Button>
          <Button size="lg" onClick={handleAccept} fullWidth className="py-4 text-base font-semibold rounded-xl">
            <span className="flex items-center justify-center gap-2">
              {t("accept_request")}
              <span className="text-sm opacity-80">₹{service?.demoPrice}</span>
            </span>
          </Button>
        </div>
      </main>
    </div>
  );
}
