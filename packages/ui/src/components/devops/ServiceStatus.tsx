import * as React from "react";
import type { StatusKind } from "@pipecraft/tokens";
import { StatusBadge, type StatusBadgeProps } from "../core/StatusBadge";

export type ServiceStatusKind = Extract<StatusKind, "healthy" | "degraded" | "offline" | "deploying">;

export interface ServiceStatusProps extends Omit<StatusBadgeProps, "status"> {
  status: ServiceStatusKind;
}

/** StatusBadge scoped to live service health states. */
export const ServiceStatus = React.forwardRef<HTMLSpanElement, ServiceStatusProps>(
  ({ status, ...props }, ref) => <StatusBadge ref={ref} status={status} {...props} />,
);
ServiceStatus.displayName = "ServiceStatus";
