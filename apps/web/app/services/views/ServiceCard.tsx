"use client";

import { useRouter } from "next/navigation";
import { ServiceRequest } from "@/app/services/models/serviceRequest";

interface ServiceCardProps {
  service: ServiceRequest;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/services/${service.name}/actions`);
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border bg-card p-6 shadow-sm transition-all hover:scale-105 hover:shadow-lg"
    >
      <div className="flex flex-col items-center space-y-4">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${service.color} text-white transition-transform group-hover:scale-110`}
        >
          {service.icon}
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold">{service.displayName}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}
