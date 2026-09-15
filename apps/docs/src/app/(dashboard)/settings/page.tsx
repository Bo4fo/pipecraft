import { Alert, Button, Card, CardContent, CardHeader, CardTitle, Input, ReleaseCard } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { releases } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Workspace preferences and release history." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="info" title="This is a demo dashboard">
              Settings here are illustrative only — PipeCraft is a component library, not a hosted product.
            </Alert>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-fg-secondary" htmlFor="workspace-name">
                Workspace name
              </label>
              <Input id="workspace-name" defaultValue="PipeCraft Demo" />
            </div>
            <Button variant="secondary">Save changes</Button>
          </CardContent>
        </Card>

        <div>
          <h2 className="mb-3 text-sm font-semibold text-fg-primary">Releases</h2>
          <div className="space-y-3">
            {releases.map((release) => (
              <ReleaseCard key={release.version} {...release} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
