"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plug } from "lucide-react";
import ServiceCard from "@/app/services/views/ServiceCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import useServices from "@/app/services/hooks/useServices";
import useUserServices from "@/app/services/hooks/useUserServices";
import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { Button } from "@/components/ui/button";

const colorMap: Record<string, string> = {
  google: "bg-red-500",
  github: "bg-gray-800",
  discord_webhook: "bg-indigo-500",
};

function ServicesView() {
  const router = useRouter();
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
          <div className="mb-6 md:mb-8">
            <Button
              onClick={() => router.push('/dashboard')}
              variant="ghost"
              className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="mb-2 text-2xl font-bold md:text-4xl">
              Connect Services
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              Connect your favorite services to create powerful automations
            </p>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
              Available Services
            </h2>
            {isLoading ? (
              <div className="rounded-2xl border border-dashed bg-card/50 py-8 text-center text-muted-foreground md:py-12">
                <div className="mb-4 inline-flex animate-spin items-center justify-center rounded-full">
                  <div className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent" />
                </div>
                <p>Loading services...</p>
              </div>
            ) : error ? (
              <div className="rounded-2xl border border-destructive/50 bg-destructive/10 py-8 text-center text-destructive md:py-12">
                <p>{error}</p>
              </div>
            ) : servicesData.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-12 text-center text-muted-foreground md:py-16">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Plug className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  No services available
                </h3>
                <p className="max-w-sm text-balance">
                  Check back later for available services to connect.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {servicesData.map((service) => (
                  <ServiceCard 
                    key={service.id} 
                    service={service} 
                    isConnected={connectedServices.has(service.name)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default ServicesView;
