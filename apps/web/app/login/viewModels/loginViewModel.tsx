import useLogin from "@/app/login/hooks/useLogin";
import { useState } from "react";

export function useLoginViewModel() {
  const { login, response } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const storeToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  const handleSubmit = () => {
    login({ email, password }).then(() => {
      if (response && response.success) {
        storeToken(response.data.access_token);
      }
    });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    response,
  };
}
