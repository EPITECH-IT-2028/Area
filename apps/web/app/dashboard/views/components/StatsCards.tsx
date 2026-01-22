import { cn } from "@/lib/utils";
import { Globe, Sparkles, Zap } from "lucide-react";

export interface StatsCardsProps {
  totalAreas: number;
  connectedServicesCount: number;
  isLoading: boolean;
}

export function StatsCards({
  totalAreas,
  connectedServicesCount,
  isLoading,
}: StatsCardsProps) {
  const stats = [
    {
      label: "Total AREAs",
      value: totalAreas,
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      ring: "ring-orange-500/20",
    },
    {
      label: "Connected Services",
      value: connectedServicesCount,
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      ring: "ring-blue-500/20",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group overflow-hidden rounded-2xl border bg-card p-4 shadow-sm transition-all hover:shadow-md md:p-6"
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset",
                stat.bg,
                stat.color,
                stat.ring,
              )}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              {isLoading ? (
                <div className="mt-1 h-8 w-16 animate-pulse rounded bg-muted" />
              ) : (
                <h4 className="mt-0.5 text-2xl font-bold tracking-tight">
                  {stat.value}
                </h4>
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="group hidden cursor-not-allowed items-center justify-between rounded-2xl border border-dashed border-border bg-muted/30 p-4 transition-all md:p-6 lg:flex">
        <div className="flex items-center gap-4 opacity-50">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground ring-1 ring-border">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">Create using AI</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
