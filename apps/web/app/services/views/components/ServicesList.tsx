"use client";

import ServiceCard from "@/app/services/views/ServiceCard";
import { ServiceRequest } from "@/app/services/models/serviceRequest";

interface ServicesListProps {
  services: ServiceRequest[];
  connectedServices: Set<string>;
}

export function ServicesList({ services, connectedServices }: ServicesListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard 
          key={service.id} 
          service={service} 
          isConnected={connectedServices.has(service.name)}
        />
      ))}
    </div>
  );
}
