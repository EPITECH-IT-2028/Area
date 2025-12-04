import { useState } from "react";
import { RegisterRequest } from "@/app/register/models/registerRequest";
import { RegisterResponse } from "@/app/register/models/registerResponse";
import api from "@/lib/api";
import { HTTPError } from "ky";
import { toast } from "sonner";

function useRegister() {
  const [response, setResponse] = useState<RegisterResponse>();

  async function register(credentials: RegisterRequest) {
    try {
      const response = await api
        .post("auth/register", {
          json: credentials,
        })
        .json<RegisterResponse>();
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

        if (error.response.status === 409) {
          const message = "Email already in use, please choose another one.";
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
            status_code: 409,
          });
          toast.error(message);
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
