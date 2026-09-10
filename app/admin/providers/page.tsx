"use client";

import { useState } from "react";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { Avatar } from "../../../components/ui/Avatar";
import { DEMO_PROVIDERS, DEMO_SERVICES } from "../../../data/demo";
import { SearchIcon, ChevronRightIcon } from "../../../components/ui/icons";

export default function AdminProvidersPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = DEMO_PROVIDERS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t("admin_providers")}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {filtered.length} {lang === "en" ? "total" : "कुल"}
        </p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search") + "..."}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 transition-shadow"
          style={{ border: "1px solid var(--border)", background: "white" }}
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "#FFF7ED" }}>
              {[
                t("name"), t("phone"), t("skills_colon"), t("rating_colon"),
                t("kyc_status"), t("status"),
              ].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{h}</th>
              ))}
              <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr
                key={p.id}
                className="last:border-0 transition-colors"
                style={{ borderBottom: "1px solid var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFBEB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar src={p.photo} name={p.name} size="sm" />
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{p.name}</p>
                      <p className="text-xs text-[var(--muted)]">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">{p.phone}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.skills.slice(0, 2).map((sid) => {
                      const svc = DEMO_SERVICES.find((s) => s.id === sid);
                      return (
                        <span
                          key={sid}
                          className="px-2 py-0.5 rounded text-[10px] font-medium"
                          style={{ background: "#FFF7ED", color: "var(--primary)" }}
                        >
                          {svc ? (lang === "hi" ? svc.name_hi : svc.name_en) : sid}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium">{p.rating}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.kycStatus === "verified" ? "success" : "warning"} size="sm">
                    {p.kycStatus}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={p.availabilityStatus === "available" ? "success" : "default"}
                    size="sm"
                  >
                    {p.availabilityStatus}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    style={{ border: "1px solid var(--border)", background: "#FFF7ED" }}
                  >
                    <ChevronRightIcon className="w-4 h-4 text-[var(--primary)]" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}
