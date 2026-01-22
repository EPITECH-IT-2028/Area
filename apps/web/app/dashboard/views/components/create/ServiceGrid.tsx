import Image from "next/image";

import { Service } from "@/app/dashboard/models/aboutResponse";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ServiceGridProps {
  services: Service[];
  onSelect: (service: Service) => void;
  selectedService?: Service | null;
  isServiceConnected?: (service: Service) => boolean;
}

export function ServiceGrid({
  services,
  onSelect,
  selectedService,
  isServiceConnected,
}: ServiceGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {services.map((service) => {
        const connected = isServiceConnected
          ? isServiceConnected(service)
          : true;

        return (
          <Card
            key={service.name}
            className={cn(
              "relative cursor-pointer transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
              selectedService?.name === service.name &&
                "border-primary bg-accent ring-1 ring-primary",
              !connected
                ? "cursor-not-allowed opacity-70 grayscale-[0.5] select-none"
                : "hover:border-primary/50 hover:bg-accent",
            )}
            onClick={() => {
              if (!connected) return;
              onSelect(service);
            }}
            onKeyDown={(e) => {
              if (!connected) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(service);
              }
            }}
            role="button"
            tabIndex={connected ? 0 : -1}
            aria-disabled={!connected}
            aria-pressed={selectedService?.name === service.name}
          >
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              {!connected && (
                <div className="absolute top-2 right-2">
                  <div className="m-1 flex items-center gap-1 rounded-full text-[10px] font-semibold text-primary">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
              )}
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-background p-2 shadow-sm">
                <Image
                  src={service.icon_url || "/globe.svg"}
                  alt={service.display_name}
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-sm font-medium">
                {service.display_name}
              </span>
              {!connected && (
                <span className="mt-1 text-[10px] font-semibold text-destructive">
                  Not Connected
                </span>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
