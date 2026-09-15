import { notFound } from "next/navigation";
import { BuildStatus } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { PipelineDetailClient } from "@/components/pipeline-detail-client";
import { PipelineRunMeta } from "@/components/pipeline-run-meta";
import { pipelineRuns } from "@/lib/mock-data";

export function generateStaticParams() {
  return pipelineRuns.map((run) => ({ id: run.id }));
}

export default function PipelineDetailPage({ params }: { params: { id: string } }) {
  const run = pipelineRuns.find((r) => r.id === params.id);
  if (!run) notFound();

  return (
    <div>
      <PageHeader
        title={run.repository}
        description={`Pipeline run ${run.id}`}
        actions={<BuildStatus status={run.status} size="sm" />}
      />
      <PipelineRunMeta run={run} />
      <PipelineDetailClient run={run} />
    </div>
  );
}
