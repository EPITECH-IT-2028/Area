"use client";

import { useEffect, useRef } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { LoginResponse } from "@/app/auth/models/loginResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
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

    if (error) {
      toast.error("Login : " + error);
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
        const tokenPayload: JwtPayload = JSON.parse(atob(token.split(".")[1]));
        const userId = tokenPayload.sub;

        if (!userId) {
          throw new Error("User ID not found in token");
        }

        const user = await api
          .get(`users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .json<LoginResponse>();

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
