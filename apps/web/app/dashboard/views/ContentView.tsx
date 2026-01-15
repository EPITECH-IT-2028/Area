"use client";

import { useDashboardViewModel } from "@/app/dashboard/viewModels/dashboardViewModel";
import { AreaCard } from "@/app/dashboard/views/components/AreaCard";
import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { StatsCards } from "@/app/dashboard/views/components/StatsCards";
import { useAuth } from "@/context/AuthContext";

export default function ContentView() {
  const { user } = useAuth();
  const { areas, isLoading, stats, getStatusColor } = useDashboardViewModel();

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto my-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold">
            Welcome back, {user?.name || "User"} !
          </h1>
          <p className="text-lg text-muted-foreground">
            Here&apos;s an overview of your automations
          </p>
        </div>
        <StatsCards
          totalAreas={stats.totalAreas}
          connectedServicesCount={stats.connectedServicesCount}
        />
        <div className="mb-8 space-y-4">
          <h2 className="text-2xl font-semibold">Your AREAs</h2>
          {isLoading ? (
            <div className="rounded-xl border bg-card py-8 text-center text-foreground/50">
              Loading AREAs...
            </div>
          ) : (
            areas.map((area) => (
              <AreaCard
                key={area.id}
                area={area}
                getStatusColor={getStatusColor}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
