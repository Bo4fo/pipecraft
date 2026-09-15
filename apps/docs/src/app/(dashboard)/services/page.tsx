import { ServiceCard } from "@pipecraft/ui";
import { PageHeader } from "@/components/page-header";
import { services } from "@/lib/mock-data";

export default function ServicesPage() {
  return (
    <div>
      <PageHeader title="Services" description="Health and uptime for internal and public-facing services." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}
