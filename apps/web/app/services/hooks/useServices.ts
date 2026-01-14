import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { ServiceResponse, AboutResponse } from "@/app/services/models/serviceResponse";

function useServices() {
  const [services, setServices] = useState<ServiceResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("about.json", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }).json<AboutResponse>();

        if (response.server?.services) {
          setServices(response.server.services);
          setError(null);
        } else {
          setServices([]);
          setError("No services available");
        }
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(`Failed to fetch services: ${err instanceof Error ? err.message : String(err)}`);
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [accessToken]);

  return { services, isLoading, error };
}

export default useServices;
