import { Area } from "@/app/dashboard/models/areasResponse";

interface AreaCardProps {
  area: Area;
  getStatusColor: (status: string) => string;
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-lg font-semibold">{area.name}</h3>
        <span className="px-2 py-1 text-xs rounded bg-green-500 text-white">
          Active
        </span>
      </div>
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
    </div>
  );
}
