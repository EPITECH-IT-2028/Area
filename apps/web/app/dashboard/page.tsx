"use client";

import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

import ProtectedRoute from "@/components/ProtectedRoute";

import { Button } from "@/components/ui/button";

export default function Page() {
  const { logout, user } = useAuth();

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col items-center justify-center gap-6">
        <div className="mb-8 flex flex-col items-center space-y-2">
          <h1 className="translate-x-4 text-4xl font-bold select-none">
            Hello, {user?.name || "User"} ! 👋
          </h1>
          <div className="text-muted-foreground">{user?.email}</div>
        </div>

        <Button
          onClick={() => {
            logout();
            toast.error("Logged out");
          }}
          variant="destructive"
        >
          Logout
        </Button>
      </main>
    </ProtectedRoute>
  );
}
