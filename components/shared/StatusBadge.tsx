import type { JobStatus } from "../../lib/types";
import { Badge } from "../ui/Badge";

interface StatusBadgeProps {
  status: JobStatus;
  size?: "sm" | "md";
}

const VARIANT_MAP: Record<string, "default" | "success" | "warning" | "danger" | "accent" | "primary"> = {
  CREATED: "default",
  MATCHING: "warning",
  OFFERED: "warning",
  ACCEPTED: "accent",
  ON_THE_WAY: "primary",
  ARRIVED: "primary",
  COMPLETION_PENDING: "warning",
  COMPLETED: "success",
  PAYMENT_PENDING: "warning",
  PAID: "success",
  REVIEWED: "success",
  CANCELLED: "danger",
};

const LABEL_MAP: Record<JobStatus, string> = {
  CREATED: "Created",
  MATCHING: "Matching",
  OFFERED: "Offered",
  ACCEPTED: "Accepted",
  ON_THE_WAY: "On the way",
  ARRIVED: "Arrived",
  COMPLETION_PENDING: "Pending",
  COMPLETED: "Completed",
  PAYMENT_PENDING: "Payment pending",
  PAID: "Paid",
  REVIEWED: "Reviewed",
  CANCELLED: "Cancelled",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  return (
    <Badge variant={VARIANT_MAP[status] ?? "default"} size={size}>
      {LABEL_MAP[status]}
    </Badge>
  );
}
