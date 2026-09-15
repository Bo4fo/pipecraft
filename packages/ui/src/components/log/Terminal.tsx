import * as React from "react";
import { cn } from "../../lib/cn";
import { parseAnsi } from "../../lib/ansi";

export interface TerminalLine {
  id: string;
  content: string;
  /** Render with a leading prompt, e.g. "$ ". */
  isCommand?: boolean;
}

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[];
  title?: string;
  prompt?: string;
}

/** A minimal chrome-framed terminal window for displaying command output/onboarding snippets. */
export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  ({ lines, title = "terminal", prompt = "$", className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-lg border border-border-default bg-log-bg shadow-sm", className)}
      {...props}
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-status-danger/70" />
        <span className="size-2.5 rounded-full bg-status-warning/70" />
        <span className="size-2.5 rounded-full bg-status-success/70" />
        <span className="ml-2 font-mono text-[11px] text-fg-tertiary">{title}</span>
      </div>
      <div className="overflow-x-auto p-3 font-mono text-xs leading-6">
        {lines.map((line) => (
          <div key={line.id} className="whitespace-pre text-log-fg">
            {line.isCommand && <span className="mr-2 text-status-success">{prompt}</span>}
            {parseAnsi(line.content).map((segment, i) => (
              <span key={i} className={segment.className}>
                {segment.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
);
Terminal.displayName = "Terminal";
