import { useState } from "react";

import { LoginRequest } from "@/app/login/models/loginRequest";
import { LoginResponse } from "@/app/login/models/loginResponse";
import api from "@/lib/api";
import { HTTPError } from "ky";
import { toast } from "sonner";

function useLogin() {
  const [response, setResponse] = useState<LoginResponse>();

  async function login(credentials: LoginRequest) {
    try {
      const response = await api
        .post("auth/login", {
          json: credentials,
        })
        .json<LoginResponse>();
      setResponse(response);
      if (response.success) {
        toast.success(response?.message);
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === 400) {
          const message = "Please enter a valid email address.";
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
            message,
            status_code: 400,
          });
          toast.error(message);
        }

        if (error.response.status === 401) {
          const message = "Wrong credentials, please try again.";
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
            message,
            status_code: 401,
          });
          toast.error(message);
        } else if (
          error.response.status !== 401 &&
          error.response.status !== 400
        ) {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        toast.error("A network error occurred. Please check your connection.");
      }
    }
  }

  return {
    response,
    login,
  };
}

export default useLogin;
