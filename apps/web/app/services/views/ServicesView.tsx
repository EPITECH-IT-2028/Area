"use client";

import { useMemo } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import useServices from "@/app/services/hooks/useServices";
import useUserServices from "@/app/services/hooks/useUserServices";
import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { ServicesHeader } from "@/app/services/views/components/ServicesHeader";
import { ServicesList } from "@/app/services/views/components/ServicesList";
import { LoadingState } from "@/app/services/views/components/LoadingState";
import { ErrorState } from "@/app/services/views/components/ErrorState";
import { EmptyState } from "@/app/services/views/components/EmptyState";

const colorMap: Record<string, string> = {
  google: "bg-red-500",
  github: "bg-gray-800",
  discord_webhook: "bg-indigo-500",
};

function ServicesView() {
  const { services, isLoading, error } = useServices();
  const { connectedServices } = useUserServices();

  const servicesData = useMemo(() => {
    return services.map((service) => ({
      id: service.name,
      name: service.name,
      displayName: service.display_name,
      color: colorMap[service.name] || "bg-gray-500",
      icon: service.icon_url ? (
        <img src={service.icon_url} alt={`${service.display_name} icon`} width={32} height={32} className="object-contain"/>
      ) : (<span className="text-2xl font-bold">{service.display_name.charAt(0).toUpperCase()}</span>),
    }));
  }, [services]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <DashboardHeader />
        <main className="container mx-auto my-4 px-4 md:my-8 md:px-0">
          <ServicesHeader />

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
              Available Services
            </h2>
            {isLoading ? (
              <LoadingState />
            ) : error ? (
              <ErrorState error={error} />
            ) : servicesData.length === 0 ? (
              <EmptyState />
            ) : (
              <ServicesList 
                services={servicesData} 
                connectedServices={connectedServices} 
              />
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default ServicesView;
