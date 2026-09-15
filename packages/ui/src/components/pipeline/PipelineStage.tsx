import * as React from "react";
import { getStatusConfig } from "@pipecraft/tokens";
import { cn } from "../../lib/cn";
import { formatDuration } from "../../lib/format";
import { statusIconMap } from "../../lib/status-icons";
import { PipelineStep } from "./PipelineStep";
import type { PipelineStageData } from "./types";

const borderByRole: Record<string, string> = {
  success: "border-status-success-border",
  danger: "border-status-danger-border",
  info: "border-status-info-border",
  warning: "border-status-warning-border",
  neutral: "border-border-default",
  accent: "border-status-accent-border",
};

export interface PipelineStageProps extends React.HTMLAttributes<HTMLDivElement> {
  stage: PipelineStageData;
  selected?: boolean;
  selectedStepId?: string;
  onSelectStep?: (stepId: string) => void;
  onSelectStage?: (stageId: string) => void;
}

export const PipelineStage = React.forwardRef<HTMLDivElement, PipelineStageProps>(
  ({ stage, selected, selectedStepId, onSelectStep, onSelectStage, className, ...props }, ref) => {
    const config = getStatusConfig(stage.status);
    const Icon = statusIconMap[config.icon];

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-56 shrink-0 flex-col rounded-lg border bg-surface shadow-sm",
          borderByRole[config.role],
          selected && "ring-2 ring-border-focus",
          className,
        )}
        {...props}
      >
        <button
          type="button"
          onClick={() => onSelectStage?.(stage.id)}
          className="flex items-center gap-2 rounded-t-lg border-b border-border-subtle px-3 py-2.5 text-left transition-colors hover:bg-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          {Icon && (
            <Icon
              className={cn("size-4 shrink-0", config.animated && "animate-pc-spin")}
              style={{ color: `var(--pc-status-${config.role})` }}
              aria-hidden
            />
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-fg-primary">{stage.name}</span>
          {typeof stage.durationMs === "number" && (
            <span className="shrink-0 font-mono text-xs text-fg-tertiary">{formatDuration(stage.durationMs)}</span>
          )}
        </button>
        {stage.steps && stage.steps.length > 0 && (
          <div className="flex flex-col gap-0.5 p-1.5">
            {stage.steps.map((step) => (
              <PipelineStep
                key={step.id}
                step={step}
                selected={selectedStepId === step.id}
                onClick={() => onSelectStep?.(step.id)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);
PipelineStage.displayName = "PipelineStage";
