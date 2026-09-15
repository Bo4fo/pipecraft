import * as React from "react";
import { cn } from "../../lib/cn";
import { PipelineConnector } from "./PipelineConnector";
import { PipelineStage } from "./PipelineStage";
import type { PipelineStageData } from "./types";

export interface PipelineProps extends React.HTMLAttributes<HTMLDivElement> {
  stages: PipelineStageData[];
  selectedStageId?: string;
  selectedStepId?: string;
  onSelectStage?: (stageId: string) => void;
  onSelectStep?: (stageId: string, stepId: string) => void;
  orientation?: "horizontal" | "vertical";
}

/**
 * Renders a sequence of pipeline stages (e.g. Build -> Test -> Security Scan
 * -> Deploy -> Verify) connected by PipelineConnector, with the connector
 * color/animation driven by the status of the stage it leads into.
 */
export const Pipeline = React.forwardRef<HTMLDivElement, PipelineProps>(
  (
    { stages, selectedStageId, selectedStepId, onSelectStage, onSelectStep, orientation = "horizontal", className, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      role="list"
      aria-label="Pipeline"
      className={cn(
        "flex overflow-x-auto p-1",
        orientation === "horizontal" ? "flex-row items-start" : "flex-col items-stretch",
        className,
      )}
      {...props}
    >
      {stages.map((stage, index) => (
        <React.Fragment key={stage.id}>
          {index > 0 && (
            <div className={cn("flex items-center justify-center", orientation === "horizontal" ? "pt-6" : "pl-6")}>
              <PipelineConnector status={stage.status} orientation={orientation} />
            </div>
          )}
          <div role="listitem">
            <PipelineStage
              stage={stage}
              selected={selectedStageId === stage.id}
              selectedStepId={selectedStageId === stage.id ? selectedStepId : undefined}
              onSelectStage={onSelectStage}
              onSelectStep={(stepId) => onSelectStep?.(stage.id, stepId)}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  ),
);
Pipeline.displayName = "Pipeline";
