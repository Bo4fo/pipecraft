import * as React from "react";
import { LogViewer, type LogViewerProps } from "./LogViewer";

export interface BuildLogProps extends LogViewerProps {
  jobName?: string;
}

/** LogViewer preconfigured for CI job/step output, with a job name header. */
export function BuildLog({ jobName, ...props }: BuildLogProps) {
  return (
    <div className="flex flex-col gap-2">
      {jobName && <p className="font-mono text-xs text-fg-tertiary">{jobName}</p>}
      <LogViewer {...props} />
    </div>
  );
}
