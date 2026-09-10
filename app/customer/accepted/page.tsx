"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { simulateTracking } from "../../../lib/tracking";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { CheckIcon, StarIcon, ShieldIcon } from "../../../components/ui/icons";

export default function AcceptedPage() {
  const { t } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(8);
  const [arrived, setArrived] = useState(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    dispatch({ type: "START_TRACKING" });

    simulateTracking({
      onUpdate: (p, e) => {
        if (cancelledRef.current) return;
        setProgress(p);
        setEta(e);
        dispatch({ type: "UPDATE_TRACKING", progress: p });
      },
      onArrived: () => {
        if (cancelledRef.current) return;
        setArrived(true);
        dispatch({ type: "ARRIVED" });
      },
    });

    return () => {
      cancelledRef.current = true;
    };
  }, [dispatch]);

  const provider = state.matchedProvider;
  if (!provider) return null;

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <header className="px-5 py-4 border-b border-[var(--border)] bg-[var(--background)]">
        <h1 className="text-lg font-semibold text-center text-[var(--foreground)]">
          {arrived ? t("arrived") : t("on_the_way")}
        </h1>
      </header>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
        {arrived && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20">
            <div className="w-8 h-8 rounded-full bg-[var(--success)] flex items-center justify-center flex-shrink-0">
              <CheckIcon className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm font-medium text-[var(--success)]">
              {t("provider_arrived")}
            </p>
          </div>
        )}

        <Card>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Avatar src={provider.photo} name={provider.name} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-base font-semibold text-[var(--foreground)] truncate">
                    {provider.name}
                  </p>
                  {provider.verified && (
                    <Badge variant="success" size="sm">
                      <ShieldIcon className="w-3 h-3" />
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <StarIcon className="w-3.5 h-3.5 text-[var(--warning)]" />
                  <span className="text-sm text-[var(--muted)]">
                    {provider.rating} ({provider.reviewCount} {t("reviews")})
                  </span>
                </div>
                <p className="text-xs text-[var(--muted)] mt-0.5">
                  {provider.experienceYears} {t("experience_years")}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
              <span className="text-sm text-[var(--muted)]">
                {arrived ? t("status") : t("eta_away")}
              </span>
              <span className={`text-xl font-bold ${arrived ? "text-[var(--success)]" : "text-[var(--primary)]"}`}>
                {arrived ? t("arrived") : `${eta} min`}
              </span>
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="h-36 flex items-center justify-center bg-gradient-to-b from-[var(--surface)] to-[var(--background)] relative">
            <div className="absolute inset-0 flex flex-col">
              <div className="flex-1 relative flex items-center justify-center">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)]" />
                <div
                  className="absolute w-4 h-4 rounded-full bg-[var(--primary)] shadow-md z-10 transition-all duration-500"
                  style={{
                    top: `${100 - progress}%`,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--surface)] rounded-full shadow-sm border border-[var(--border)]">
              <span className="text-base font-bold text-[var(--foreground)]">{eta} min</span>
            </div>
            <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-[var(--success)] flex items-center justify-center">
              <CheckIcon className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
            <div
              className="h-full bg-[var(--primary)] transition-all duration-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-[var(--muted)]">
            {arrived
              ? t("provider_arrived")
              : `${progress}% — ${t("arriving_in")} ${eta} ${t("mins")}`}
          </p>
        </div>

        {arrived && (
          <div className="pt-2">
            <Button size="lg" fullWidth onClick={() => router.push("/customer/completion")}>
              {t("start_service")}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
