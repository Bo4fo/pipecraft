import type { PipelineStageStatus } from "@pipecraft/tokens";

export interface PipelineStepData {
  id: string;
  name: string;
  status: PipelineStageStatus;
  durationMs?: number;
  startedAt?: string;
  finishedAt?: string;
}

export interface PipelineStageData {
  id: string;
  name: string;
  status: PipelineStageStatus;
  durationMs?: number;
  startedAt?: string;
  finishedAt?: string;
  steps?: PipelineStepData[];
  /** Ids of stages this stage depends on. Informational only for the default renderer. */
  dependsOn?: string[];
}
