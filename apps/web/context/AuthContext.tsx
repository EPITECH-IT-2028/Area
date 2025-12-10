"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

import { LoginResponse } from "@/app/login/models/loginResponse";
import Cookies from "js-cookie";

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

  const setData = useEffectEvent(() => {
    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("access_token");

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
          Cookies.remove("user");
          Cookies.remove("access_token");
        }
      } catch (error) {
        console.error("Failed to parse stored user data:", error);
        Cookies.remove("user");
        Cookies.remove("access_token");
      }
    }
    setIsLoading(false);
  });

  useEffect(() => {
    setData();
  }, []);

  const login = (authData: LoginResponse["data"]) => {
    setUser(authData.user);
    setAccessToken(authData.access_token);

    Cookies.set("user", JSON.stringify(authData.user), {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    Cookies.set("access_token", authData.access_token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    Cookies.remove("user");
    Cookies.remove("access_token");
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
