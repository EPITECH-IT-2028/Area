"use client";

import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useDashboardViewModel } from "@/app/dashboard/viewModels/dashboardViewModel";
import { DashboardHeader } from "@/app/dashboard/views/DashboardHeader";
import { StatsCards } from "@/app/dashboard/views/StatsCards";
import { AreaCard } from "@/app/dashboard/views/AreaCard";
import { RecentActivity } from "@/app/dashboard/views/RecentActivity";

export default function DashboardContent() {
  const { user } = useAuth();
  const { areas, loading, stats, allLogs, getStatusColor } =
    useDashboardViewModel();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name || "User"} !
            </h1>
            <p className="text-muted-foreground text-lg">
              Here&apos;s an overview of your automations
            </p>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <>
              <StatsCards
                totalAreas={stats.totalAreas}
                activeAreas={stats.activeAreas}
                executionsToday={stats.executionsToday}
                connectedServicesCount={stats.connectedServicesCount}
              />
              {areas.length > 0 && (
                <div className="mb-8 space-y-4">
                  <h2 className="text-2xl font-semibold">Your AREAs</h2>
                  {areas.map((area) => (
                    <AreaCard
                      key={area.id}
                      area={area}
                      getStatusColor={getStatusColor}
                    />
                  ))}
                </div>
              )}
              {allLogs.length > 0 && (
                <RecentActivity
                  allLogs={allLogs}
                  getStatusColor={getStatusColor}
                />
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
