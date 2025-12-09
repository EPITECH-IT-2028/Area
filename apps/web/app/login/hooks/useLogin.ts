import { useState } from "react";

import { useRouter } from "next/navigation";

import { LoginRequest } from "@/app/login/models/loginRequest";
import { LoginResponse } from "@/app/login/models/loginResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { HTTPError } from "ky";
import { toast } from "sonner";

function useLogin() {
  const [response, setResponse] = useState<LoginResponse>();
  const { login: contextLogin } = useAuth();
  const router = useRouter();

  async function login(
    credentials: LoginRequest,
  ): Promise<LoginResponse | undefined> {
    try {
      const response = await api
        .post("auth/login", {
          json: credentials,
        })
        .json<LoginResponse>();
      setResponse(response);
      if (response.success) {
        toast.success(response?.message);
        contextLogin(response.data);
        router.push("/dashboard");
      }
      return response;
    } catch (error) {
      let errorResponse: LoginResponse | undefined;
      if (error instanceof HTTPError) {
        const status = error.response.status;
        let message = "An unexpected error occurred. Please try again later.";

        if (status === 400) {
          message = "Please enter a valid email address.";
        } else if (status === 401) {
          message = "Wrong credentials, please try again.";
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
      } else {
        toast.error("A network error occurred. Please check your connection.");
        throw error;
      }
      return errorResponse;
    }
  }

  return {
    response,
    login,
  };
}

export default useLogin;
