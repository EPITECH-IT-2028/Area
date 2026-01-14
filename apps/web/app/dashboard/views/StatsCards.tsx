import { StatsCardsProps } from "../models/statsCardsProps";

export function StatsCards({
  totalAreas,
  connectedServicesCount,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 mb-8">
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Total AREAs</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">{totalAreas}</div>
        </div>
      </div>
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium">Connected Services</h3>
        </div>
        <div>
          <div className="text-2xl font-bold">{connectedServicesCount}</div>
        </div>
      </div>
    </div>
  );
}
