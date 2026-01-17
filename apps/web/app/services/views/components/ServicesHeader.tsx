"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function ServicesHeader() {
  const router = useRouter();

  return (
    <div className="mb-6 md:mb-8">
      <Button
        onClick={() => router.push('/dashboard')}
        variant="ghost"
        className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Button>
      <h1 className="mb-2 text-2xl font-bold md:text-4xl">
        Connect Services
      </h1>
      <p className="text-base text-muted-foreground md:text-lg">
        Connect your favorite services to create powerful automations
      </p>
    </div>
  );
}
