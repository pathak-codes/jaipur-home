"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { ShieldIcon } from "../../../components/ui/icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email && password) {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <div className="w-full max-w-sm px-5">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] flex items-center justify-center mb-4">
            <ShieldIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">JaipurHome Admin</h1>
          <p className="text-sm text-[var(--muted)] mt-1">Internal use only</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@jaipurhome.com"
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            <Button type="submit" size="lg" fullWidth>
              Login to Admin Panel
            </Button>
          </form>
        </Card>

        <p className="text-xs text-[var(--muted)] text-center mt-4">
          DEMO SIMULATION — Use any email/password
        </p>
      </div>
    </div>
  );
}
