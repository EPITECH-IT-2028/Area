import { User } from "lucide-react";

interface ProfileCardProps {
  name: string;
  email: string;
}

export function ProfileCard({ name, email }: ProfileCardProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
          <User className="h-12 w-12" />
        </div>
        <h2 className="mb-1 text-2xl font-bold">{name}</h2>
        <p className="text-sm text-muted-foreground">{email}</p>
      </div>
    </div>
  );
}
