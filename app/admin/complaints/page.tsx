"use client";

import { useState } from "react";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/Button";
import { DEMO_COMPLAINTS, DEMO_PROVIDERS } from "../../../data/demo";
import { AlertIcon, SearchIcon } from "../../../components/ui/icons";

const STATUS_COLORS: Record<string, "danger" | "warning" | "success"> = {
  open: "danger",
  in_progress: "warning",
  resolved: "success",
};

export default function AdminComplaintsPage() {
  const { t, lang } = useLanguage();
  const [complaints, setComplaints] = useState(DEMO_COMPLAINTS);
  const [search, setSearch] = useState("");

  const filtered = complaints.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.id.toLowerCase().includes(q) || c.jobId.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
  });

  function handleResolve(id: string) {
    setComplaints((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: "resolved" } : c)
    );
  }

  function handleProgress(id: string) {
    setComplaints((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: "in_progress" } : c)
    );
  }

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t("admin_complaints")}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">
          {complaints.filter((c) => c.status !== "resolved").length} {lang === "en" ? "open" : "खुली"}
        </p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("search") + " job ID, description..."}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 transition-shadow"
          style={{ border: "1px solid var(--border)", background: "white" }}
        />
      </div>

      {filtered.length === 0 ? (
        <Card className="p-12 text-center" style={{ background: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <AlertIcon className="w-10 h-10 mx-auto mb-3 text-[var(--success)]" />
          <p className="text-base font-medium text-[var(--foreground)]">All complaints resolved</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((complaint) => {
            const provider = DEMO_PROVIDERS.find((p) => p.id === complaint.providerId);
            const borderColor = complaint.status === "open" ? "var(--danger)" : complaint.status === "in_progress" ? "var(--warning)" : "var(--success)";
            return (
              <Card
                key={complaint.id}
                className="p-4 transition-shadow"
                style={{ borderLeft: `4px solid ${borderColor}` }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(194,65,12,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-[var(--muted)]">{complaint.id}</span>
                      <Badge variant={STATUS_COLORS[complaint.status] ?? "default"} size="sm">
                        {complaint.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-[var(--foreground)] leading-relaxed">{complaint.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[var(--muted)]">
                      <span>Job: {complaint.jobId}</span>
                      <span>Provider: {provider?.name ?? "—"}</span>
                      <span>
                        {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(complaint.createdAt)}
                      </span>
                    </div>
                  </div>
                  {complaint.status !== "resolved" && (
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {complaint.status === "open" && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleProgress(complaint.id)}
                          style={{ border: "1px solid #FDE68A", background: "#FEF3C7", color: "var(--warning)" }}
                        >
                          {t("in_progress")}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        onClick={() => handleResolve(complaint.id)}
                        style={{ background: "var(--success)", color: "#fff" }}
                      >
                        {t("resolved")}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
