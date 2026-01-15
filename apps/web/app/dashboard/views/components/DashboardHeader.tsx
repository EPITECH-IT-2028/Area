import { useAuth } from "@/context/AuthContext";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">AREA</h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-3 md:flex">
              <div className="flex flex-col text-right">
                <p className="text-sm font-semibold leading-none">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {user?.email}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted ring-1 ring-border">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            <Button
              onClick={() => {
                logout();
                toast.success("Logged out");
              }}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
