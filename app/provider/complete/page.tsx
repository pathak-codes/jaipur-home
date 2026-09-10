"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { SwipeControl } from "../../../components/shared/SwipeControl";
import { CameraIcon, CheckIcon } from "../../../components/ui/icons";

export default function ProviderCompletePage() {
  const { t, lang } = useLanguage();
  const { dispatch } = useDemo();
  const router = useRouter();
  const [photoTaken, setPhotoTaken] = useState(false);

  function handleComplete() {
    dispatch({ type: "COMPLETE_JOB" });
    router.push("/provider/earnings");
  }

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div>
        <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>{t("complete_job")}</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          {lang === "en" ? "Upload completion photo to finish" : "समाप्त करने के लिए पूर्णता फोटो अपलोड करें"}
        </p>
      </div>

      <Card style={{ border: photoTaken ? "2px solid var(--success)" : "2px dashed var(--primary)" }}>
        <div className="p-6 flex flex-col items-center gap-4">
          {photoTaken ? (
            <>
              <div className="w-full h-52 rounded-xl flex items-center justify-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(21,128,61,0.1)" }}>
                    <CheckIcon className="w-8 h-8 text-[var(--success)]" />
                  </div>
                  <p className="text-sm font-semibold text-[var(--success)]">
                    {lang === "en" ? "Photo captured" : "फोटो लिया गया"}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    {lang === "en" ? "Ready to complete service" : "सेवा पूरी करने के लिए तैयार"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPhotoTaken(false)}
                className="text-sm font-medium text-[var(--primary)]"
              >
                {lang === "en" ? "Retake photo" : "फोटो दोबारा लें"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setPhotoTaken(true)}
                className="w-full h-52 rounded-xl flex flex-col items-center justify-center gap-3 transition-all"
                style={{
                  border: "2px dashed var(--primary)",
                  background: "rgba(194,65,12,0.03)",
                }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(194,65,12,0.1)" }}>
                  <CameraIcon className="w-8 h-8 text-[var(--primary)]" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{t("take_photo")}</p>
                  <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>
                    {lang === "en" ? "Tap to capture" : "कैप्चर करने के लिए टैप करें"}
                  </p>
                </div>
                <p className="text-xs px-2 py-1 rounded" style={{ background: "var(--surface)", color: "var(--muted)" }}>
                  DEMO — simulated
                </p>
              </button>
              <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
                {t("photo_required")}
              </p>
            </>
          )}
        </div>
      </Card>

      {photoTaken && (
        <>
          <Card>
            <div className="p-4">
              <SwipeControl onComplete={handleComplete} label={t("swipe_to_complete")} />
            </div>
          </Card>
          <Button variant="secondary" size="sm" fullWidth onClick={handleComplete} className="rounded-xl">
            {t("mark_complete")}
          </Button>
        </>
      )}

      {!photoTaken && (
        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="w-5 h-5 flex-shrink-0 rounded-full flex items-center justify-center" style={{ background: "rgba(217,119,6,0.1)" }}>
            <span className="text-xs font-bold text-[var(--accent)]">?</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
              {lang === "en" ? "Why is a photo required?" : "फोटो क्यों ज़रूरी है?"}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {lang === "en" ? "Proof of completed work for both parties" : "दोनों पक्षों के लिए काम पूरा होने का प्रमाण"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
