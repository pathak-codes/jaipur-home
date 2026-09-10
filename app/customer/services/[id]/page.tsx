"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useLanguage } from "../../../../lib/i18n/useLanguage";
import { useDemo } from "../../../../lib/demoStore";
import { DEMO_SERVICES } from "../../../../data/demo";
import {
  ChevronLeftIcon,
  CheckIcon,
  ShieldIcon,
  MapPinIcon,
  ClockIcon,
} from "../../../../components/ui/icons";
import { Button } from "../../../../components/ui/Button";

const SERVICE_IMAGES: Record<string, string> = {
  plumbing: "/images/services/plumbing.png",
  electrical: "/images/services/electrical.png",
  "ac-repair": "/images/services/ac-repair.png",
  cleaning: "/images/services/cleaning.png",
  painting: "/images/services/painting.png",
};

const SERVICE_DESCRIPTIONS: Record<string, { en: string; hi: string }> = {
  plumbing: {
    en: "Professional plumbing services for pipe repair, installation, and maintenance",
    hi: "पाइप मरम्मत, इंस्टॉलेशन और रखरखाव के लिए पेशेवर प्लंबिंग सेवाएं",
  },
  electrical: {
    en: "Expert electrical repair, wiring, and fixture installation services",
    hi: "विशेषज्ञ इलेक्ट्रिकल मरम्मत, वायरिंग और फिक्चर इंस्टॉलेशन सेवाएं",
  },
  "ac-repair": {
    en: "AC installation, repair, and maintenance for all brands",
    hi: "सभी ब्रांड के लिए AC इंस्टॉलेशन, मरम्मत और रखरखाव",
  },
  cleaning: {
    en: "Deep home cleaning, kitchen sanitization, and regular maintenance",
    hi: "गहरी घर की सफाई, किचन सैनिटाइज़ेशन और नियमित रखरखाव",
  },
  painting: {
    en: "Interior and exterior painting with premium quality finishes",
    hi: "प्रीमियम क्वालिटी फ़िनिश के साथ इंटीरियर और एक्स्टीरियर पेंटिंग",
  },
};

const SERVICE_BENEFITS: Record<string, { en: string[]; hi: string[] }> = {
  plumbing: {
    en: [
      "Leak detection and repair",
      "Pipe and tap installation",
      "Drain unclogging",
      "Water heater service",
      "Bathroom fixture fixing",
    ],
    hi: [
      "रिसाव का पता लगाना और मरम्मत",
      "पाइप और टैप इंस्टॉलेशन",
      "ड्रेन अनक्लॉगिंग",
      "वाटर हीटर सर्विस",
      "बाथरूम फिक्सचर फिक्सिंग",
    ],
  },
  electrical: {
    en: [
      "Wiring repair and setup",
      "Switch and socket installation",
      "Fan and light fitting",
      "MCB and fuse issues",
      "Power outage troubleshooting",
    ],
    hi: [
      "वायरिंग मरम्मत और सेटअप",
      "स्विच और सॉकेट इंस्टॉलेशन",
      "पंखा और लाइट फिटिंग",
      "MCB और फ्यूज़ समस्याएं",
      "पावर आउटेज ट्रबलशूटिंग",
    ],
  },
  "ac-repair": {
    en: [
      "AC installation and setup",
      "Gas refilling and charging",
      "Filter and coil cleaning",
      "Compressor repair",
      "Thermostat calibration",
    ],
    hi: [
      "AC इंस्टॉलेशन और सेटअप",
      "गैस रिफिलिंग और चार्जिंग",
      "फ़िल्टर और कॉइल सफाई",
      "कंप्रेसर मरम्मत",
      "थर्मोस्टैट कैलिब्रेशन",
    ],
  },
  cleaning: {
    en: [
      "Home deep cleaning",
      "Kitchen and bathroom sanitization",
      "Sofa and carpet cleaning",
      "Post-renovation cleanup",
      "Office space cleaning",
    ],
    hi: [
      "घर की डीप क्लीनिंग",
      "किचन और बाथरूम सैनिटाइज़ेशन",
      "सोफ़ा और कार्पेट क्लीनिंग",
      "पोस्ट-रेनोवेशन क्लीनअप",
      "ऑफिस स्पेस क्लीनिंग",
    ],
  },
  painting: {
    en: [
      "Interior wall painting",
      "Exterior building painting",
      "Texture and design work",
      "Wood polishing and painting",
      "Waterproofing treatment",
    ],
    hi: [
      "इंटीरियर दीवार पेंटिंग",
      "एक्स्टीरियर बिल्डिंग पेंटिंग",
      "टेक्सचर और डिज़ाइन वर्क",
      "लकड़ी पॉलिशिंग और पेंटिंग",
      "वाटरप्रूफिंग ट्रीटमेंट",
    ],
  },
};

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang, t } = useLanguage();
  const { dispatch } = useDemo();
  const router = useRouter();

  const service = DEMO_SERVICES.find((s) => s.id === id);
  if (!service) return null;

  const imgSrc = SERVICE_IMAGES[service.slug];
  const name = lang === "hi" ? service.name_hi : service.name_en;
  const description = SERVICE_DESCRIPTIONS[service.slug];
  const benefits = SERVICE_BENEFITS[service.slug];

  function handleRequest() {
    if (!service) return;
    dispatch({ type: "SET_SERVICE", serviceId: service.id });
    router.push(`/customer/request?service=${service.id}`);
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Hero image */}
      <div className="relative h-48 sm:h-56 w-full">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[var(--surface)] flex items-center justify-center">
            <span className="text-6xl font-bold text-[var(--muted)]">
              {name[0]}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <ChevronLeftIcon className="w-5 h-5 text-[var(--foreground)]" />
        </button>
      </div>

      <div className="max-w-lg mx-auto w-full px-5">
        {/* Service info card */}
        <div className="-mt-8 relative z-10">
          <div className="bg-[var(--surface)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-[var(--foreground)]">
                  {name}
                </h1>
                <p className="text-sm text-[var(--muted)] mt-1 leading-relaxed">
                  {description
                    ? lang === "hi"
                      ? description.hi
                      : description.en
                    : ""}
                </p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-[var(--accent)]">
                  ₹{service.demoPrice}
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[var(--accent-muted)] text-[var(--accent)] rounded-full">
                  {t("demo_price_badge")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--success)]/10 text-[var(--success)] rounded-full">
            <ShieldIcon className="w-3.5 h-3.5" />
            {t("verified_professionals")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--accent-muted)] text-[var(--accent)] rounded-full">
            <MapPinIcon className="w-3.5 h-3.5" />
            {t("within_5km")}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[var(--muted)]/10 text-[var(--muted)] rounded-full">
            <ClockIcon className="w-3.5 h-3.5" />
            {t("fast_response")}
          </span>
        </div>

        {/* What's included */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
            {t("what_is_included")}
          </h2>
          <div className="bg-[var(--surface)] rounded-2xl p-4">
            <ul className="flex flex-col gap-2.5">
              {benefits
                ? (lang === "hi" ? benefits.hi : benefits.en).map(
                    (benefit, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <CheckIcon className="w-4 h-4 text-[var(--success)] flex-shrink-0" />
                        <span className="text-sm text-[var(--foreground)]">
                          {benefit}
                        </span>
                      </li>
                    )
                  )
                : null}
            </ul>
          </div>
        </div>

        {/* Context image */}
        <div className="mt-6">
          <div className="rounded-xl overflow-hidden">
            <Image
              src="/images/lifestyle/doorstep.png"
              alt={t("doorstep_service")}
              width={600}
              height={200}
              className="w-full h-32 object-cover"
            />
          </div>
          <p className="text-xs text-[var(--muted)] text-center mt-2">
            {t("doorstep_service")}
          </p>
        </div>
      </div>

      {/* Fixed bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[var(--surface)] border-t border-[var(--border)] p-4 z-50">
        <div className="max-w-lg mx-auto">
          <Button size="lg" fullWidth onClick={handleRequest}>
            {t("request_now")} — ₹{service.demoPrice}
          </Button>
        </div>
      </div>
    </div>
  );
}
