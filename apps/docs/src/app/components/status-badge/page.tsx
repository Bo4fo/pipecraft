import { StatusBadge } from "@pipecraft/ui";
import { STATUS_KINDS } from "@pipecraft/tokens";
import { ApiTable, ComponentDocHeader, ComponentPreview, Section, Snippet } from "@/components/docs/doc-sections";

export default function StatusBadgeDocPage() {
  return (
    <div>
      <ComponentDocHeader
        name="StatusBadge"
        description="Renders any of PipeCraft's 12 semantic statuses with a consistent icon, color, label, and animation — the single source every other status component (PipelineStatus, BuildStatus, ServiceStatus, ...) resolves through."
      />

      <ComponentPreview>
        <div className="flex flex-wrap gap-2">
          {STATUS_KINDS.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
      </ComponentPreview>

      <Section title="Installation">
        <Snippet language="bash" code={"npm install @pipecraft/ui"} />
      </Section>

      <Section title="Usage">
        <Snippet
          code={`import { StatusBadge } from "@pipecraft/ui";

<StatusBadge status="running" />
<StatusBadge status="failed" label="Build failed" />
<StatusBadge status="deploying" variant="dot" />`}
        />
      </Section>

      <Section title="Dot variant">
        <ComponentPreview>
          <div className="flex flex-wrap gap-4">
            <StatusBadge status="healthy" variant="dot" />
            <StatusBadge status="degraded" variant="dot" />
            <StatusBadge status="offline" variant="dot" />
          </div>
        </ComponentPreview>
      </Section>

      <Section title="API">
        <ApiTable
          rows={[
            { name: "status", type: "StatusKind", description: "One of the 12 statuses defined in @pipecraft/tokens." },
            { name: "label", type: "string", default: "resolved from status config", description: "Override the default label text." },
            { name: "hideIcon", type: "boolean", default: "false", description: "Hide the leading icon." },
            { name: "variant", type: '"badge" | "dot"', default: '"badge"', description: "Pill badge or a compact status dot." },
            { name: "size", type: '"sm" | "md"', default: '"md"', description: "Badge padding/text size." },
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-fg-secondary">
          Renders with <code className="font-mono text-xs">role=&quot;status&quot;</code> so assistive technology announces status
          changes. Color is never the only signal — every status also has a distinct icon and label.
        </p>
      </Section>
    </div>
  );
}
