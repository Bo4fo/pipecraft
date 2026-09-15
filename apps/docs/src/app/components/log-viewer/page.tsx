"use client";

import { LogViewer, type LogLine } from "@pipecraft/ui";
import { ApiTable, ComponentDocHeader, ComponentPreview, Section, Snippet } from "@/components/docs/doc-sections";

const demoLines: LogLine[] = [
  { id: "1", content: "\x1b[36m$ pnpm run build\x1b[0m", timestamp: "00:00.12" },
  { id: "2", content: "resolving workspace dependencies...", timestamp: "00:00.41" },
  { id: "3", content: "\x1b[32m✓\x1b[0m @pipecraft/tokens resolved in 42ms", timestamp: "00:00.53" },
  { id: "4", content: "\x1b[33m⚠ warning\x1b[0m unused variable 'legacyConfig'", timestamp: "00:01.02", level: "warning" },
  { id: "5", content: "\x1b[31m✗ error\x1b[0m Type 'string' is not assignable to type 'number'", timestamp: "00:01.44", level: "error" },
  { id: "6", content: "\x1b[31m\x1b[1mProcess completed with exit code 1.\x1b[0m", timestamp: "00:01.45", level: "error" },
];

export default function LogViewerDocPage() {
  return (
    <div>
      <ComponentDocHeader
        name="LogViewer"
        description="A developer-focused log viewer with line numbers, timestamps, ANSI color rendering, search/filter, collapsible groups, copy, and auto-scroll."
      />

      <ComponentPreview>
        <div className="w-full">
          <LogViewer lines={demoLines} height={260} />
        </div>
      </ComponentPreview>

      <Section title="Installation">
        <Snippet language="bash" code={"npm install @pipecraft/ui"} />
      </Section>

      <Section title="Usage">
        <Snippet
          code={`import { LogViewer, type LogLine } from "@pipecraft/ui";

const lines: LogLine[] = [
  { id: "1", content: "Starting build...", timestamp: "00:00.00" },
  { id: "2", content: "Build failed", level: "error", timestamp: "00:04.21" },
];

<LogViewer lines={lines} />`}
        />
      </Section>

      <Section title="API">
        <ApiTable
          rows={[
            { name: "lines", type: "LogLine[]", description: "Lines to render, in order." },
            { name: "autoScroll", type: "boolean", default: "true", description: "Sticks to the newest line as lines grow; releases when the user scrolls up." },
            { name: "showLineNumbers", type: "boolean", default: "true", description: "Toggle the line-number gutter." },
            { name: "showTimestamps", type: "boolean", default: "true", description: "Toggle per-line timestamps." },
            { name: "height", type: "number | string", default: "420", description: "Scroll container height." },
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-fg-secondary">
          The search field and level filters are standard labeled controls. Error/warning lines get a background tint in
          addition to their icon-free color, and the underlying text is always copyable via the Copy action, which strips
          ANSI codes first.
        </p>
      </Section>
    </div>
  );
}
