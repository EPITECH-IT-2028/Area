import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { UserServicesResponse } from "@/app/services/models/userServicesResponse";

function useUserServices() {
  const [connectedServices, setConnectedServices] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useAuth();

  const fetchUserServices = async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await api
        .get("user-services", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .json<UserServicesResponse>();

      if (response.success && response.data) {
        const connected = new Set(
          response.data
            .filter((us) => us.is_connected)
            .map((us) => us.service.name)
        );
        setConnectedServices(connected);
      }
    } catch (err) {
      console.error("Error fetching user services:", err);
      setConnectedServices(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserServices();
  }, [accessToken]);

  return { connectedServices, isLoading, refetch: fetchUserServices };
}

export default useUserServices;
