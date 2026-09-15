import * as React from "react";
import { Download, FileArchive } from "lucide-react";
import { cn } from "../../lib/cn";
import { formatRelativeTime } from "../../lib/format";
import { iconButtonVariants } from "../core/IconButton";

export interface ArtifactCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  sizeBytes: number;
  createdAt: string;
  downloadUrl?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(1)} ${units[unitIndex]}`;
}

export const ArtifactCard = React.forwardRef<HTMLDivElement, ArtifactCardProps>(
  ({ name, sizeBytes, createdAt, downloadUrl, className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center gap-3 rounded-lg border border-border-default bg-surface px-3 py-2.5", className)} {...props}>
      <FileArchive className="size-4 shrink-0 text-fg-tertiary" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate font-mono text-sm text-fg-primary">{name}</p>
        <p className="text-xs text-fg-tertiary">
          {formatBytes(sizeBytes)} &middot; {formatRelativeTime(createdAt)}
        </p>
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl}
          download
          aria-label={`Download ${name}`}
          title={`Download ${name}`}
          className={iconButtonVariants({ variant: "ghost", size: "sm" })}
        >
          <Download className="size-4" />
        </a>
      )}
    </div>
  ),
);
ArtifactCard.displayName = "ArtifactCard";
