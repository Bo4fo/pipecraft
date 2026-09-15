import * as React from "react";
import type { PipelineStageStatus } from "@pipecraft/tokens";
import { StatusBadge, type StatusBadgeProps } from "../core/StatusBadge";

export interface PipelineStatusProps extends Omit<StatusBadgeProps, "status"> {
  status: PipelineStageStatus;
}

/** Thin StatusBadge wrapper scoped to the six pipeline stage states. */
export const PipelineStatus = React.forwardRef<HTMLSpanElement, PipelineStatusProps>(
  ({ status, ...props }, ref) => <StatusBadge ref={ref} status={status} {...props} />,
);
PipelineStatus.displayName = "PipelineStatus";
