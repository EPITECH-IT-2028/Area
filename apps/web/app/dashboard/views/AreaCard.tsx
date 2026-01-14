import { Area } from "@/app/dashboard/models/areasResponse";

interface AreaCardProps {
  area: Area;
  getStatusColor: (status: string) => string;
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
      <div className="mb-3 flex items-center gap-3">
        <h3 className="text-lg font-semibold">{area.name}</h3>
        <span className="rounded bg-green-500 px-2 py-1 text-xs text-white">
          Active
        </span>
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2 rounded bg-secondary/30 p-3 text-sm">
        <span className="font-semibold">If the service</span>
        <span className="rounded bg-blue-500/20 px-2 py-1">
          {area.action.service.name}
        </span>
        <span className="font-semibold">has action</span>
        <span className="text-muted-foreground">
          &quot;{area.action.event_type}&quot;
        </span>
        <span className="font-semibold">then the service</span>
        <span className="rounded bg-purple-500/20 px-2 py-1">
          {area.reaction.service.name}
        </span>
        <span className="font-semibold">has action</span>
        <span className="text-muted-foreground">
          {area.reaction.action_type}
        </span>
      </div>
    </div>
  );
}
