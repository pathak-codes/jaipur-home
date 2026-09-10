"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { CheckIcon, CarIcon, HomeIcon, MapPinIcon, PhoneIcon, ArrowRightIcon, WrenchIcon } from "../../../components/ui/icons";
import { DEMO_CUSTOMER, DEMO_SERVICES } from "../../../data/demo";

type Phase = "accepted" | "on_the_way" | "arrived";

const PHASES: { id: Phase; label: { en: string; hi: string }; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "accepted", label: { en: "Job Accepted", hi: "जॉब स्वीकृत" }, icon: CheckIcon },
  { id: "on_the_way", label: { en: "On the Way", hi: "रास्ते में" }, icon: CarIcon },
  { id: "arrived", label: { en: "Arrived", hi: "पहुंचे" }, icon: HomeIcon },
];

export default function ProviderJobPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("accepted");

  const service = DEMO_SERVICES.find((s) => s.id === state.activeJob?.serviceId);

  useEffect(() => {
    if (phase === "accepted") {
      const timer = setTimeout(() => {
        setPhase("on_the_way");
        dispatch({ type: "START_JOB_JOURNEY" });
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "on_the_way") {
      const timer = setTimeout(() => {
        setPhase("arrived");
        dispatch({ type: "ARRIVED_JOB" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [phase, dispatch]);

  function handleComplete() {
    router.push("/provider/complete");
  }

  const job = state.activeJob;
  const currentPhaseIndex = PHASES.findIndex((x) => x.id === phase);

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>{job?.id ?? "Job #JHS-001"}</p>
          <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{t("accepted_job")}</h1>
        </div>
        <div className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(194,65,12,0.1)", color: "var(--primary)" }}>
          {lang === "en" ? "ACTIVE" : "सक्रिय"}
        </div>
      </div>

      <Card style={{ border: "2px solid var(--primary)" }}>
        <div className="p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(194,65,12,0.1)" }}>
              <WrenchIcon className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {lang === "hi" ? service?.name_hi : service?.name_en}
              </p>
              <p className="text-lg font-bold text-[var(--primary)]">₹{service?.demoPrice}</p>
            </div>
          </div>

          <div className="flex flex-col gap-0">
            {PHASES.map((p, i) => {
              const isActive = i === currentPhaseIndex;
              const isCompleted = i < currentPhaseIndex;
              return (
                <div key={p.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isCompleted
                          ? "var(--success)"
                          : isActive
                          ? "var(--primary)"
                          : "var(--border)",
                        boxShadow: isActive ? "0 0 0 4px var(--primary), 0 0 0 8px rgba(194,65,12,0.1)" : "none",
                      }}
                    >
                      {isCompleted ? (
                        <CheckIcon className="w-5 h-5 text-white" />
                      ) : (
                        <p.icon className={isActive ? "w-5 h-5 text-white" : "w-5 h-5 text-[var(--muted)]"} />
                      )}
                    </div>
                    {i < PHASES.length - 1 && (
                      <div
                        className="w-0.5 h-10 transition-colors duration-300"
                        style={{ background: isCompleted ? "var(--success)" : "var(--border)" }}
                      />
                    )}
                  </div>
                  <div className="pb-6 pt-1.5">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: isActive ? "var(--foreground)" : "var(--muted)" }}
                    >
                      {p.label[lang === "hi" ? "hi" : "en"]}
                    </p>
                    {isActive && (
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
                        {p.id === "accepted" && (lang === "en" ? "Customer is waiting for you" : "ग्राहक आपका इंतज़ार कर रहे हैं")}
                        {p.id === "on_the_way" && (lang === "en" ? "Heading to customer location" : "ग्राहक के स्थान पर जा रहे हैं")}
                        {p.id === "arrived" && (lang === "en" ? "You have arrived at the location" : "आप स्थान पर पहुंच गए हैं")}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <Card>
        <div className="p-4 flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted)" }}>
            {t("customer")}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
              {DEMO_CUSTOMER.name}
            </p>
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(21,128,61,0.1)" }}
            >
              <PhoneIcon className="w-4 h-4 text-[var(--success)]" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
            <PhoneIcon className="w-4 h-4" />
            <span>{DEMO_CUSTOMER.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
            <MapPinIcon className="w-4 h-4" />
            <span>{state.activeJob?.id ? "Vaishali Nagar, Jaipur" : "Jaipur, Rajasthan"}</span>
          </div>
        </div>
      </Card>

      {phase === "on_the_way" && (
        <Card style={{ border: "1px dashed var(--accent)" }}>
          <div className="p-4 flex items-center gap-3">
            <ArrowRightIcon className="w-5 h-5 flex-shrink-0 text-[var(--accent)]" />
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {lang === "en" ? "Navigate to customer" : "ग्राहक के पास जाएं"}
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>2.3 km · ~8 min</p>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-auto pb-4">
        {phase === "on_the_way" && (
          <Button size="lg" fullWidth onClick={() => setPhase("arrived")} className="py-4 text-base font-semibold rounded-xl">
            {t("ive_arrived")}
          </Button>
        )}

        {phase === "arrived" && (
          <Button size="lg" fullWidth onClick={handleComplete} className="py-4 text-base font-semibold rounded-xl">
            {t("complete_job")}
          </Button>
        )}

        {phase === "accepted" && (
          <div className="p-4 rounded-xl text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {lang === "en" ? "Preparing route..." : "रूत तैयार हो रहा है..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
