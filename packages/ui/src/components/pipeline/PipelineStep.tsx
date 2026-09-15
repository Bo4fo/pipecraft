import * as React from "react";
import { getStatusConfig } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";
import { formatDuration } from "../../lib/format";
import { statusIconMap } from "../../lib/status-icons";
import type { PipelineStepData } from "./types";

export interface PipelineStepProps extends React.HTMLAttributes<HTMLButtonElement> {
  step: PipelineStepData;
  selected?: boolean;
}

export const PipelineStep = React.forwardRef<HTMLButtonElement, PipelineStepProps>(
  ({ step, selected, className, ...props }, ref) => {
    const config = getStatusConfig(step.status);
    const Icon = statusIconMap[config.icon];
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs transition-colors",
          "hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus",
          selected && "bg-subtle ring-1 ring-border-strong",
          className,
        )}
        {...props}
      >
        {Icon && (
          <Icon
            className={cn("size-3.5 shrink-0", config.animated && "animate-pc-spin")}
            style={{ color: `var(--pc-status-${config.role})` }}
            aria-hidden
          />
        )}
        <span className="min-w-0 flex-1 truncate text-fg-primary">{step.name}</span>
        {typeof step.durationMs === "number" && (
          <span className="shrink-0 font-mono text-fg-tertiary">{formatDuration(step.durationMs)}</span>
        )}
      </button>
    );
  },
);
PipelineStep.displayName = "PipelineStep";
