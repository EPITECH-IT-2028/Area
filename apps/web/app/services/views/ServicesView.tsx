"use client";

import { useMemo } from "react";
import ServiceCard from "@/app/services/views/ServiceCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import useServices from "@/app/services/hooks/useServices";
import { ServiceRequest } from "@/app/services/models/serviceRequest";

const colorMap: Record<string, string> = {
  google: "bg-red-500",
  github: "bg-gray-800",
  discord_webhook: "bg-indigo-500",
};

export default function ServicesView() {
  const { services, isLoading, error } = useServices();

  const servicesData = useMemo(() => {
    return services.map((service) => {
      
      return {
        id: service.name,
        name: service.name,
        displayName: service.display_name,
        color: colorMap[service.name] || "bg-gray-500",
        icon: service.icon_url ? (
          <img src={service.icon_url} alt={`${service.display_name} icon`} className="h-8 w-8 object-contain"/>
        ) : (<span className="text-2xl font-bold">{service.display_name.charAt(0).toUpperCase()}</span>),
      };
    }) as ServiceRequest[];
  }, [services]);

  return (
    <ProtectedRoute>
      <main className="container mx-auto min-h-screen px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">Choose a Service</h1>
            <p className="text-muted-foreground">
              Select a service to configure actions and reactions
            </p>
          </div>
          {isLoading && (
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
            </div>
          )}
          {error && (
            <div className="mx-auto max-w-5xl rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
              {error}
            </div>
          )}
          {!isLoading && servicesData.length === 0 && (
            <div className="text-center text-gray-500">No services available</div>
          )}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
