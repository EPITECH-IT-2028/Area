"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { LoginResponse } from "@/app/login/models/loginResponse";

interface AuthContextType {
  user: LoginResponse["data"]["user"] | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (authData: LoginResponse["data"]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const setData = useEffectEvent(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (
          parsedUser &&
          typeof parsedUser === "object" &&
          parsedUser.id &&
          parsedUser.email
        ) {
          setUser(parsedUser);
          setAccessToken(storedToken);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
      }
    }
    setIsLoading(false);
  });

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    const isAuthenticated = Boolean(user) && Boolean(accessToken);
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isLoading, user, accessToken, router]);

  const login = (authData: LoginResponse["data"]) => {
    setUser(authData.user);
    setAccessToken(authData.access_token);

    localStorage.setItem("user", JSON.stringify(authData.user));
    localStorage.setItem("access_token", authData.access_token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(user) && Boolean(accessToken),
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
