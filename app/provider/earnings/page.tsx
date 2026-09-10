"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { DEMO_PROVIDER_TRANSACTIONS } from "../../../data/demo";
import { ArrowRightIcon } from "../../../components/ui/icons";

export default function ProviderEarningsPage() {
  const { t } = useLanguage();

  const todayEarnings = 890;
  const weekEarnings = 3420;
  const monthEarnings = 12450;
  const balance = 2151.8;
  const pending = 279.2;

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("earnings")}</h1>
      </div>

      <Card className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[var(--accent)] shadow-lg shadow-[var(--primary)]/25">
        <div className="p-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">{t("wallet_balance")}</p>
            <p className="text-3xl font-bold text-white mt-1">₹{balance.toFixed(0)}</p>
            <p className="text-xs text-white/60 mt-1">
              {t("settlement_info")}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/60">{t("pending")}</p>
            <p className="text-base font-bold text-white/90">₹{pending}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: t("todays_earnings_short"), value: todayEarnings },
          { label: t("this_week"), value: weekEarnings },
          { label: t("this_month"), value: monthEarnings },
        ].map(({ label, value }) => (
          <Card key={label} className="bg-[var(--surface)] border border-[var(--primary)]/10">
            <div className="p-3 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">₹{value}</p>
              <p className="text-[10px] text-[var(--muted)] mt-0.5">{label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--foreground)]">{t("transaction_list")}</p>
        <Badge variant="success" size="sm">{t("active")}</Badge>
      </div>

      <div className="flex flex-col">
        {DEMO_PROVIDER_TRANSACTIONS.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between py-3 border-b border-[var(--primary)]/10 last:border-0">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tx.direction === "credit" ? "bg-[var(--success)]/10" : "bg-[var(--muted)]/10"
              }`}>
                <ArrowRightIcon className={`w-4 h-4 ${
                  tx.direction === "credit" ? "text-[var(--success)]" : "text-[var(--muted)]"
                }`} />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--foreground)]">{tx.description}</p>
                <p className="text-xs text-[var(--muted)]">
                  {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(tx.createdAt)}
                </p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${
              tx.direction === "credit" ? "text-[var(--success)]" : "text-[var(--muted)]"
            }`}>
              {tx.direction === "credit" ? "+" : "-"}₹{tx.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
