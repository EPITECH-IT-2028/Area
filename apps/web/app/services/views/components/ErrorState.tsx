interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="rounded-2xl border border-destructive/50 bg-destructive/10 py-8 text-center text-destructive md:py-12">
      <p>{error}</p>
    </div>
  );
}
