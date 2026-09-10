"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { useTimer } from "../../../lib/timer";
import { simulateMatching } from "../../../lib/matching";
import { DEMO_SERVICES } from "../../../data/demo";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";
import { Badge } from "../../../components/ui/Badge";
import { RadarAnimation } from "../../../components/ui/RadarAnimation";
import { CheckIcon, StarIcon, ShieldIcon, ChevronRightIcon, MapPinIcon, SearchIcon } from "../../../components/ui/icons";

type Phase = "finding" | "sending" | "accepted" | "empty";

export default function MatchingPage() {
  const { t, lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const [sentCount, setSentCount] = useState(0);
  const [totalProviders] = useState(10);
  const [phase, setPhase] = useState<Phase>("finding");
  const cancelledRef = useRef(false);

  const { start } = useTimer(15, () => {
    if (!cancelledRef.current && phase === "finding") {
      setPhase("empty");
    }
  });

  const dispatchAction = useCallback((action: Parameters<typeof dispatch>[0]) => {
    dispatch(action);
  }, [dispatch]);

  const navigate = useCallback((path: string) => {
    router.push(path);
  }, [router]);

  useEffect(() => {
    cancelledRef.current = false;

    const serviceId = state.currentServiceId;
    const activeRequest = state.activeRequest;

    if (!serviceId || !activeRequest) return;

    async function run() {
      dispatchAction({ type: "START_MATCHING" });
      start();

      await new Promise((r) => setTimeout(r, 1500));
      if (cancelledRef.current) return;

      setPhase("sending");
      await simulateMatching(
        serviceId!,
        activeRequest!.location,
        {
          onProgress: (sent) => {
            if (!cancelledRef.current) {
              setSentCount(sent);
            }
          },
          onAccepted: () => {
            if (!cancelledRef.current) {
              setPhase("accepted");
              dispatchAction({ type: "PROVIDER_ACCEPTED", providerId: "p1" });
            }
          },
        }
      );
    }

    run();
    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentServiceId, dispatchAction, navigate]);

  const provider = state.matchedProvider;
  const service = state.currentServiceId
    ? DEMO_SERVICES.find((s) => s.id === state.currentServiceId)
    : null;

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <header className="px-5 py-4 border-b border-[var(--border)] bg-white">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="w-8" />
          <div className="text-center">
            <h1 className="text-lg font-semibold text-[var(--foreground)]">
              {t("finding_help")}
            </h1>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Step 3 of 4
            </p>
          </div>
          <div className="w-8" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-5 max-w-lg mx-auto w-full">
        {phase === "finding" && (
          <div className="flex flex-col items-center gap-8 text-center w-full">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-[var(--accent)]/10 animate-ping" style={{ animationDuration: "2s" }} />
              </div>
              <div className="relative scale-125">
                <RadarAnimation />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-base font-medium text-[var(--foreground)]">
                {t("finding_help")}
              </p>
              <p className="text-sm text-[var(--muted)] max-w-xs mx-auto">
                {t("looking_for_providers")}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <MapPinIcon className="w-4 h-4" />
              <span>5 km radius · Verified only</span>
            </div>
          </div>
        )}

        {phase === "sending" && (
          <div className="flex flex-col items-center gap-8 text-center w-full">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[var(--accent)]/10 animate-ping" style={{ animationDuration: "2s" }} />
              </div>
              <div className="relative scale-110">
                <RadarAnimation />
              </div>
            </div>

            <div className="space-y-4 w-full">
              <div className="space-y-2">
                <p className="text-base font-medium text-[var(--foreground)]">
                  {t("contacting_professionals")}
                </p>
                <p className="text-sm text-[var(--muted)]">
                  {t("sent_to_providers")} {sentCount} of {totalProviders} {t("providers_count")}
                </p>
              </div>

              <div className="w-full max-w-xs mx-auto h-2 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-300 rounded-full"
                  style={{ width: `${(sentCount / totalProviders) * 100}%` }}
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto">
                {[...Array(totalProviders)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i < sentCount
                        ? "bg-[var(--primary)] scale-110 shadow-sm"
                        : "bg-[var(--border)]"
                    }`}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
              <SearchIcon className="w-4 h-4" />
              <span>5 km radius · Verified only</span>
            </div>
          </div>
        )}

        {phase === "accepted" && provider && (
          <div className="flex flex-col items-center gap-6 text-center w-full animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-[var(--success)] flex items-center justify-center">
              <CheckIcon className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-1">
              <p className="text-xl font-bold text-[var(--success)]">
                {t("provider_found")}
              </p>
              <p className="text-sm text-[var(--muted)]">
                {provider.name} {t("provider_will_help")}
              </p>
            </div>

            <Card className="w-full max-w-sm">
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar src={provider.photo} name={provider.name} size="lg" />
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-semibold text-[var(--foreground)] truncate">
                        {provider.name}
                      </p>
                      {provider.verified && (
                        <Badge variant="success" size="sm">
                          <ShieldIcon className="w-3 h-3" />
                          <span>{t("verified")}</span>
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
                      {provider.experienceYears} {t("years_experience_short")}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--muted)]">
                      {t("service")}
                    </span>
                    <span className="text-sm font-medium text-[var(--foreground)]">
                      {service ? (lang === "hi" ? service.name_hi : service.name_en) : ""}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Button
              size="lg"
              fullWidth
              onClick={() => navigate("/customer/tracking")}
              className="max-w-sm"
            >
              {t("track_live")}
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}

        {phase === "empty" && (
          <div className="flex flex-col items-center gap-6 text-center w-full">
            <div className="w-16 h-16 rounded-full bg-[var(--border)] flex items-center justify-center">
              <SearchIcon className="w-8 h-8 text-[var(--muted)]" />
            </div>

            <div className="space-y-2">
              <p className="text-lg font-semibold text-[var(--foreground)]">
                No providers found
              </p>
              <p className="text-sm text-[var(--muted)] max-w-xs mx-auto">
                No verified professionals are available within 5 km right now. Please try again later.
              </p>
            </div>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/customer")}
            >
              {t("back_to_home")}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
