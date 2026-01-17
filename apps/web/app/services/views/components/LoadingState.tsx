export function LoadingState() {
  return (
    <div className="rounded-2xl border border-dashed bg-card/50 py-8 text-center text-muted-foreground md:py-12">
      <div className="mb-4 inline-flex animate-spin items-center justify-center rounded-full">
        <div className="h-8 w-8 rounded-full border-3 border-primary border-t-transparent" />
      </div>
      <p>Loading services...</p>
    </div>
  );
}
