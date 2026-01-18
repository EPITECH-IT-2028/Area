"use client";

import { useDashboardViewModel } from "@/app/dashboard/viewModels/dashboardViewModel";
import CreateAreaView from "@/app/dashboard/views/CreateAreaView";
import { AreaCard } from "@/app/dashboard/views/components/AreaCard";
import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { StatsCards } from "@/app/dashboard/views/components/StatsCards";
import { useAuth } from "@/context/AuthContext";
import { Plus, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ContentView() {
  const { user } = useAuth();
  const {
    areas,
    isLoading,
    stats,
    getStatusColor,
    isCreateModalOpen,
    setIsCreateModalOpen,
    refetch,
    deleteArea,
    updateArea,
  } = useDashboardViewModel();

  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto my-4 px-4 md:my-8 md:px-0">
        <div className="mb-6 md:mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-4xl">
            Welcome back, {user?.name || "User"} !
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Here&apos;s an overview of your automations
          </p>
        </div>
        <StatsCards
          totalAreas={stats.totalAreas}
          connectedServicesCount={stats.connectedServicesCount}
          isLoading={isLoading}
        />
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between md:mb-6">
            <h2 className="text-xl font-semibold md:text-2xl">Your AREAs</h2>
            {!isLoading && areas.length > 0 && (
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create Automation</span>
                <span className="sm:hidden">Create</span>
              </Button>
            )}
          </div>
          {isLoading ? (
            <div className="rounded-2xl border border-dashed bg-card/50 py-8 text-center text-muted-foreground md:py-12">
              <div className="mb-4 inline-flex animate-spin items-center justify-center rounded-full">
                <div className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent" />
              </div>
              <p>Loading your automations...</p>
            </div>
          ) : areas.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-12 text-center text-muted-foreground md:py-16">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Workflow className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                No automations yet
              </h3>
              <p className="mb-6 max-w-sm text-balance">
                Create your first automation to start connecting your favorite
                services.
              </p>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Automation
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {areas.map((area) => (
                <AreaCard
                  key={area.id}
                  area={area}
                  getStatusColor={getStatusColor}
                  onDelete={deleteArea}
                  onUpdate={updateArea}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {isCreateModalOpen && (
        <CreateAreaView
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAreaCreated={refetch}
        />
      )}
    </div>
  );
}
