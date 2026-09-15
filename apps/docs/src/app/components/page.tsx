import Link from "next/link";
import { Badge } from "@pipecraft/ui";
import { componentCategories, componentRegistry } from "@/lib/component-registry";

export default function ComponentsIndexPage() {
  const documentedCount = componentRegistry.filter((c) => c.documented).length;

  return (
    <div>
      <h1 className="text-2xl font-semibold text-fg-primary">Components</h1>
      <p className="mt-1.5 text-sm text-fg-tertiary">
        {componentRegistry.length} components ship in <code className="font-mono">@pipecraft/ui</code>.{" "}
        {documentedCount} have full documentation pages so far — the rest are implemented and exported, and can be
        explored directly in the dashboard pages or the package source.
      </p>

      {componentCategories.map((category) => (
        <div key={category} className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-fg-primary">{category}</h2>
          <div className="flex flex-wrap gap-2">
            {componentRegistry
              .filter((c) => c.category === category)
              .map((c) =>
                c.documented ? (
                  <Link key={c.slug} href={`/components/${c.slug}`}>
                    <Badge variant="accent" className="cursor-pointer">
                      {c.name}
                    </Badge>
                  </Link>
                ) : (
                  <Badge key={c.slug} variant="neutral">
                    {c.name}
                  </Badge>
                ),
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
