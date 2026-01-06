"use client";

import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { logout, user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">

        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold">AREA Dashboard</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    logout();
                    toast.success("Logged out");
                  }}
                  variant="destructive"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, {user?.name || "User"} !
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's an overview of your automations
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Total AREAs</h3>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Active automations
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Executions Today</h3>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Successful runs
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium">Connected Services</h3>
              </div>
              <div>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Services linked
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold leading-none tracking-tight">
                Recent Activity
              </h3>
              <p className="text-sm text-muted-foreground">
                Your latest automation executions will appear here
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No activity yet. Create your first AREA to get started!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
