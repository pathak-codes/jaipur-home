"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { simulateTracking } from "../../../lib/tracking";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { ProviderCard } from "../../../components/shared/ProviderCard";
import { SimulatedMap } from "../../../components/shared/SimulatedMap";
import { Badge } from "../../../components/ui/Badge";
import { CheckIcon } from "../../../components/ui/icons";

export default function TrackingPage() {
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
  const distance = (2.3 * (100 - progress)) / 100;

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-[var(--foreground)]">
          {arrived ? t("arrived") : t("on_the_way")}
        </h1>
        <Badge variant={arrived ? "success" : "primary"} size="sm">
          {arrived ? t("arrived") : t("on_the_way")}
        </Badge>
      </div>

      <SimulatedMap progress={progress} eta={eta} distance={parseFloat(distance.toFixed(1))} />

      {provider && (
        <Card>
          <div className="p-4 flex items-center gap-4">
            <ProviderCard provider={provider} size="md" />
            <div className="flex-1 text-right">
              <p className="text-lg font-bold text-[var(--primary)]">{eta} min</p>
              <p className="text-xs text-[var(--muted)]">{distance.toFixed(1)} km {t("away")}</p>
            </div>
          </div>
        </Card>
      )}

      {arrived ? (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--success)]/10 border border-[var(--success)]/20">
          <div className="w-10 h-10 rounded-full bg-[var(--success)] flex items-center justify-center flex-shrink-0">
            <CheckIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--success)]">{t("provider_arrived")}</p>
          </div>
        </div>
      ) : (
        <Card className="bg-[var(--background)] border-0">
          <div className="p-4 text-center">
            <p className="text-sm font-medium text-[var(--foreground)]">{t("provider_on_the_way")}</p>
          </div>
        </Card>
      )}

      <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {arrived && (
        <div className="pt-2">
          <Button size="lg" fullWidth onClick={() => router.push("/customer/completion")}>
            {t("start_service")}
          </Button>
        </div>
      )}
    </div>
  );
}
