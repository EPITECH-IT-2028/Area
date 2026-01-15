import { Area } from "@/app/dashboard/models/areasResponse";
import { cn } from "@/lib/utils";
import { ArrowRight, Play, Zap } from "lucide-react";

interface AreaCardProps {
  area: Area;
  getStatusColor?: (status: string) => string;
}

export function AreaCard({ area }: AreaCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-5 text-card-foreground shadow-sm transition-all hover:border-primary/20 hover:shadow-md">
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />

      <div className="relative mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="leading-none font-semibold tracking-tight">
              {area.name}
            </h3>
            <p className="mt-1.5 text-xs font-medium text-muted-foreground">
              {area.action.service.name}{" "}
              <span className="mx-1 text-muted-foreground/50">→</span>{" "}
              {area.reaction.service.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase transition-colors",
              area.is_active
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-muted text-muted-foreground",
            )}
          >
            <div
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                area.is_active
                  ? "animate-pulse bg-emerald-500"
                  : "bg-muted-foreground/50",
              )}
            />
            {area.is_active ? "Active" : "Disabled"}
          </div>
          {/*<Button*/}
          {/*  variant="ghost"*/}
          {/*  size="icon"*/}
          {/*  className="h-8 w-8 rounded-full opacity-25 transition-opacity group-hover:opacity-100"*/}
          {/*>*/}
          {/*  <MoreHorizontal className="h-4 w-4" />*/}
          {/*</Button>*/}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/40 p-4">
        <div className="space-y-1.5">
          <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest text-blue-500 uppercase dark:text-blue-400">
            <Play className="h-3 w-3 fill-current" />
            Trigger
          </span>
          <div>
            <p className="line-clamp-1 text-sm font-semibold">
              {area.action.event_type}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {area.action.service.name}
            </p>
          </div>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </div>

        <div className="space-y-1.5 text-right">
          <span className="flex items-center justify-end gap-1 text-[10px] font-bold tracking-widest text-purple-500 uppercase dark:text-purple-400">
            Action
            <Zap className="h-3 w-3 fill-current" />
          </span>
          <div>
            <p className="line-clamp-1 text-sm font-semibold">
              {area.reaction.action_type}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {area.reaction.service.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
