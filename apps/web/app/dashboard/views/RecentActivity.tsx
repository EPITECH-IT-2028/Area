import { HookLog } from "@/app/dashboard/models/Dasboard";

interface RecentActivityProps {
  allLogs: (HookLog & { areaName: string })[];
  getStatusColor: (status: string) => string;
}

export function RecentActivity({
  allLogs,
  getStatusColor,
}: RecentActivityProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight">
          Recent Activity
        </h3>
        <p className="text-sm text-muted-foreground">
          Latest automation executions
        </p>
      </div>
      <div className="p-6 pt-0">
        {allLogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No activity yet. Create your first AREA to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {allLogs.slice(0, 10).map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-3 p-3 bg-secondary/50 rounded text-sm"
              >
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    log.status
                  )}`}
                />
                <span className="font-medium">{log.areaName}</span>
                <span>•</span>
                <span className="capitalize">{log.status}</span>
                {log.execution_time_ms && (
                  <span className="text-muted-foreground">
                    ({log.execution_time_ms}ms)
                  </span>
                )}
                {log.error_message && (
                  <span className="text-red-500 text-xs truncate max-w-md">
                    {log.error_message}
                  </span>
                )}
                <span className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
