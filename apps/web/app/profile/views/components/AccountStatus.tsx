import { Shield } from "lucide-react";

export function AccountStatus() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">Account Status</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-green-500/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Account Status
              </p>
              <p className="text-base font-semibold text-green-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
