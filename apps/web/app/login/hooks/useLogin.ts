import { useState } from "react";
import { LoginResponse } from "@/app/login/models/loginResponse";
import { LoginRequest } from "@/app/login/models/loginRequest";
import api from "@/lib/api";

function useLogin() {
  const [response, setResponse] = useState<LoginResponse>();

  async function login(credentials: LoginRequest) {
    try {
      const response = await api
        .post("auth/login", {
          json: credentials,
        })
        .json<LoginResponse>();
      // TODO: remove debug log
      console.log("Response: ", response);
      setResponse(response);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    response,
    login,
  };
}

export default useLogin;
