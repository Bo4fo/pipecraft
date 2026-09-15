import { ArtifactCard, Card, CardContent, CardHeader, CardTitle, JobQueue, RunnerStatus } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { artifacts, queuedJobs, runners } from "@/lib/mock-data";

export default function MonitoringPage() {
  return (
    <div>
      <PageHeader title="Monitoring" description="Runner fleet, job queue, and build artifacts." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Runners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {runners.map((runner) => (
              <div key={runner.id} className="flex items-center justify-between rounded-md border border-border-subtle px-3 py-2">
                <div>
                  <p className="font-mono text-sm text-fg-primary">{runner.name}</p>
                  <p className="text-xs text-fg-tertiary">{runner.os}{runner.currentJob && ` · ${runner.currentJob}`}</p>
                </div>
                <RunnerStatus status={runner.status} size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job queue</CardTitle>
          </CardHeader>
          <CardContent>
            <JobQueue jobs={queuedJobs} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-fg-primary">Recent artifacts</h2>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {artifacts.map((artifact) => (
            <ArtifactCard key={artifact.id} {...artifact} />
          ))}
        </div>
      </div>
    </div>
  );
}
