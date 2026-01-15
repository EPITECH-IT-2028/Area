interface RecentActivityProps {
  statusColor: (status: string) => string;
  hasAreas: boolean;
}

export function RecentActivity({ hasAreas }: RecentActivityProps) {
  if (hasAreas) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="leading-none font-semibold tracking-tight">
          Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          Latest automation executions
        </p>
      </div>
      <div className="p-6 pt-0">
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No activity yet. Create your first AREA to get started!
          </p>
        </div>
      </div>
    </div>
  );
}
