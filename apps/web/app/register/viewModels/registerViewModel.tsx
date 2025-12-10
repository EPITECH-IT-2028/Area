import { useEffect, useState } from "react";

import { toast } from "sonner";

import useRegister from "../hooks/useRegister";

function getPasswordValidationErrors(p: string): string[] {
  if (p.length <= 0) {
    return [];
  }

  const errors: string[] = [];
  if (p.length < 8) {
    errors.push("8 minimum characters");
  }
  if (!/[A-Z]/.test(p)) {
    errors.push("1 capital letter");
  }
  if (!/[a-z]/.test(p)) {
    errors.push("1 small letter");
  }
  if (!/[^A-Za-z0-9]/.test(p)) {
    errors.push("1 special character");
  }
  if (!/[0-9]/.test(p)) {
    errors.push("1 number");
  }
  return errors;
}

export function useRegisterViewModel() {
  const { register, response } = useRegister();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const storeToken = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  useEffect(() => {
    setPasswordErrors(getPasswordValidationErrors(password));
  }, [password]);

  const handleSubmit = () => {
    setHasSubmitted(true);

    if (!name || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (passwordErrors.length > 0) {
      toast.error("Please use a stronger password.");
    }

    if (passwordErrors.length === 0) {
      register({ name, email, password })
        .then((res) => {
          if (res && res.success) {
            storeToken(res.data.access_token);
          }
        })
        .catch((error) => {
          console.log("Registration error:", error);
        });
    }
  };

  const isNameError = hasSubmitted && !name;
  const isEmailError =
    (hasSubmitted && !email) ||
    response?.status_code === 400 ||
    response?.status_code === 409;
  const isPasswordError =
    (hasSubmitted && !password) || passwordErrors.length > 0;

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    response,
    passwordErrors,
    isNameError,
    isEmailError,
    isPasswordError,
  };
}
