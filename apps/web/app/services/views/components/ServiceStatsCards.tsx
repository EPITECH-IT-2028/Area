import { cn } from "@/lib/utils";
import { CheckCircle2, Globe } from "lucide-react";

export interface ServiceStatsCardsProps {
  totalServices: number;
  connectedServices: number;
  isLoading: boolean;
}

export function ServiceStatsCards({
  totalServices,
  connectedServices,
  isLoading,
}: ServiceStatsCardsProps) {
  const stats = [
    {
      label: "Total Services",
      value: totalServices,
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      ring: "ring-blue-500/20",
    },
    {
      label: "Connected",
      value: connectedServices,
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-500/10",
      ring: "ring-green-500/20",
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2">
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
                stat.ring
              )}
            >
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold md:text-3xl">
                {isLoading ? (
                  <span className="inline-block h-8 w-12 animate-pulse rounded bg-muted" />
                ) : (
                  stat.value
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
