"use client";

import { useState } from "react";
import { useLanguage } from "../../../lib/i18n/useLanguage";
import { Card } from "../../../components/ui/Card";
import { SearchIcon } from "../../../components/ui/icons";

const USERS = [
  { id: "c1", name: "Priya Sharma", phone: "9999888877", email: "priya.sharma@email.com", joined: "Jan 2024", totalJobs: 5, status: "active" },
  { id: "c2", name: "Rahul Jain", phone: "9999777766", email: "rahul.jain@email.com", joined: "Mar 2024", totalJobs: 2, status: "active" },
  { id: "c3", name: "Anita Patel", phone: "9999666655", email: "anita.patel@email.com", joined: "Feb 2024", totalJobs: 8, status: "active" },
];

export default function AdminUsersPage() {
  const { t, lang } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = USERS.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-6" style={{ background: "var(--background)", minHeight: "100vh" }}>
      <div>
        <h1 className="text-xl font-bold text-[var(--foreground)]">{t("admin_users")}</h1>
        <p className="text-sm text-[var(--muted)] mt-0.5">{filtered.length} {lang === "en" ? "registered users" : "रजिस्टर्ड उपयोगकर्ता"}</p>
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
                "ID", t("name"), t("phone"), "Email",
                t("joined"), t("total_jobs"), t("status"),
              ].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide uppercase" style={{ color: "var(--primary)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                className="last:border-0 transition-colors"
                style={{ borderBottom: "1px solid var(--border)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFBEB")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-4 py-3 font-medium text-[var(--muted)] text-xs">{user.id}</td>
                <td className="px-4 py-3 font-medium text-[var(--foreground)]">{user.name}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{user.phone}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{user.email}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{user.joined}</td>
                <td className="px-4 py-3 text-[var(--muted)]">{user.totalJobs}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: "#F0FDF4", color: "var(--success)", border: "1px solid #BBF7D0" }}
                  >
                    {user.status}
                  </span>
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
