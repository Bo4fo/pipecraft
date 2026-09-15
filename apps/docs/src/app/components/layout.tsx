import { DocsSidebar } from "@/components/docs/docs-sidebar";

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <DocsSidebar />
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">{children}</div>
      </main>
    </div>
  );
}
