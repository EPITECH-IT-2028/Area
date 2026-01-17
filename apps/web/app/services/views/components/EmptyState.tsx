import { Plug } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 py-12 text-center text-muted-foreground md:py-16">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Plug className="h-8 w-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">
        No services available
      </h3>
      <p className="max-w-sm text-balance">
        Check back later for available services to connect.
      </p>
    </div>
  );
}
