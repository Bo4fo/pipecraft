import { PipelineWorkspace } from "@/components/pipeline-workspace";
import { pipelineRuns } from "@/lib/mock-data";

export default function PipelinesPage() {
  return <PipelineWorkspace runs={pipelineRuns} />;
}
