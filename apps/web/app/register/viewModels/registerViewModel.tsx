import { useState, useEffect, useEffectEvent } from "react";

export function useRegisterViewModel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = useEffectEvent((p: string) => {
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
    setPasswordErrors(errors);
    return errors.length === 0;
  });

  const clearPasswordErrors = useEffectEvent(() => {
    setPasswordErrors([]);
  });

  useEffect(() => {
    if (password.length > 0) {
      validatePassword(password);
    } else {
      clearPasswordErrors();
    }
  }, [password]);

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    passwordErrors,
  };
}
