"use client";

import { useAuth } from "@/context/AuthContext";
import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { User, Mail, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ProfileView() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return null;
  }
  return (
    <div className="min-h-screen">
      <DashboardHeader />
      <main className="container mx-auto my-4 px-4 md:my-8 md:px-0">
        <div className="mb-6 md:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            ← Back to Dashboard
          </Button>
          <h1 className="mb-2 text-2xl font-bold md:text-4xl">Profile</h1>
          <p className="text-base text-muted-foreground md:text-lg">
            Manage your account information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <User className="h-12 w-12" />
                </div>
                <h2 className="mb-1 text-2xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-xl font-semibold">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-base font-semibold">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Email Address
                    </p>
                    <p className="text-base font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      User ID
                    </p>
                    <p className="text-base font-mono font-semibold">{user.id}</p>
                  </div>
                </div>
              </div>
            </div>

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
                      <p className="text-base font-semibold text-green-600">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
