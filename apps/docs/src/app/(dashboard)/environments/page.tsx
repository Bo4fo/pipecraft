import { EnvironmentCard } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { environmentRecords } from "@/lib/mock-data";

export default function EnvironmentsPage() {
  return (
    <div>
      <PageHeader title="Environments" description="Live status for every deployment target." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {environmentRecords.map((env) => (
          <EnvironmentCard key={env.id} {...env} />
        ))}
      </div>
    </div>
  );
}
