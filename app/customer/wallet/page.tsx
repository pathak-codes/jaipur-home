"use client";

import { useLanguage } from "../../../lib/i18n/useLanguage";
import { useDemo } from "../../../lib/demoStore";
import { Card } from "../../../components/ui/Card";
import { ArrowRightIcon } from "../../../components/ui/icons";

export default function CustomerWalletPage() {
  const { lang, t } = useLanguage();
  const { state } = useDemo();

  const balance = state.customerWalletTransactions.reduce((acc, tx) =>
    tx.direction === "credit" ? acc + tx.amount : acc - tx.amount, 0
  );

  return (
    <div className="p-5 max-w-lg mx-auto w-full flex flex-col gap-5 bg-[var(--background)]">
      <div>
        <h1 className="text-lg font-bold text-[var(--foreground)]">{t("wallet")}</h1>
      </div>

      <Card className="bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-md">
        <div className="p-5">
          <p className="text-sm font-medium text-white/70">{t("refund_balance")}</p>
          <p className="text-3xl font-bold text-white mt-1">₹{balance.toFixed(0)}</p>
          <p className="text-xs text-white/60 mt-2">{t("no_withdrawal")}</p>
        </div>
      </Card>

      <div>
        <p className="text-sm font-semibold text-[var(--foreground)] mb-3">{t("transaction_history")}</p>
        <div className="flex flex-col">
          {state.customerWalletTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.direction === "credit" ? "bg-[var(--success)]/10" : "bg-[var(--danger)]/10"
                }`}>
                  <ArrowRightIcon className={`w-4 h-4 ${
                    tx.direction === "credit" ? "text-[var(--success)]" : "text-[var(--danger)]"
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
                tx.direction === "credit" ? "text-[var(--success)]" : "text-[var(--danger)]"
              }`}>
                {tx.direction === "credit" ? "+" : "-"}₹{tx.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-lg bg-[var(--primary)]/5 border border-[var(--primary)]/10">
        <p className="text-xs text-[var(--muted)] text-center">
          {t("demo_simulation")} — {lang === "en" ? "This is demo data" : "यह डेमो डेटा है"}
        </p>
      </div>
    </div>
  );
}
