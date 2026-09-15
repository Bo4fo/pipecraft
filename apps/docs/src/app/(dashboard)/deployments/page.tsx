import { DeploymentCard, DeploymentTimeline } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { deploymentTimelineEvents, deployments } from "@/lib/mock-data";

export default function DeploymentsPage() {
  return (
    <div>
      <PageHeader title="Deployments" description="Deployment activity across production, staging, and preview environments." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-fg-primary">All deployments</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {deployments.map((d) => (
              <DeploymentCard key={d.id} {...d} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-fg-primary">Timeline</h2>
          <div className="rounded-lg border border-border-default bg-surface p-4">
            <DeploymentTimeline events={deploymentTimelineEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
