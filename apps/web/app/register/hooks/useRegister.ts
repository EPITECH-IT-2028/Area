import { useState } from "react";

import { RegisterRequest } from "@/app/register/models/registerRequest";
import { RegisterResponse } from "@/app/register/models/registerResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { HTTPError } from "ky";
import { toast } from "sonner";

function useRegister() {
  const [response, setResponse] = useState<RegisterResponse>();
  const { login: contextLogin } = useAuth();

  async function register(
    credentials: RegisterRequest,
  ): Promise<RegisterResponse | undefined> {
    try {
      const response = await api
        .post("auth/register", {
          json: credentials,
        })
        .json<RegisterResponse>();
      setResponse(response);
      if (response.success) {
        toast.success(response?.message);
        contextLogin(response.data);
      }
      return response;
    } catch (error) {
      let errorResponse: RegisterResponse | undefined;
      if (error instanceof HTTPError) {
        const status = error.response.status;
        let message = "An unexpected error occurred. Please try again later.";

        if (status === 400) {
          message = "Please enter a valid email address.";
        } else if (status === 409) {
          message = "Email already in use, please choose another one.";
        }

        errorResponse = {
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
          status_code: status,
        };

        setResponse(errorResponse);
        toast.error(message);
        return errorResponse;
      } else {
        toast.error("A network error occurred. Please check your connection.");
        console.error("A network error occurred during registration:", error);
        throw error;
      }
    }
  }

  return {
    response,
    register,
  };
}

export default useRegister;
