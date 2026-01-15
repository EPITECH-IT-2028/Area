import useDashboard from "@/app/dashboard/hooks/useDashboard";

export interface StatsCardsProps {
  totalAreas: number;
  connectedServicesCount: number;
}

export function StatsCards({
  totalAreas,
  connectedServicesCount,
}: StatsCardsProps) {
  const { isLoading } = useDashboard();

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2">
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total AREAs</h3>
        </div>
        <div>
          {isLoading ? (
            <div className="text-2xl font-bold text-foreground/50">
              Loading...
            </div>
          ) : (
            <div className="text-2xl font-bold">{totalAreas}</div>
          )}
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Connected Services</h3>
        </div>
        <div>
          {isLoading ? (
            <div className="text-2xl font-bold text-foreground/50">
              Loading...
            </div>
          ) : (
            <div className="text-2xl font-bold">{connectedServicesCount}</div>
          )}
        </div>
      </div>
    </div>
  );
}
