"use client";

import { useDashboardViewModel } from "@/app/dashboard/viewModels/dashboardViewModel";
import { AreaCard } from "@/app/dashboard/views/AreaCard";
import { DashboardHeader } from "@/app/dashboard/views/DashboardHeader";
import { RecentActivity } from "@/app/dashboard/views/RecentActivity";
import { StatsCards } from "@/app/dashboard/views/StatsCards";
import { useAuth } from "@/context/AuthContext";

import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardContent() {
  const { user } = useAuth();
  const { areas, loading, stats, getStatusColor } = useDashboardViewModel();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold">
              Welcome back, {user?.name || "User"} !
            </h1>
            <p className="text-lg text-muted-foreground">
              Here&apos;s an overview of your automations
            </p>
          </div>
          {loading ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <>
              <StatsCards
                totalAreas={stats.totalAreas}
                activeAreas={stats.activeAreas}
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
              <RecentActivity
                getStatusColor={getStatusColor}
                hasAreas={areas.length > 0}
              />
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
