"use client";

import { useRouter } from "next/navigation";

import { DashboardHeader } from "@/app/dashboard/views/components/DashboardHeader";
import { PersonalInformation } from "@/app/profile/views/components/PersonalInformation";
import { ProfileCard } from "@/app/profile/views/components/ProfileCard";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProfileView() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }
  return (
    <div className="min-h-screen bg-muted/30">
      <DashboardHeader />
      <main className="container mx-auto max-w-5xl animate-in px-4 py-8 duration-500 fade-in slide-in-from-bottom-4">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="mb-4 pl-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your account information and preferences
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          <div className="md:col-span-1">
            <ProfileCard name={user.name} email={user.email} />
          </div>
          <div className="md:col-span-2">
            <PersonalInformation
              name={user.name}
              email={user.email}
              userId={user.id}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
