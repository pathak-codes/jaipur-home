"use client";

import { useState } from "react";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { DEMO_TRANSACTIONS } from "../../../data/demo";
import { SearchIcon } from "../../../components/ui/icons";

const TYPE_LABELS: Record<string, { en: string; hi: string }> = {
  job_payment: { en: "Job Payment", hi: "जॉब भुगतान" },
  commission: { en: "Commission", hi: "कमीशन" },
  settlement: { en: "Settlement", hi: "सेटलमेंट" },
  penalty: { en: "Penalty", hi: "जुर्माना" },
  refund: { en: "Refund", hi: "रिफंड" },
  withdrawal: { en: "Withdrawal", hi: "निकासी" },
};

const TYPE_COLORS: Record<string, "default" | "success" | "warning" | "danger" | "primary"> = {
  job_payment: "success",
  commission: "default",
  settlement: "primary",
  penalty: "danger",
  refund: "warning",
  withdrawal: "danger",
};

export default function AdminTransactionsPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");

  const totalRevenue = DEMO_TRANSACTIONS.filter((tx) => tx.type === "job_payment").reduce((acc, tx) => acc + tx.amount, 0);
  const totalCommission = DEMO_TRANSACTIONS.filter((tx) => tx.type === "commission").reduce((acc, tx) => acc + tx.amount, 0);
  const netProfit = totalRevenue - totalCommission;

  const filtered = DEMO_TRANSACTIONS.filter((tx) => {
    const q = search.toLowerCase();
    return !q || tx.id.toLowerCase().includes(q) || tx.referenceId.toLowerCase().includes(q) || tx.description.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">{t("admin_transactions")}</h1>
          <p className="text-sm text-[var(--muted)] mt-0.5">
            {filtered.length} {lang === "en" ? "transactions" : "लेन-देन"} · DEMO
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: t("total_revenue"), value: `₹${totalRevenue.toLocaleString()}`, sub: "(DEMO)", color: "var(--success)" },
          { label: t("total_commission"), value: `₹${totalCommission.toLocaleString()}`, sub: "(20% DEMO)", color: "var(--primary)" },
          { label: t("net_profit"), value: `₹${netProfit.toLocaleString()}`, sub: "(DEMO)", color: "var(--accent)" },
        ].map(({ label, value, sub, color }) => (
          <Card key={label} className="p-4" style={{ borderTop: `3px solid ${color}` }}>
            <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--muted)" }}>{label}</p>
            <p className="text-xl font-bold text-[var(--foreground)] mt-1">{value}</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">{sub}</p>
          </Card>
        ))}
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search") + " reference, ID..."}
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
                "ID", t("type"), t("reference"), t("description"),
                t("direction"), t("amount"), t("balance_after"), t("date"),
              ].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr
                key={tx.id}
                className="last:border-0 transition-colors"
                style={{ borderBottom: "1px solid var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFBEB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-4 py-3 font-medium text-[var(--muted)] text-xs">{tx.id}</td>
                <td className="px-4 py-3">
                  <Badge variant={TYPE_COLORS[tx.type] ?? "default"} size="sm">
                    {TYPE_LABELS[tx.type]?.[lang === "hi" ? "hi" : "en"] ?? tx.type}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-[var(--muted)]">{tx.referenceId}</td>
                <td className="px-4 py-3 text-[var(--foreground)] max-w-[200px] truncate">{tx.description}</td>
                <td className="px-4 py-3">
                  <Badge variant={tx.direction === "credit" ? "success" : "danger"} size="sm">
                    {tx.direction === "credit" ? "Credit ↑" : "Debit ↓"}
                  </Badge>
                </td>
                <td className="px-4 py-3 font-semibold text-[var(--foreground)]">₹{tx.amount}</td>
                <td className="px-4 py-3 text-[var(--muted)]">₹{tx.balanceAfter?.toFixed(0) ?? "—"}</td>
                <td className="px-4 py-3 text-[var(--muted)]">
                  {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(tx.createdAt)}
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
