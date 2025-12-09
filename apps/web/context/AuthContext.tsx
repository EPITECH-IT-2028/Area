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
  login: (authData: LoginResponse["data"]) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  const setData = useEffectEvent(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
  });

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (
      !storedToken &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      router.push("/login");
    } else if (
      storedToken &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/register")
    ) {
      router.push("/");
    }
  }, [router]);

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
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(user),
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
