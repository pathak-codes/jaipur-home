"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../lib/i18n/useLanguage";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  MapPinIcon,
  ShieldIcon,
  ClockIcon,
  HomeIcon,
} from "../components/ui/icons";
import { DEMO_SERVICES } from "../data/demo";

const SERVICE_IMAGES: Record<string, string> = {
  plumbing: "/images/services/plumbing.png",
  electrical: "/images/services/electrical.png",
  "ac-repair": "/images/services/ac-repair.png",
  cleaning: "/images/services/cleaning.png",
  painting: "/images/services/painting.png",
};

export default function LandingPage() {
  const { t, lang, setLang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="text-base font-bold text-[var(--foreground)]">JaipurHome</span>
              <span className="block text-[10px] text-[var(--muted)]">जयपुर होम सर्विस</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {lang === "en" ? "Services" : "सेवाएं"}
            </a>
            <Link href="/provider" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {lang === "en" ? "For Providers" : "सेवाकर्ताओं के लिए"}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "en" ? "hi" : "en")}
              className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--border)] transition-colors"
            >
              {lang === "en" ? "हिंदी" : "English"}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="max-w-6xl mx-auto px-5 pt-10 pb-12 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent-muted)] border border-[var(--accent)]/20 w-fit">
                <MapPinIcon className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--accent)]">Jaipur, Rajasthan</span>
              </div>

              <h1 className="text-3xl lg:text-[42px] font-bold text-[var(--foreground)] leading-[1.15] tracking-tight">
                {lang === "en"
                  ? "Professional Home Services at Your Doorstep"
                  : "दरवाज़े पर पेशेवर होम सर्विस"}
              </h1>

              <p className="text-base text-[var(--muted)] leading-relaxed max-w-lg">
                {lang === "en"
                  ? "Connect with verified local professionals for plumbing, electrical, AC repair, cleaning and more. Fast service within 5 km."
                  : "प्लंबिंग, इलेक्ट्रिकल, एसी मरम्मत, सफाई और अन्य के लिए सत्यापित स्थानीय पेशेवरों से जुड़ें। 5 किमी के अंदर तेज़ सेवा।"}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/customer">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t("i_need_service")}
                  </Button>
                </Link>
                <Link href="/provider">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    {t("i_provide_service")}
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative w-full h-64 sm:h-80 lg:h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/hero/hero-professional.png"
                alt="Professional home service provider in Jaipur"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-semibold text-white">
                  {lang === "en" ? "Trusted professionals near you" : "आपके पास विश्वसनीय पेशेवर"}
                </p>
                <p className="text-xs text-white/70">
                  {lang === "en" ? "Verified & background-checked" : "सत्यापित और बैकग्राउंड चेक"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Trust Strip ─── */}
        <section className="bg-[var(--accent-muted)] border-y border-[var(--accent)]/20">
          <div className="max-w-6xl mx-auto px-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: ShieldIcon, label: t("verified_professionals"), sub: lang === "en" ? "ID verified" : "आईडी सत्यापित" },
                { icon: MapPinIcon, label: t("nearby_service"), sub: lang === "en" ? "Within 5 km" : "5 किमी के अंदर" },
                { icon: ClockIcon, label: t("fast_response"), sub: lang === "en" ? "Same day" : "उसी दिन" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3 p-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--surface)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{label}</p>
                    <p className="text-xs text-[var(--muted)]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Popular Services ─── */}
        <section id="services" className="max-w-6xl mx-auto px-5 py-12 lg:py-16">
          <h2 className="text-xl lg:text-2xl font-bold text-[var(--foreground)] mb-8">
            {t("popular_services")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {DEMO_SERVICES.map((service) => {
              const imgSrc = SERVICE_IMAGES[service.slug];
              return (
                <Link key={service.id} href={`/customer?service=${service.id}`}>
                  <Card interactive className="overflow-hidden h-full">
                    <div className="relative w-full h-32 sm:h-36">
                      <Image
                        src={imgSrc}
                        alt={lang === "hi" ? service.name_hi : service.name_en}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                        {lang === "hi" ? service.name_hi : service.name_en}
                      </p>
                      {service.demoPrice && (
                        <p className="text-xs text-[var(--muted)] mt-1">
                          ₹{service.demoPrice} <span className="text-[9px] font-medium text-[var(--accent)]">(DEMO)</span>
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section className="bg-[var(--accent-muted)]">
          <div className="max-w-6xl mx-auto px-5 py-12 lg:py-16">
            <h2 className="text-xl lg:text-2xl font-bold text-[var(--foreground)] mb-8">
              {t("how_it_works")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  n: "1",
                  title: lang === "en" ? "Choose Service" : "सेवा चुनें",
                  desc: lang === "en" ? "Pick from plumbing, electrical, AC, cleaning, and more" : "प्लंबिंग, इलेक्ट्रिकल, एसी, सफाई और अन्य चुनें",
                },
                {
                  n: "2",
                  title: lang === "en" ? "Describe Problem" : "समस्या बताएं",
                  desc: lang === "en" ? "Tell us what needs fixing at your home" : "बताएं कि घर में क्या ठीक करना है",
                },
                {
                  n: "3",
                  title: lang === "en" ? "Get Matched" : "मिलाएं",
                  desc: lang === "en" ? "We connect you with a verified nearby provider" : "हम आपको सत्यापित नज़दीकी सेवाकर्ता से जोड़ते हैं",
                },
                {
                  n: "4",
                  title: lang === "en" ? "Pay After Service" : "सेवा के बाद भुगतान",
                  desc: lang === "en" ? "Pay only after the work is done" : "काम होने के बाद ही भुगतान करें",
                },
              ].map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{title}</p>
                    <p className="text-xs text-[var(--muted)] mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Product Showcase ─── */}
        <section className="max-w-6xl mx-auto px-5 py-12 lg:py-16">
          <div className="flex flex-col items-center text-center gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-[var(--foreground)]">
              {lang === "en" ? "Built for Jaipur" : "जयपुर के लिए बनाया"}
            </h2>
            <p className="text-sm text-[var(--muted)] max-w-md">
              {lang === "en"
                ? "Fast, reliable home services connecting you with verified professionals in your neighborhood."
                : "तेज़, भरोसेमंद होम सर्विस जो आपको आपके पड़ोस में सत्यापित पेशेवरों से जोड़ती है।"}
            </p>
            <div className="relative w-full max-w-sm h-56 mt-2">
              <Image
                src="/images/product/phones.png"
                alt="Jaipur Home Services app on mobile devices"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-[var(--border)] py-5 px-5 bg-[var(--surface)]">
        <p className="text-center text-xs text-[var(--muted)]">
          JaipurHome &middot; {new Date().getFullYear()} &middot;{" "}
          {lang === "en" ? "All rights reserved" : "सर्वाधिकार सुरक्षित"}
        </p>
      </footer>
    </div>
  );
}
