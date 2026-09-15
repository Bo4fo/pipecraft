"use client";

import * as React from "react";
import { BuildLog, Pipeline } from "@pipecraft/ui";
import type { PipelineRun } from "@/lib/mock-data";
import { generateStepLogs } from "@/lib/mock-logs";

export function PipelineDetailClient({ run }: { run: PipelineRun }) {
  const firstRunningOrFirst = React.useMemo(() => {
    for (const stage of run.stages) {
      const step = stage.steps?.find((s) => s.status === "running") ?? stage.steps?.[0];
      if (step) return { stageId: stage.id, stepId: step.id };
    }
    return null;
  }, [run]);

  const [selected, setSelected] = React.useState(firstRunningOrFirst);

  const selectedStep = React.useMemo(() => {
    if (!selected) return null;
    const stage = run.stages.find((s) => s.id === selected.stageId);
    const step = stage?.steps?.find((s) => s.id === selected.stepId);
    return step ? { stage, step } : null;
  }, [selected, run]);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-x-auto rounded-lg border border-border-default bg-surface p-3">
        <Pipeline
          stages={run.stages}
          selectedStageId={selected?.stageId}
          selectedStepId={selected?.stepId}
          onSelectStage={(stageId) => {
            const stage = run.stages.find((s) => s.id === stageId);
            const step = stage?.steps?.[0];
            if (step) setSelected({ stageId, stepId: step.id });
          }}
          onSelectStep={(stageId, stepId) => setSelected({ stageId, stepId })}
        />
      </div>

      {selectedStep && (
        <BuildLog
          jobName={`${selectedStep.stage?.name} / ${selectedStep.step.name}`}
          lines={generateStepLogs(selectedStep.step.name, selectedStep.step.status)}
        />
      )}
    </div>
  );
}
