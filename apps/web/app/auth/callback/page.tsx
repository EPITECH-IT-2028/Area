"use client";

import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { OAuthResponse } from "@/app/auth/models/oauthResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { toast } from "sonner";

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
        window.close();
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

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-primary-foreground">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="animate-pulse text-muted-foreground">Authenticating...</p>
    </div>
  );
}
