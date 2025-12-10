import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useLogin from "@/app/login/hooks/useLogin";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export function useLoginViewModel() {
  const { login, response } = useLogin();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = () => {
    setHasSubmitted(true);

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    login({ email, password }).catch((error) => {
      console.log("Login error:", error);
    });
  };

  const isEmailError =
    (hasSubmitted && !email) || response?.status_code === 400;
  const isPasswordError = hasSubmitted && !password;

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    response,
    isEmailError,
    isPasswordError,
  };
}
