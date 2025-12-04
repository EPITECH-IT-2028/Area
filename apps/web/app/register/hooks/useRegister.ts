import { useState } from "react";
import { RegisterRequest } from "@/app/register/models/registerRequest";
import { RegisterResponse } from "@/app/register/models/registerResponse";
import api from "@/lib/api";
import { HTTPError } from "ky";

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

      if (error instanceof HTTPError) {
        if (error.response.status == 409) {
          setResponse({
            success: false,
            data: {
              access_token: "",
              user: {
                id: "",
                email: "",
                name: "",
              },
            },
            message: "Email already in use, please choose another one.",
          });
        }
      }
    }
  }

  return {
    response,
    register,
  };
}

export default useRegister;
