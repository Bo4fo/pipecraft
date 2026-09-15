"use client";

import * as React from "react";
import { Pipeline, type PipelineStageData } from "@pipecraft/ui";
import { ApiTable, ComponentDocHeader, ComponentPreview, Section, Snippet } from "@/components/docs/doc-sections";

const demoStages: PipelineStageData[] = [
  { id: "build", name: "Build", status: "success", durationMs: 42_000, steps: [{ id: "b1", name: "Install dependencies", status: "success", durationMs: 18_000 }, { id: "b2", name: "Compile", status: "success", durationMs: 24_000 }] },
  { id: "test", name: "Test", status: "success", durationMs: 68_000, steps: [{ id: "t1", name: "Unit tests", status: "success", durationMs: 40_000 }, { id: "t2", name: "Integration tests", status: "success", durationMs: 28_000 }] },
  { id: "scan", name: "Security Scan", status: "running", steps: [{ id: "s1", name: "Dependency audit", status: "success", durationMs: 12_000 }, { id: "s2", name: "SAST scan", status: "running" }] },
  { id: "deploy", name: "Deploy", status: "queued", steps: [{ id: "d1", name: "Push image", status: "queued" }] },
  { id: "verify", name: "Verify", status: "queued", steps: [{ id: "v1", name: "Smoke tests", status: "queued" }] },
];

export default function PipelineDocPage() {
  const [selected, setSelected] = React.useState<{ stageId: string; stepId?: string }>({ stageId: "scan" });

  return (
    <div>
      <ComponentDocHeader
        name="Pipeline"
        description="Renders a sequence of pipeline stages (Build → Test → Security Scan → Deploy → Verify) connected by animated PipelineConnectors, with per-step drill-down."
      />

      <ComponentPreview>
        <div className="w-full overflow-x-auto">
          <Pipeline
            stages={demoStages}
            selectedStageId={selected.stageId}
            selectedStepId={selected.stepId}
            onSelectStage={(stageId) => setSelected({ stageId })}
            onSelectStep={(stageId, stepId) => setSelected({ stageId, stepId })}
          />
        </div>
      </ComponentPreview>

      <Section title="Installation">
        <Snippet language="bash" code={"npm install @pipecraft/ui"} />
      </Section>

      <Section title="Usage">
        <Snippet
          code={`import { Pipeline, type PipelineStageData } from "@pipecraft/ui";

const stages: PipelineStageData[] = [
  { id: "build", name: "Build", status: "success", durationMs: 42_000 },
  { id: "test", name: "Test", status: "running" },
  { id: "deploy", name: "Deploy", status: "queued" },
];

<Pipeline
  stages={stages}
  onSelectStage={(stageId) => console.log(stageId)}
  onSelectStep={(stageId, stepId) => console.log(stageId, stepId)}
/>`}
        />
      </Section>

      <Section title="API">
        <ApiTable
          rows={[
            { name: "stages", type: "PipelineStageData[]", description: "Ordered stages to render." },
            { name: "selectedStageId", type: "string", description: "Highlights a stage." },
            { name: "selectedStepId", type: "string", description: "Highlights a step within the selected stage." },
            { name: "onSelectStage", type: "(stageId: string) => void", description: "Called when a stage header is clicked." },
            { name: "onSelectStep", type: "(stageId: string, stepId: string) => void", description: "Called when a step row is clicked." },
            { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Layout direction." },
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-fg-secondary">
          The stage list has <code className="font-mono text-xs">role=&quot;list&quot;</code>, and each stage/step is a real{" "}
          <code className="font-mono text-xs">&lt;button&gt;</code>, so the whole pipeline is keyboard-navigable with Tab and
          activatable with Enter/Space.
        </p>
      </Section>
    </div>
  );
}
