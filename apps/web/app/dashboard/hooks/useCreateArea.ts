import { useCallback, useState } from "react";

import {
  AboutResponse,
  CreateAreaRequest,
  Service,
} from "@/app/dashboard/models/aboutResponse";
import { UserServiceRequest } from "@/app/services/models/serviceRequest";
import { UserServicesResponse } from "@/app/services/models/serviceResponse";
import api from "@/lib/api";
import { toast } from "sonner";

export function useCreateArea() {
  const [services, setServices] = useState<Service[]>([]);
  const [userServices, setUserServices] = useState<UserServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchServices = useCallback(async () => {
    setIsLoading(true);
    try {
      const aboutResponse = await api.get("about.json").json<AboutResponse>();
      setServices(aboutResponse.server.services);
      const userServicesResponse = await api.get("user-services").json<UserServicesResponse>();
      setUserServices(userServicesResponse.data);
    } catch (error) {
      console.error("Failed to load services", error);
      toast.error("Failed to load available services");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createArea = useCallback(
    async (data: CreateAreaRequest): Promise<boolean> => {
      setIsSubmitting(true);
      try {
        await api.post("areas", { json: data }).json();
        toast.success("Area created successfully!");
        return true;
      } catch (error) {
        console.error("Failed to create area", error);
        toast.error("Failed to create area. Please try again.");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return {
    services,
    userServices,
    isLoading: isLoading,
    isSubmitting: isSubmitting,
    fetchServices,
    createArea,
  };
}
