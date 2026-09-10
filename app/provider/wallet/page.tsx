"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { useDemo } from "../../../lib/demoStore";
import { ArrowRightIcon } from "../../../components/ui/icons";

export default function ProviderWalletPage() {
  const { t } = useLanguage();
  const { state } = useDemo();

  const balance = state.providerWalletBalance;

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("wallet")}</h1>
      </div>

      <Card className="bg-gradient-to-br from-[var(--primary)] via-[var(--primary)] to-[var(--accent)] shadow-lg shadow-[var(--primary)]/25">
        <div className="p-5 text-center">
          <p className="text-sm font-medium text-white/70">{t("balance")}</p>
          <p className="text-4xl font-bold text-white mt-2">₹{balance.toFixed(0)}</p>
        </div>
      </Card>

      <Button size="lg" fullWidth>
        {t("upi_withdrawal")}
      </Button>

      <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/15">
        <p className="text-xs text-[var(--muted)] text-center">
          {t("settlement_info")}
        </p>
      </div>

      <div>
        <p className="text-sm font-semibold text-[var(--foreground)] mb-3">{t("transaction_history")}</p>
        <div className="flex flex-col">
          {state.providerTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b border-[var(--primary)]/10 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.direction === "credit" ? "bg-[var(--success)]/10" : "bg-[var(--muted)]/10"
                }`}>
                  <ArrowRightIcon className={`w-4 h-4 ${tx.direction === "credit" ? "text-[var(--success)]" : "text-[var(--muted)]"}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--foreground)]">{tx.description}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(tx.createdAt)}
                  </p>
                </div>
              </div>
              <span className={`text-sm font-semibold ${tx.direction === "credit" ? "text-[var(--success)]" : "text-[var(--muted)]"}`}>
                {tx.direction === "credit" ? "+" : "-"}₹{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
