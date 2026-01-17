"use client";

import { useAuth } from "@/context/AuthContext";
import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProfileCard } from "@/app/profile/views/components/ProfileCard";
import { PersonalInformation } from "@/app/profile/views/components/PersonalInformation";
import { AccountStatus } from "@/app/profile/views/components/AccountStatus";

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
            <ProfileCard name={user.name} email={user.email} />
          </div>

          <div className="md:col-span-2 space-y-6">
            <PersonalInformation 
              name={user.name} 
              email={user.email} 
              userId={user.id} 
            />
            <AccountStatus />
          </div>
        </div>
      </main>
    </div>
  );
}
