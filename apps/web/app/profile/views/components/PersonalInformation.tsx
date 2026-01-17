import { User, Mail, Shield } from "lucide-react";

interface PersonalInformationProps {
  name: string;
  email: string;
  userId: string;
}

export function PersonalInformation({ name, email, userId }: PersonalInformationProps) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-semibold">Personal Information</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              Full Name
            </p>
            <p className="text-base font-semibold">{name}</p>
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
            <p className="text-base font-semibold">{email}</p>
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
            <p className="text-base font-mono font-semibold">{userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
