import Image from "next/image";

import { Service } from "@/app/dashboard/models/aboutResponse";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

interface ServiceGridProps {
  services: Service[];
  onSelect: (service: Service) => void;
  selectedService?: Service | null;
}

export function ServiceGrid({
  services,
  onSelect,
  selectedService,
}: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {services.map((service) => (
        <Card
          key={service.name}
          className={cn(
            "cursor-pointer transition-all hover:border-primary/50 hover:bg-accent",
            selectedService?.name === service.name &&
              "border-primary bg-accent ring-1 ring-primary",
          )}
          onClick={() => onSelect(service)}
        >
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-background p-2 shadow-sm">
              <Image
                src={service.icon_url || "/globe.svg"}
                alt={service.display_name}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="text-sm font-medium">{service.display_name}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
