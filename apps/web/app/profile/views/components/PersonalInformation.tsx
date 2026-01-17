"use client";

import { useState } from "react";

import { Check, Copy, Mail, Shield, User } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PersonalInformationProps {
  name: string;
  email: string;
  userId: string;
}

export function PersonalInformation({
  name,
  email,
  userId,
}: PersonalInformationProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("User ID copied to clipboard");
    } catch {
      toast.error("Failed to copy User ID");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <InfoRow
          icon={<User className="h-5 w-5 text-primary" />}
          label="Full Name"
          value={name}
        />
        <Separator />
        <InfoRow
          icon={<Mail className="h-5 w-5 text-primary" />}
          label="Email Address"
          value={email}
        />
        <Separator />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium text-muted-foreground">User ID</p>
            <div className="flex items-center gap-2">
              <code className="relative rounded bg-muted px-3 py-1.5 font-mono text-sm font-semibold">
                {userId}
              </code>
              <CopyButton onCopy={() => copyToClipboard(userId)} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className="text-base font-medium">{value}</p>
      </div>
    </div>
  );
}

function CopyButton({ onCopy }: { onCopy: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6"
      onClick={handleClick}
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3 text-muted-foreground" />
      )}
      <span className="sr-only">Copy User ID</span>
    </Button>
  );
}
