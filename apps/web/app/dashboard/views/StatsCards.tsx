interface StatsCardsProps {
  totalAreas: number;
  activeAreas: number;
  executionsToday: number;
  connectedServicesCount: number;
}

export function StatsCards({
  totalAreas,
  activeAreas,
  executionsToday,
  connectedServicesCount,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-8">
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total AREAs</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalAreas}</div>
          <p className="text-xs text-muted-foreground">{activeAreas} active</p>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Executions Today</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">{executionsToday}</div>
          <p className="text-xs text-muted-foreground">Total runs</p>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Connected Services</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">{connectedServicesCount}</div>
          <p className="text-xs text-muted-foreground">Services linked</p>
        </div>
      </div>
    </div>
  );
}
