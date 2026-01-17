"use client";

import { useServices } from "@/app/services/hooks/useServices";
import { ServiceCard } from "@/app/services/views/components/ServiceCard";
import { ServicesHeader } from "@/app/services/views/components/ServicesHeader";
import { ServiceStatsCards } from "@/app/services/views/components/ServiceStatsCards";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plug } from "lucide-react";
import Link from "next/link";

export default function ServicesView() {
  const {
    services,
    isLoading,
    isConnecting,
    isServiceConnected,
    getServiceDetails,
    connectService,
    disconnectService,
    stats,
  } = useServices();

  const servicesWithAuth = services.filter((s) => s.oauth_url);
  const servicesWithoutAuth = services.filter((s) => !s.oauth_url);

  return (
    <div className="min-h-screen">
      <ServicesHeader />
      <main className="container mx-auto my-4 px-4 md:my-8 md:px-0">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="mb-6 md:mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-4xl">
            Connect Your Services
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Link your favorite services to create powerful automations
          </p>
        </div>

        <ServiceStatsCards
          totalServices={stats.totalServices}
          connectedServices={stats.connectedServices}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className="rounded-2xl border border-dashed bg-card/50 py-8 text-center text-muted-foreground md:py-12">
            <div className="mb-4 inline-flex animate-spin items-center justify-center rounded-full">
              <div className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent" />
            </div>
            <p>Loading services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-12 text-center text-muted-foreground md:py-16">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Plug className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-foreground">
              No services available
            </h3>
            <p className="max-w-sm text-balance">
              No services are currently configured. Please contact your
              administrator.
            </p>
          </div>
        ) : (
          <>
            {servicesWithAuth.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
                  Services with Authentication
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {servicesWithAuth.map((service) => {
                    const connected = isServiceConnected(service);
                    const userService = getServiceDetails(service.name);
                    const connecting = isConnecting === service.name;

                    return (
                      <ServiceCard
                        key={service.name}
                        service={service}
                        isConnected={connected}
                        userService={userService}
                        isConnecting={connecting}
                        onConnect={() => connectService(service)}
                        onDisconnect={() => {
                          if (userService) {
                            void disconnectService(
                              userService.id,
                              service.display_name
                            );
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {servicesWithoutAuth.length > 0 && (
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-semibold md:mb-6 md:text-2xl">
                  Public Services
                </h2>
                <p className="mb-4 text-sm text-muted-foreground">
                  These services don't require authentication and are always available.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {servicesWithoutAuth.map((service) => {
                    const connected = isServiceConnected(service);
                    const userService = getServiceDetails(service.name);
                    const connecting = isConnecting === service.name;

                    return (
                      <ServiceCard
                        key={service.name}
                        service={service}
                        isConnected={connected}
                        userService={userService}
                        isConnecting={connecting}
                        onConnect={() => connectService(service)}
                        onDisconnect={() => {
                          if (userService) {
                            void disconnectService(
                              userService.id,
                              service.display_name
                            );
                          }
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
