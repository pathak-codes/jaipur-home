"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "../lib/i18n/useLanguage";
import { DemoProvider } from "../lib/demoStore";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <DemoProvider>{children}</DemoProvider>
    </LanguageProvider>
  );
}
