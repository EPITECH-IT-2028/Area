import { useState } from "react";

import useLogin from "@/app/login/hooks/useLogin";
import { toast } from "sonner";

export function useLoginViewModel() {
  const { login, response } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const storeToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  const handleSubmit = () => {
    setHasSubmitted(true);

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    login({ email, password }).then(() => {
      if (response && response.success) {
        storeToken(response.data.access_token);
      }
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
