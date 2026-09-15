import * as React from "react";
import type { PipelineStageStatus } from "@pipecraft/tokens";
import { StatusBadge, type StatusBadgeProps } from "../core/StatusBadge";

export interface BuildStatusProps extends Omit<StatusBadgeProps, "status"> {
  status: PipelineStageStatus;
}

/** StatusBadge scoped to CI build outcomes (queued/running/success/failed/cancelled/skipped). */
export const BuildStatus = React.forwardRef<HTMLSpanElement, BuildStatusProps>(
  ({ status, ...props }, ref) => <StatusBadge ref={ref} status={status} {...props} />,
);
BuildStatus.displayName = "BuildStatus";
