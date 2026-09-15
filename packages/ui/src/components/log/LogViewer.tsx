import * as React from "react";
import { ChevronDown, ChevronRight, Copy, Search, WrapText } from "lucide-react";
import { cn } from "../../lib/cn";
import { parseAnsi, stripAnsi } from "../../lib/ansi";
import { IconButton } from "../core/IconButton";
import { Input } from "../core/Input";
import type { LogLevel, LogLine } from "./types";

interface GroupedLine {
  line: LogLine;
  groupId: string | null;
  isGroupHeader: boolean;
}

function groupLines(lines: LogLine[]): GroupedLine[] {
  let currentGroup: string | null = null;
  return lines.map((line) => {
    if (line.group) {
      currentGroup = line.id;
      return { line, groupId: line.id, isGroupHeader: true };
    }
    return { line, groupId: currentGroup, isGroupHeader: false };
  });
}

const levelRowClass: Record<LogLevel, string> = {
  debug: "",
  info: "",
  warning: "bg-status-warning-bg/60",
  error: "bg-status-danger-bg/60",
};

export interface LogViewerProps {
  lines: LogLine[];
  className?: string;
  /** Auto-scroll to the newest line as `lines` grows. Defaults to true. */
  autoScroll?: boolean;
  showLineNumbers?: boolean;
  showTimestamps?: boolean;
  height?: number | string;
}

export function LogViewer({
  lines,
  className,
  autoScroll: autoScrollProp = true,
  showLineNumbers = true,
  showTimestamps = true,
  height = 420,
}: LogViewerProps) {
  const [query, setQuery] = React.useState("");
  const [levelFilter, setLevelFilter] = React.useState<"all" | LogLevel>("all");
  const [autoScroll, setAutoScroll] = React.useState(autoScrollProp);
  const [wrap, setWrap] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const grouped = React.useMemo(() => groupLines(lines), [lines]);

  const filtered = React.useMemo(() => {
    return grouped.filter(({ line }) => {
      if (levelFilter !== "all" && line.level !== levelFilter && !line.group) return false;
      if (query && !stripAnsi(line.content).toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [grouped, levelFilter, query]);

  React.useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, autoScroll]);

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = async () => {
    const text = filtered.map(({ line }) => stripAnsi(line.content)).join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard unavailable (unsupported browser / insecure context); no-op
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24;
    setAutoScroll(atBottom);
  };

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-lg border border-border-default bg-log-bg", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border-default/40 px-2.5 py-2">
        <div className="relative flex-1 min-w-[10rem]">
          <Search className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-fg-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs…"
            className="h-7 border-none bg-white/5 pl-7 text-xs text-log-fg placeholder:text-fg-tertiary focus-visible:ring-1"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "error", "warning", "info", "debug"] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setLevelFilter(level)}
              className={cn(
                "rounded-md px-2 py-1 text-xs font-medium capitalize text-fg-tertiary transition-colors hover:text-log-fg",
                levelFilter === level && "bg-white/10 text-log-fg",
              )}
            >
              {level}
            </button>
          ))}
        </div>
        <IconButton
          label={wrap ? "Disable line wrap" : "Enable line wrap"}
          size="sm"
          variant="ghost"
          className={cn("text-fg-tertiary hover:text-log-fg", wrap && "text-log-fg")}
          onClick={() => setWrap((w) => !w)}
        >
          <WrapText className="size-3.5" />
        </IconButton>
        <IconButton label="Copy logs" size="sm" variant="ghost" className="text-fg-tertiary hover:text-log-fg" onClick={handleCopy}>
          <Copy className="size-3.5" />
        </IconButton>
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-auto font-mono text-xs leading-5"
        style={{ height }}
      >
        {filtered.map(({ line, groupId, isGroupHeader }) => {
          if (groupId && !isGroupHeader && collapsed.has(groupId)) return null;
          return (
            <div
              key={line.id}
              className={cn(
                "flex gap-3 px-2.5 py-0.5 hover:bg-white/[0.03]",
                line.level && levelRowClass[line.level],
              )}
            >
              {isGroupHeader ? (
                <button
                  type="button"
                  onClick={() => toggleGroup(line.id)}
                  className="flex flex-1 items-center gap-1.5 text-log-fg"
                >
                  {collapsed.has(line.id) ? (
                    <ChevronRight className="size-3.5 text-fg-tertiary" />
                  ) : (
                    <ChevronDown className="size-3.5 text-fg-tertiary" />
                  )}
                  <span className="font-semibold">{line.group}</span>
                </button>
              ) : (
                <>
                  {showLineNumbers && (
                    <span className="w-8 shrink-0 select-none text-right text-log-line">{lines.indexOf(line) + 1}</span>
                  )}
                  {showTimestamps && line.timestamp && (
                    <span className="shrink-0 select-none text-log-line">{line.timestamp}</span>
                  )}
                  <span className={cn("min-w-0 flex-1 text-log-fg", wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre")}>
                    {parseAnsi(line.content).map((segment, i) => (
                      <span key={i} className={segment.className}>
                        {segment.text}
                      </span>
                    ))}
                  </span>
                </>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="px-2.5 py-6 text-center text-fg-tertiary">No log lines match your filters.</div>
        )}
      </div>
    </div>
  );
}
