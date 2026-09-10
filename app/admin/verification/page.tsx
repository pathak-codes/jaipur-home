"use client";

import { useState } from "react";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Avatar } from "../../../components/ui/Avatar";
import { DEMO_PROVIDERS } from "../../../data/demo";
import { ShieldIcon, CheckIcon, XIcon } from "../../../components/ui/icons";

export default function AdminVerificationPage() {
  const { t, lang } = useLanguage();
  const [providers, setProviders] = useState(DEMO_PROVIDERS.filter((p) => p.kycStatus === "pending"));

  function handleApprove(id: string) {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  }

  function handleReject(id: string) {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t("verification_queue")}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {providers.length} {lang === "en" ? "pending" : "बाकी"}
        </p>
      </div>

      {providers.length === 0 ? (
        <Card className="p-12 text-center" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <CheckIcon className="w-10 h-10 mx-auto mb-3 text-[var(--success)]" />
          <p className="text-base font-medium text-[var(--foreground)]">{t("no_pending")}</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {providers.map((provider) => (
            <Card
              key={provider.id}
              className="p-4 transition-shadow"
              style={{ borderLeft: "4px solid var(--accent)" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(194,65,12,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar src={provider.photo} name={provider.name} size="md" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">{provider.name}</p>
                    <p className="text-xs text-[var(--muted)]">{provider.email}</p>
                    <p className="text-xs text-[var(--muted)]">{provider.phone}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      {provider.skills.map((sid) => (
                        <span
                          key={sid}
                          className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{ background: "#FFF7ED", color: "var(--primary)", border: "1px solid #FED7AA" }}
                        >
                          {sid}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleReject(provider.id)}
                    style={{ border: "1px solid #FECACA", background: "#FEF2F2" }}
                  >
                    <XIcon className="w-4 h-4 text-[var(--danger)]" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApprove(provider.id)}
                    style={{ background: "var(--success)", color: "#fff" }}
                  >
                    <CheckIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div
                className="mt-3 pt-3 flex items-center gap-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
                  <ShieldIcon className="w-3.5 h-3.5" />
                  <span>ID: {provider.kycStatus}</span>
                </div>
                <span className="text-xs text-[var(--muted)]">{provider.experienceYears} yrs exp.</span>
                <span className="text-xs text-[var(--muted)]">{provider.city}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
