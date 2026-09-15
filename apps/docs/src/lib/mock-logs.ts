import type { LogLine } from "@pipecraft/ui";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

function ts(offsetSeconds: number): string {
  const d = new Date(Date.now() - (60 - offsetSeconds) * 1000);
  return d.toISOString().slice(11, 23);
}

export function generateStepLogs(stepName: string, status: string): LogLine[] {
  const lines: LogLine[] = [
    {
      id: "l0",
      group: `Run ${stepName}`,
      content: `${BOLD}${CYAN}##[group]${stepName}${RESET}`,
      timestamp: ts(0),
    },
    { id: "l1", content: `${CYAN}$ pnpm run ${stepName.toLowerCase().replace(/\s+/g, ":")}${RESET}`, timestamp: ts(1) },
    { id: "l2", content: "resolving workspace dependencies...", timestamp: ts(2) },
    { id: "l3", content: `${GREEN}✓${RESET} @pipecraft/tokens resolved in 42ms`, timestamp: ts(3) },
    { id: "l4", content: `${GREEN}✓${RESET} @pipecraft/ui resolved in 118ms`, timestamp: ts(4) },
    { id: "l5", content: "starting task runner...", timestamp: ts(5), level: "debug" },
    { id: "l6", content: `[worker 1] processing chunk 1/4`, timestamp: ts(6) },
    { id: "l7", content: `[worker 2] processing chunk 2/4`, timestamp: ts(7) },
    {
      id: "l8",
      content: `${YELLOW}⚠ warning${RESET} deprecated option 'legacy-peer-deps' will be removed in a future release`,
      timestamp: ts(8),
      level: "warning",
    },
    { id: "l9", content: "[worker 3] processing chunk 3/4", timestamp: ts(9) },
    { id: "l10", content: "[worker 4] processing chunk 4/4", timestamp: ts(10) },
  ];

  if (status === "failed") {
    lines.push(
      {
        id: "l11",
        content: `${RED}✗ error${RESET} TypeError: Cannot read properties of undefined (reading 'map')`,
        timestamp: ts(11),
        level: "error",
      },
      { id: "l12", content: `    at buildManifest (src/build/manifest.ts:42:18)`, timestamp: ts(12), level: "error" },
      { id: "l13", content: `    at async run (src/build/index.ts:11:3)`, timestamp: ts(13), level: "error" },
      { id: "l14", content: `${RED}${BOLD}Process completed with exit code 1.${RESET}`, timestamp: ts(14), level: "error" },
    );
  } else if (status === "running") {
    lines.push({ id: "l11", content: "[worker 1] compiling module graph…", timestamp: ts(15) });
  } else if (status !== "skipped" && status !== "cancelled") {
    lines.push(
      { id: "l11", content: `${GREEN}✓${RESET} all chunks processed`, timestamp: ts(15) },
      { id: "l12", content: `${GREEN}${BOLD}Step completed successfully in 8.4s${RESET}`, timestamp: ts(16) },
    );
  } else {
    lines.push({ id: "l11", content: `Step ${status}.`, timestamp: ts(11) });
  }

  return lines;
}
