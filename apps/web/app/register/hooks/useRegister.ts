import { useState } from "react";
import { RegisterRequest } from "@/app/register/models/registerRequest";
import { RegisterResponse } from "@/app/register/models/registerResponse";
import api from "@/lib/api";

function useRegister() {
  const [response, setResponse] = useState<RegisterResponse>();

  async function register(credentials: RegisterRequest) {
    try {
      const response = await api
        .post("auth/register", {
          json: credentials,
        })
        .json<RegisterResponse>();
      // TODO: remove debug log
      console.log("Response: ", response);
      setResponse(response);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    response,
    register,
  };
}

export default useRegister;
