import { useState, useEffect } from "react";
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

  useEffect(() => {
    setPasswordErrors(getPasswordValidationErrors(password));
  }, [password]);

  const handleSubmit = () => {
    const errors = getPasswordValidationErrors(password);
    setPasswordErrors(errors);
    if (errors.length === 0) {
      register({ name, email, password }).then();
    }
  };

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
  };
}
