import { notFound } from "next/navigation";
import { PipelineWorkspace } from "@/components/pipeline-workspace";
import { pipelineRuns } from "@/lib/mock-data";

export function generateStaticParams() {
  return pipelineRuns.map((run) => ({ id: run.id }));
}

export default function PipelineDetailPage({ params }: { params: { id: string } }) {
  const run = pipelineRuns.find((r) => r.id === params.id);
  if (!run) notFound();

  return <PipelineWorkspace key={run.id} run={run} runs={pipelineRuns} />;
}
