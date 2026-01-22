"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { OAuthResponse } from "@/app/auth/models/oauthResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface JwtPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const hasFetched = useRef(false);
  const [status, setStatus] = useState<
    "authenticating" | "linked_success" | "linked_error"
  >("authenticating");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const action = searchParams.get("action");
    const success = searchParams.get("success");

    if (action === "link") {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: "OAUTH_LINK_RESULT",
            success: !error,
            message: success || error,
          },
          window.location.origin,
        );

        setTimeout(() => {
          if (error) {
            setStatus("linked_error");
            setMessage(error);
          } else {
            setStatus("linked_success");
            setMessage(success || "Service connected successfully!");
          }
        }, 0);
      } else {
        if (error) {
          toast.error(error);
        } else {
          toast.success(success || "Account linked successfully");
        }
        router.push("/services");
      }
      return;
    }

    if (error) {
      toast.error("Connection failed, please try again.");
      router.push("/login");
      return;
    }

    if (!token) {
      router.push("/login");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchUserAndLogin = async () => {
      try {
        const parts = token.split(".");
        if (parts.length !== 3) {
          toast.error("Invalid token format");
          router.push("/login");
          return;
        }
        const tokenPayload: JwtPayload = JSON.parse(atob(parts[1]));
        const userId = tokenPayload.sub;

        if (!userId) {
          toast.error("User ID not found in token");
          router.push("/login");
          return;
        }

        Cookies.set("access_token", token);
        const user = await api.get(`users/${userId}`).json<OAuthResponse>();

        login({
          access_token: token,
          user: user.data,
        });

        toast.success("Logged in successfully");
        router.push("/dashboard");
      } catch (err) {
        console.error(err);
        toast.error("Unable to login, please try again.");
        router.push("/login");
      }
    };

    fetchUserAndLogin().then();
  }, [searchParams, router, login]);

  if (status === "linked_success") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-primary-foreground p-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h1 className="text-2xl font-bold">Service Connected</h1>
          <p className="text-muted-foreground">
            Your account has been successfully linked. You can now close this
            window and return to the application.
          </p>
        </div>
        <Button onClick={() => window.close()} className="mt-4">
          Close Window
        </Button>
      </div>
    );
  }

  if (status === "linked_error") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-primary-foreground p-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <XCircle className="h-10 w-10" />
        </div>
        <div className="max-w-md space-y-2">
          <h1 className="text-2xl font-bold">Connection Failed</h1>
          <p className="text-muted-foreground">
            {message ||
              "An error occurred while connecting your account. Please try again."}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.close()}
          className="mt-4"
        >
          Close Window
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primary-foreground">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="animate-pulse text-muted-foreground">Authenticating...</p>
    </div>
  );
}
