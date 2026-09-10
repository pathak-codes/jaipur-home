"use client";

import { ReactNode } from "react";
import { ProviderLayout } from "../../components/layout/ProviderLayout";

export default function ProviderLayoutWrapper({ children }: { children: ReactNode }) {
  return <ProviderLayout>{children}</ProviderLayout>;
}
