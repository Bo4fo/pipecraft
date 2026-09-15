import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <div className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
