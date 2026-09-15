import { Button } from "@pipecraft/ui";
import { ApiTable, ComponentDocHeader, ComponentPreview, Section, Snippet } from "@/components/docs/doc-sections";

export default function ButtonDocPage() {
  return (
    <div>
      <ComponentDocHeader name="Button" description="A pressable action, with variants tuned for primary flows, secondary actions, and destructive operations." />

      <ComponentPreview>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Deploy</Button>
          <Button variant="secondary">Cancel</Button>
          <Button variant="outline">View logs</Button>
          <Button variant="ghost">Skip</Button>
          <Button variant="danger">Roll back</Button>
          <Button variant="primary" loading>
            Deploying
          </Button>
        </div>
      </ComponentPreview>

      <Section title="Installation">
        <Snippet language="bash" code={"npm install @pipecraft/ui"} />
      </Section>

      <Section title="Usage">
        <Snippet
          code={`import { Button } from "@pipecraft/ui";

export function DeployAction() {
  return <Button variant="primary">Deploy</Button>;
}`}
        />
      </Section>

      <Section title="Variants">
        <p className="mb-3 text-sm text-fg-secondary">
          <code className="font-mono text-xs">primary</code>, <code className="font-mono text-xs">secondary</code>,{" "}
          <code className="font-mono text-xs">outline</code>, <code className="font-mono text-xs">ghost</code>,{" "}
          <code className="font-mono text-xs">danger</code>, and <code className="font-mono text-xs">link</code>. Sizes:{" "}
          <code className="font-mono text-xs">sm</code>, <code className="font-mono text-xs">md</code>,{" "}
          <code className="font-mono text-xs">lg</code>.
        </p>
      </Section>

      <Section title="API">
        <ApiTable
          rows={[
            { name: "variant", type: '"primary" | "secondary" | "outline" | "ghost" | "danger" | "link"', default: '"primary"', description: "Visual style." },
            { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Button height and padding." },
            { name: "asChild", type: "boolean", default: "false", description: "Merge props onto the immediate child instead of rendering a <button>." },
            { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and disables the button." },
          ]}
        />
      </Section>

      <Section title="Accessibility">
        <p className="text-sm text-fg-secondary">
          Renders a native <code className="font-mono text-xs">&lt;button&gt;</code> by default, so it's reachable via Tab and
          activatable with Space/Enter out of the box. <code className="font-mono text-xs">loading</code> sets{" "}
          <code className="font-mono text-xs">aria-busy</code> and disables the control so it can't be double-submitted.
        </p>
      </Section>
    </div>
  );
}
