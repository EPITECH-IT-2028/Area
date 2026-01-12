import { Area } from "@/app/dashboard/models/Dasboard";

interface AreaCardProps {
  area: Area;
  getStatusColor: (status: string) => string;
}

export function AreaCard({ area, getStatusColor }: AreaCardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-lg font-semibold">{area.name}</h3>
        <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
          Active
        </span>
      </div>
      {area.description && (
        <p className="text-sm text-muted-foreground mb-3">
          {area.description}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2 text-sm p-3 bg-secondary/30 rounded mb-3">
        <span className="font-semibold">If the service</span>
        <span className="px-2 py-1 bg-blue-500/20 rounded">
          {area.action.service.name}
        </span>
        <span className="font-semibold">has action</span>
        <span className="text-muted-foreground">"{area.action.event_type}"</span>
        <span className="font-semibold">then the service</span>
        <span className="px-2 py-1 bg-purple-500/20 rounded">
          {area.reaction.service.name}
        </span>
        <span className="font-semibold">has action</span>
        <span className="text-muted-foreground">
          {area.reaction.action_type}
        </span>
      </div>
      <div className="border-t pt-3">
        <p className="text-sm font-medium mb-2">
          Recent executions ({area.hook_logs?.length || 0})
        </p>
        {area.hook_logs && area.hook_logs.length > 0 ? (
          <div className="space-y-2">
            {area.hook_logs.slice(0, 3).map((log) => (
              <div
                key={log.id}
                className="flex items-center gap-2 p-2 bg-secondary/50 rounded text-sm"
              >
                <div
                  className={`w-2 h-2 rounded-full ${getStatusColor(
                    log.status
                  )}`}
                />
                <span className="capitalize">{log.status}</span>
                {log.execution_time_ms && (
                  <span className="text-muted-foreground">
                    {log.execution_time_ms}ms
                  </span>
                )}
                {log.error_message && (
                  <span className="text-red-500 text-xs truncate">
                    {log.error_message}
                  </span>
                )}
                <span className="ml-auto text-xs text-muted-foreground">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">
              No executions yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
