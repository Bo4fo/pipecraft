import { Sidebar } from "@/components/sidebar";
import { DashboardShell } from "@/components/dashboard-shell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
