import * as React from "react";
import { GitCommitHorizontal } from "lucide-react";
import { cn } from "../../lib/cn";
import { truncateHash } from "../../lib/format";

export interface CommitHashProps extends React.HTMLAttributes<HTMLSpanElement> {
  hash: string;
  length?: number;
  hideIcon?: boolean;
  href?: string;
}

export const CommitHash = React.forwardRef<HTMLSpanElement, CommitHashProps>(
  ({ hash, length = 7, hideIcon, href, className, ...props }, ref) => {
    const content = (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-md bg-subtle px-1.5 py-0.5 font-mono text-xs text-fg-secondary",
          href && "hover:bg-muted hover:text-fg-primary",
          className,
        )}
        {...props}
      >
        {!hideIcon && <GitCommitHorizontal className="size-3" aria-hidden />}
        {truncateHash(hash, length)}
      </span>
    );
    if (!href) return content;
    return (
      <a href={href} className="inline-flex no-underline">
        {content}
      </a>
    );
  },
);
CommitHash.displayName = "CommitHash";
