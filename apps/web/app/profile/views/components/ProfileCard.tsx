import { User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ProfileCardProps {
  name: string;
  email: string;
}

export function ProfileCard({ name, email }: ProfileCardProps) {
  return (
    <Card className="h-full gap-0 overflow-hidden p-0">
      <div className="h-24 bg-linear-to-br from-primary to-secondary opacity-90" />
      <CardContent className="relative px-6 pb-6">
        <div className="-mt-12 mb-4 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-linear-to-tl from-primary to-secondary text-white shadow-lg">
            <User className="h-12 w-12" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardContent>
    </Card>
  );
}
