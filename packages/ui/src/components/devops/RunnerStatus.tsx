import * as React from "react";
import type { StatusKind } from "@pipecraft/tokens";
import { StatusBadge, type StatusBadgeProps } from "../core/StatusBadge";

export type RunnerStatusKind = Extract<StatusKind, "healthy" | "running" | "offline" | "pending">;

export interface RunnerStatusProps extends Omit<StatusBadgeProps, "status"> {
  status: RunnerStatusKind;
}

/** StatusBadge scoped to CI runner/agent availability. */
export const RunnerStatus = React.forwardRef<HTMLSpanElement, RunnerStatusProps>(
  ({ status, ...props }, ref) => <StatusBadge ref={ref} status={status} {...props} />,
);
RunnerStatus.displayName = "RunnerStatus";
