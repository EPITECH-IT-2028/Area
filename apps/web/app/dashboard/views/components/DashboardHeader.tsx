import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function DashboardHeader() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo_horizontal.svg"
              width={96}
              height={96}
              alt="logo"
              className="pointer-events-none flex items-center space-x-4 select-none lg:absolute"
              draggable="false"
            />
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/profile"
              className="hidden items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50 md:flex"
            >
              <div className="flex flex-col text-right">
                <p className="text-sm leading-none font-semibold">
                  {user?.name || "User"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {user?.email}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted ring-1 ring-border transition-all hover:ring-primary/50">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
            </Link>

            <Button
              onClick={() => {
                logout();
                toast.success("Logged out");
              }}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
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
