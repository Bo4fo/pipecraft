import * as React from "react";
import type { PipelineStageStatus } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";

export interface PipelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: PipelineStageStatus;
  orientation?: "horizontal" | "vertical";
}

const lineColor: Record<PipelineStageStatus, string> = {
  success: "bg-status-success",
  failed: "bg-status-danger",
  running: "bg-status-info",
  queued: "bg-border-strong",
  cancelled: "bg-border-strong",
  skipped: "bg-border-strong",
};

export const PipelineConnector = React.forwardRef<HTMLDivElement, PipelineConnectorProps>(
  ({ status = "queued", orientation = "horizontal", className, ...props }, ref) => {
    const active = status === "running";
    return (
      <div
        ref={ref}
        aria-hidden
        className={cn(
          "shrink-0",
          orientation === "horizontal" ? "h-px w-8 sm:w-12" : "h-8 w-px sm:h-12",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "size-full",
            lineColor[status],
            active && "animate-pc-pulse",
          )}
        />
      </div>
    );
  },
);
PipelineConnector.displayName = "PipelineConnector";
