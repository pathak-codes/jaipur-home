"use client";

import { useLanguage } from "../../lib/i18n/useLanguage";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { MetricCard } from "../../components/shared/MetricCard";
import { DEMO_ADMIN_METRICS, DEMO_JOBS, DEMO_PROVIDERS, DEMO_SERVICES } from "../../data/demo";
import { AlertIcon } from "../../components/ui/icons";
import Link from "next/link";

export default function AdminDashboardPage() {
  const { t } = useLanguage();
  const m = DEMO_ADMIN_METRICS;

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">{t("admin_dashboard")}</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date())}
          </p>
        </div>
        <span
          className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide"
          style={{ background: "#FEF3C7", color: "var(--warning)", border: "1px solid #FDE68A" }}
        >
          DEMO SIMULATION
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label={t("new_users_today")} value={m.newUsersToday} variant="default" />
        <MetricCard label={t("active_jobs")} value={m.activeJobs} variant="primary" />
        <MetricCard label={t("completed_jobs_today")} value={m.completedJobsToday} variant="success" />
        <MetricCard label={t("revenue_today")} value={`₹${m.revenueToday.toLocaleString()}`} variant="default" subValue="(DEMO)" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label={t("total_providers")} value={m.totalProviders} />
        <MetricCard label={t("verified_providers")} value={m.verifiedProviders} variant="success" />
        <MetricCard label={t("commission_colon")} value={`₹${m.commissionToday.toLocaleString()}`} variant="default" subValue="(DEMO)" />
        <MetricCard label={t("profit_note")} value={`₹${m.profitToday.toLocaleString()}`} variant="default" subValue="(DEMO)" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4" style={{ borderLeft: "4px solid var(--warning)" }}>
          <p className="text-sm font-semibold text-[var(--foreground)] mb-3">{t("pending_verifications")}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#FEF3C7" }}
              >
                <AlertIcon className="w-4 h-4 text-[var(--warning)]" />
              </div>
              <span className="text-2xl font-bold" style={{ color: "var(--warning)" }}>
                {m.pendingVerifications}
              </span>
            </div>
            <Link
              href="/admin/verification"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{ color: "var(--primary)", background: "#FFF7ED", border: "1px solid #FED7AA" }}
            >
              {t("view_all")} →
            </Link>
          </div>
        </Card>
        <Card className="p-4" style={{ borderLeft: "4px solid var(--danger)" }}>
          <p className="text-sm font-semibold text-[var(--foreground)] mb-3">{t("open_complaints")}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#FEE2E2" }}
              >
                <AlertIcon className="w-4 h-4 text-[var(--danger)]" />
              </div>
              <span className="text-2xl font-bold" style={{ color: "var(--danger)" }}>
                {m.openComplaints}
              </span>
            </div>
            <Link
              href="/admin/complaints"
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
              style={{ color: "var(--primary)", background: "#FFF7ED", border: "1px solid #FED7AA" }}
            >
              {t("view_all")} →
            </Link>
          </div>
        </Card>
      </div>

      <div>
        <p className="text-sm font-semibold text-[var(--foreground)] mb-3">{t("recent_jobs")}</p>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)", background: "#FFF7ED" }}>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{t("job_id")}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{t("service")}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{t("provider")}</th>
                <th className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{t("status")}</th>
                <th className="text-right px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{t("amount")}</th>
              </tr>
            </thead>
            <tbody>
              {DEMO_JOBS.map((job) => {
                const service = DEMO_SERVICES.find((s) => s.id === job.serviceId);
                const statusVariant = job.status === "COMPLETED" || job.status === "REVIEWED" || job.status === "PAID"
                  ? "success"
                  : job.status === "CANCELLED"
                  ? "danger"
                  : job.status === "CREATED" || job.status === "MATCHING"
                  ? "warning"
                  : "primary";
                return (
                <tr
                  key={job.id}
                  className="last:border-0 transition-colors"
                  style={{ borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFBEB")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3 font-medium text-[var(--foreground)]">{job.id}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{service?.name_en ?? job.serviceId}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{DEMO_PROVIDERS.find(p => p.id === job.providerId)?.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant} size="sm">{job.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">₹{job.amount ?? "—"}</td>
                </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
