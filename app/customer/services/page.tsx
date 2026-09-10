"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { DEMO_SERVICES } from "../../../data/demo";
import { SearchIcon } from "../../../components/ui/icons";

const SERVICE_IMAGES: Record<string, string> = {
  plumbing: "/images/services/plumbing.png",
  electrical: "/images/services/electrical.png",
  "ac-repair": "/images/services/ac-repair.png",
  cleaning: "/images/services/cleaning.png",
  painting: "/images/services/painting.png",
};

export default function ServicesPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    if (!search.trim()) return DEMO_SERVICES;
    const q = search.toLowerCase();
    return DEMO_SERVICES.filter(
      (s) =>
        s.name_en.toLowerCase().includes(q) ||
        s.name_hi.includes(search)
    );
  }, [search]);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-xl font-bold text-[var(--foreground)]">
          {lang === "en" ? "All Services" : "सभी सेवाएं"}
        </h1>
      </div>

      <div className="relative mb-5">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
        <input
          type="text"
          placeholder={lang === "en" ? "Search services..." : "सेवाएं खोजें..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/30"
        />
      </div>

      <div className="relative h-32 md:h-40 rounded-xl overflow-hidden mb-5">
        <Image
          src="/images/lifestyle/jaipur-residential.png"
          alt="Jaipur residential area"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--foreground)]/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-5">
          <p className="text-white text-base md:text-lg font-semibold leading-snug max-w-[280px]">
            {lang === "en"
              ? "Find the right professional for your home"
              : "अपने घर के लिए सही पेशेवर खोजें"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => {
          const imgSrc = SERVICE_IMAGES[service.slug];
          return (
            <Card
              key={service.id}
              interactive
              onClick={() => router.push(`/customer/services/${service.id}`)}
            >
              <div className="flex flex-col">
                <div className="relative h-32 w-full rounded-t-xl overflow-hidden bg-[var(--surface)]">
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={lang === "hi" ? service.name_hi : service.name_en}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-[var(--muted)]">
                        {(lang === "hi" ? service.name_hi : service.name_en)[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                    {lang === "hi" ? service.name_hi : service.name_en}
                  </p>
                  {service.demoPrice && (
                    <p className="text-xs text-[var(--primary)] mt-1 font-medium">
                      ₹{service.demoPrice}{" "}
                      <span className="text-[10px] text-[var(--muted)] font-normal">
                        (DEMO)
                      </span>
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
