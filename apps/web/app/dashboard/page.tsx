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
      </div>
    </ProtectedRoute>
  );
}
