"use client";

import * as React from "react";
import { Button, Card, CardContent } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { integrations as initialIntegrations } from "@/lib/mock-data";

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = React.useState(initialIntegrations);

  const toggle = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, connected: !i.connected, detail: i.connected ? "Not connected" : i.detail }
          : i,
      ),
    );
  };

  return (
    <div>
      <PageHeader title="Integrations" description="Connect the tools your pipelines depend on." />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardContent className="flex flex-col gap-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-status-accent-bg text-sm font-semibold text-status-accent">
                  {integration.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-fg-primary">{integration.name}</p>
                  <p className="text-xs text-fg-tertiary">{integration.category}</p>
                </div>
              </div>
              <p className="flex-1 text-xs text-fg-secondary">{integration.detail}</p>
              <Button
                variant={integration.connected ? "outline" : "secondary"}
                size="sm"
                onClick={() => toggle(integration.id)}
              >
                {integration.connected ? "Disconnect" : "Connect"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
