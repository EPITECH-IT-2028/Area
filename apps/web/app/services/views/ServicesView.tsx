"use client";

import { useMemo } from "react";
import Image from "next/image";
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
          <img src={service.icon_url} alt={`${service.display_name} icon`} width={32} height={32} className="object-contain"/>
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
            {/* <Image src={"data:image/png;base64,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"} alt={`Discord icon`} width={32} height={32} className="object-contain"/>
            <Image src={"https://discord.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg"} alt={`Discord icon`} width={32} height={32} className="object-contain"/> */}
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
