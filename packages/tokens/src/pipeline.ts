import type { StatusKind } from "./status";

/**
 * The subset of StatusKind that a pipeline stage/step can be in. Kept as a
 * literal subset (not a separate enum) so PipelineStatus, PipelineStage and
 * PipelineStep can share getStatusConfig with the rest of the system.
 */
export const PIPELINE_STAGE_STATES = [
  "queued",
  "running",
  "success",
  "failed",
  "cancelled",
  "skipped",
] as const;

export type PipelineStageStatus = (typeof PIPELINE_STAGE_STATES)[number];

export function assertPipelineStageStatus(kind: StatusKind): PipelineStageStatus {
  if ((PIPELINE_STAGE_STATES as readonly string[]).includes(kind)) {
    return kind as PipelineStageStatus;
  }
  throw new Error(`"${kind}" is not a valid pipeline stage status`);
}
