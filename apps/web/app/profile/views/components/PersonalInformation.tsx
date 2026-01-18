"use client";

import { useEffect, useRef, useState } from "react";

import { LoginResponse } from "@/app/login/models/loginResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import {
  Check,
  Copy,
  Loader2,
  Mail,
  Pencil,
  Shield,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface PersonalInformationProps {
  name: string;
  email: string;
  userId: string;
}

interface UpdateUserResponse {
  success: boolean;
  data: LoginResponse["data"]["user"];
  message: string;
}

export function PersonalInformation({
  name,
  email,
  userId,
}: PersonalInformationProps) {
  const { updateUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("User ID copied to clipboard");
      return true;
    } catch {
      toast.error("Failed to copy User ID");
      return false;
    }
  };

  const handleStartEdit = () => {
    setEditedName(name);
    setIsEditingName(true);
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setEditedName(name);
  };

  const handleSaveName = async () => {
    if (!editedName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    if (editedName === name) {
      setIsEditingName(false);
      return;
    }

    setIsSaving(true);
    try {
      const response = await api
        .put(`users/${userId}`, {
          json: { name: editedName },
        })
        .json<UpdateUserResponse>();

      if (response.success) {
        updateUser(response.data);
        toast.success("Name updated successfully");
        setIsEditingName(false);
      } else {
        toast.error("Failed to update name");
      }
    } catch (error) {
      console.error("Failed to update name:", error);
      toast.error("An error occurred while updating name");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <label
              htmlFor="full-name"
              className="text-sm font-medium text-muted-foreground"
            >
              Full Name
            </label>
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  id="full-name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="h-8 max-w-[200px]"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveName();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  disabled={isSaving}
                />
                <Button
                  size="icon"
                  className="h-8 w-8 bg-green-500 hover:bg-green-600"
                  onClick={handleSaveName}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="sr-only">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      <span className="sr-only">Save name</span>
                    </>
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cancel</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p className="text-base font-medium">{name}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  onClick={handleStartEdit}
                >
                  <Pencil className="h-3 w-3" />
                  <span className="sr-only">Edit Name</span>
                </Button>
              </div>
            )}
          </div>
        </div>
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

function CopyButton({ onCopy }: { onCopy: () => Promise<boolean> | boolean }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = async () => {
    const success = await onCopy();
    if (success) {
      setCopied(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
