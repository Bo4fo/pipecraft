import * as React from "react";
import type { StatusKind } from "@pipecraft/tokens";
import { StatusBadge, type StatusBadgeProps } from "../core/StatusBadge";

export type DeploymentStatusKind = Extract<
  StatusKind,
  "queued" | "deploying" | "success" | "failed" | "cancelled"
>;

export interface DeploymentStatusProps extends Omit<StatusBadgeProps, "status"> {
  status: DeploymentStatusKind;
}

/** StatusBadge scoped to deployment lifecycle states. */
export const DeploymentStatus = React.forwardRef<HTMLSpanElement, DeploymentStatusProps>(
  ({ status, ...props }, ref) => <StatusBadge ref={ref} status={status} {...props} />,
);
DeploymentStatus.displayName = "DeploymentStatus";
