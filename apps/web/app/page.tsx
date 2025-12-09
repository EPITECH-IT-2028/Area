"use client";

import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export default function Home() {
  const { logout } = useAuth();

  const logoutAction = () => {
    logout();
    toast.error("Logged out");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col justify-center space-y-4">
        <h1 className="text-4xl select-none">AREA</h1>
        <Button variant="destructive" onClick={logoutAction}>
          Logout
        </Button>
      </div>
    </main>
  );
}
