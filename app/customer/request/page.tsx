"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { Button } from "../../../components/ui/Button";
import { Textarea } from "../../../components/ui/Input";
import { Card } from "../../../components/ui/Card";
import {
  ChevronLeftIcon,
  MapPinIcon,
  CameraIcon,
  PlumbingIcon,
  ElectricalIcon,
  ACIcon,
  CleaningIcon,
  PaintingIcon,
} from "../../../components/ui/icons";
import { DEMO_SERVICES } from "../../../data/demo";

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  s1: PlumbingIcon,
  s2: ElectricalIcon,
  s3: ACIcon,
  s4: CleaningIcon,
  s5: PaintingIcon,
};

export default function RequestPage() {
  const { lang } = useLanguage();
  const { state, dispatch } = useDemo();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);

  const service = DEMO_SERVICES.find((s) => s.id === state.currentServiceId);
  const IconComponent = service ? SERVICE_ICONS[service.id] : null;

  function handleSubmit() {
    if (!description.trim()) return;
    dispatch({
      type: "SUBMIT_REQUEST",
      description: description.trim(),
      location: { address: "Vaishali Nagar, Jaipur", lat: 26.9124, lng: 75.7873 },
    });
    router.push("/customer/matching");
  }

  return (
    <div className="min-h-full flex flex-col bg-[var(--background)]">
      <header className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border)] bg-white sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center -ml-2 rounded-lg hover:bg-[var(--surface)]"
        >
          <ChevronLeftIcon className="w-5 h-5 text-[var(--foreground)]" />
        </button>
        <h1 className="text-lg font-semibold text-[var(--foreground)]">
          {lang === "hi" ? "सेवा अनुरोध" : "Request Service"}
        </h1>
      </header>

      <main className="flex-1 p-5 max-w-lg mx-auto w-full flex flex-col gap-6 pb-28">
        {service && (
          <Card className="bg-white">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {IconComponent && (
                  <div className="w-10 h-10 rounded-lg bg-[var(--background)] flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[var(--foreground)]">
                    {lang === "hi" ? service.name_hi : service.name_en}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    ₹{service.demoPrice}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push("/customer/services")}
                className="text-xs font-medium text-[var(--primary)] hover:underline"
              >
                {lang === "hi" ? "बदलें" : "Change"}
              </button>
            </div>
          </Card>
        )}

        <div className="flex flex-col gap-2">
          <label
            htmlFor="problem-description"
            className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]"
          >
            {lang === "hi" ? "समस्या का विवरण" : "Description"}
          </label>
          <Textarea
            id="problem-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={
              lang === "hi"
                ? "अपनी समस्या विस्तार से बताएं..."
                : "Describe your problem in detail..."
            }
            rows={4}
            className="text-base"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            {lang === "hi" ? "फ़ोटो जोड़ें" : "Add Photos"}
          </label>
          <button
            type="button"
            onClick={() => setHasPhoto((p) => !p)}
            className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-[var(--border)] rounded-xl hover:border-[var(--muted)] transition-colors"
          >
            <CameraIcon className="w-8 h-8 text-[var(--muted)]" />
            <span className="text-sm text-[var(--muted)]">
              {hasPhoto
                ? lang === "hi"
                  ? "फ़ोटो जोड़ी गई"
                  : "Photo added (demo)"
                : lang === "hi"
                  ? "फ़ोटो लेने के लिए टैप करें"
                  : "Tap to add a photo"}
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            {lang === "hi" ? "स्थान" : "Location"}
          </label>
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[var(--border)]">
            <MapPinIcon className="w-5 h-5 text-[var(--primary)] mt-0.5 shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <span className="text-sm font-medium text-[var(--foreground)]">
                Vaishali Nagar, Jaipur
              </span>
              <div className="relative w-full h-32 rounded-lg overflow-hidden bg-[var(--border)]">
                <Image
                  src="/images/maps/jaipur-maps-1.png"
                  alt="Map preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {service && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
              {lang === "hi" ? "अनुमानित लागत" : "Estimated Cost"}
            </label>
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[var(--border)]">
              <span className="text-sm text-[var(--muted)]">
                {lang === "hi" ? service.name_hi : service.name_en}
              </span>
              <span className="text-lg font-semibold text-[var(--foreground)]">
                ₹{service.demoPrice}
              </span>
            </div>
          </div>
        )}
      </main>

      <div className="sticky bottom-0 p-5 bg-white border-t border-[var(--border)]">
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={!description.trim()}
          fullWidth
        >
          {lang === "hi" ? "सेवा अनुरोध करें" : "Request Service"} — ₹
          {service?.demoPrice ?? 0}
        </Button>
      </div>
    </div>
  );
}
