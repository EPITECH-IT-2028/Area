export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primary-foreground">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="animate-pulse text-muted-foreground">Loading...</p>
    </div>
  );
}
