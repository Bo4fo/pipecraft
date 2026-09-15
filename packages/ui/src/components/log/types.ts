export type LogLevel = "debug" | "info" | "warning" | "error";

export interface LogLine {
  id: string;
  /** Raw content, may contain ANSI escape codes. */
  content: string;
  timestamp?: string;
  level?: LogLevel;
  /** Starts a new collapsible group with this label; subsequent lines belong to it until the next group starts. */
  group?: string;
}
