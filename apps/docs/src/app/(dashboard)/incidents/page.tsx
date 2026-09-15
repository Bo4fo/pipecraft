import { IncidentBanner } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { incidents } from "@/lib/mock-data";

export default function IncidentsPage() {
  const active = incidents.filter((i) => !i.resolved);
  const resolved = incidents.filter((i) => i.resolved);

  return (
    <div>
      <PageHeader title="Incidents" description="Active and historical incidents affecting your services." />

      <div className="space-y-3">
        {active.map((incident) => (
          <IncidentBanner key={incident.id} {...incident} />
        ))}
      </div>

      {resolved.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-semibold text-fg-primary">Resolved</h2>
          <div className="space-y-3">
            {resolved.map((incident) => (
              <IncidentBanner key={incident.id} {...incident} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
