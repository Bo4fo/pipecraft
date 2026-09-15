import { CodeBlock } from "@pipecraft/ui";

export function ComponentPreview({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[8rem] items-center justify-center rounded-lg border border-border-default bg-surface p-8">
      {children}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-semibold text-fg-primary">{title}</h2>
      {children}
    </section>
  );
}

export function Snippet({ code, language = "tsx" }: { code: string; language?: string }) {
  return <CodeBlock code={code} language={language} />;
}

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function ApiTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border-default">
      <table className="w-full text-left text-sm">
        <thead className="bg-subtle text-xs text-fg-tertiary">
          <tr>
            <th className="px-3 py-2 font-medium">Prop</th>
            <th className="px-3 py-2 font-medium">Type</th>
            <th className="px-3 py-2 font-medium">Default</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="px-3 py-2 font-mono text-xs text-fg-primary">{row.name}</td>
              <td className="px-3 py-2 font-mono text-xs text-fg-accent">{row.type}</td>
              <td className="px-3 py-2 font-mono text-xs text-fg-tertiary">{row.default ?? "—"}</td>
              <td className="px-3 py-2 text-xs text-fg-secondary">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ComponentDocHeader({ name, description }: { name: string; description: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-fg-primary">{name}</h1>
      <p className="mt-1.5 text-sm text-fg-tertiary">{description}</p>
    </div>
  );
}
