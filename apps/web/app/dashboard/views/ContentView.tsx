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
        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-semibold">Your AREAs</h2>
          {isLoading ? (
            <div className="rounded-2xl border border-dashed bg-card/50 py-12 text-center text-muted-foreground">
              <div className="mb-4 inline-flex animate-spin items-center justify-center rounded-full">
                <div className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent" />
              </div>
              <p>Loading your automations...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {areas.map((area) => (
                <AreaCard
                  key={area.id}
                  area={area}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
