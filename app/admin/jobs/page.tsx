"use client";

import { useState } from "react";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { DEMO_JOBS, DEMO_PROVIDERS, DEMO_SERVICES } from "../../../data/demo";

const STATUS_COLORS: Record<string, "default" | "success" | "warning" | "danger" | "accent" | "primary"> = {
  CREATED: "default", MATCHING: "warning", OFFERED: "warning", ACCEPTED: "accent",
  ON_THE_WAY: "primary", ARRIVED: "primary", COMPLETION_PENDING: "warning",
  COMPLETED: "success", PAYMENT_PENDING: "warning", PAID: "success", REVIEWED: "success", CANCELLED: "danger",
};

export default function AdminJobsPage() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? DEMO_JOBS : DEMO_JOBS.filter((j) => j.status === filter);

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t("admin_jobs")}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">{DEMO_JOBS.length} {lang === "en" ? "total jobs" : "कुल जॉब"}</p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["all", "ACCEPTED", "COMPLETED", "PAID", "REVIEWED", "CANCELLED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
            style={
              filter === f
                ? { background: "var(--primary)", color: "#fff", boxShadow: "0 2px 8px rgba(194,65,12,0.25)" }
                : { background: "#FFF7ED", color: "var(--muted)", border: "1px solid #FED7AA" }
            }
          >
            {f === "all" ? t("all_status") : f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", background: "#FFF7ED" }}>
              {[
                "ID", t("service"), t("provider"), t("customer"),
                t("status"), "Amount", t("date"),
              ].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => {
              const provider = DEMO_PROVIDERS.find((p) => p.id === job.providerId);
              const service = DEMO_SERVICES.find((s) => s.id === job.serviceId);
              return (
                <tr
                  key={job.id}
                  className="last:border-0 transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFBEB")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{job.id}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{service ? (lang === "hi" ? service.name_hi : service.name_en) : "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{provider?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Priya Sharma (DEMO)</td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_COLORS[job.status] ?? "default"} size="sm">{job.status}</Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold text-[var(--foreground)]">₹{job.amount}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {job.acceptedAt ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(job.acceptedAt) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  );
}
