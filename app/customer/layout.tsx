"use client";

import { ReactNode } from "react";
import { CustomerLayout } from "../../components/layout/CustomerLayout";

export default function CustomerLayoutWrapper({ children }: { children: ReactNode }) {
  return <CustomerLayout>{children}</CustomerLayout>;
}
