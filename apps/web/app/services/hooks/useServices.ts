"use client";

import api from "@/lib/api";
import { useState, useEffect, useCallback } from "react";
import { ServiceRequest, UserServiceRequest } from "@/app/services/models/serviceRequest";
import {AboutResponse, UserServicesResponse } from "@/app/services/models/serviceResponse";
import { toast } from "sonner";

export const useServices = () => {
  const [services, setServices] = useState<ServiceRequest[]>([]);
  const [userServices, setUserServices] = useState<UserServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      const aboutData = await api.get("about.json").json<AboutResponse>();
      setServices(aboutData.server.services);
    } catch (error) {
      console.error("Failed to fetch services:", error);
      toast.error("Failed to load services");
    }
  }, []);

  const fetchUserServices = useCallback(async () => {
    try {
      const data = await api
        .get("user-services")
        .json<UserServicesResponse>();
      if (data.success) {
        setUserServices(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user services:", error);
      toast.error("Failed to load connected services");
    }
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchServices(), fetchUserServices()]);
    setIsLoading(false);
  }, [fetchServices, fetchUserServices]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const isServiceConnected = useCallback(
    (serviceName: string): boolean => {
      return userServices.some(
        (us) => us.service.name === serviceName && us.is_connected
      );
    },
    [userServices]
  );

  const getServiceDetails = useCallback(
    (serviceName: string): UserServiceRequest | undefined => {
      return userServices.find((us) => us.service.name === serviceName);
    },
    [userServices]
  );

  const connectService = useCallback(
    async (service: ServiceRequest) => {
      if (isServiceConnected(service.name)) {
        toast.info("Service is already connected");
        return;
      }
      setIsConnecting(service.name);

      try {
        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
          service.oauth_url,
          "OAuth",
          `width=${width},height=${height},left=${left},top=${top}`
        );

        if (!popup) {
          toast.error("Please allow popups for OAuth authentication");
          setIsConnecting(null);
          return;
        }

        const checkPopup = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkPopup);
            setIsConnecting(null);
            void fetchUserServices();
            toast.success(`${service.display_name} connected successfully!`);
          }
        }, 500);
      } catch (error) {
        console.error("Failed to connect service:", error);
        toast.error("Failed to connect service");
        setIsConnecting(null);
      }
    },
    [isServiceConnected, fetchUserServices]
  );

  const disconnectService = useCallback(
    async (userServiceId: string, serviceName: string) => {
      try {
        await api.delete(`user-services/${userServiceId}`);
        toast.success(`${serviceName} disconnected successfully`);
        await fetchUserServices();
      } catch (error) {
        console.error("Failed to disconnect service:", error);
        toast.error("Failed to disconnect service");
      }
    },
    [fetchUserServices]
  );

  const stats = {
    totalServices: services.length,
    connectedServices: userServices.filter((us) => us.is_connected).length,
    availableServices: services.length - userServices.filter((us) => us.is_connected).length,
  };

  return {
    services,
    userServices,
    isLoading,
    isConnecting,
    isServiceConnected,
    getServiceDetails,
    connectService,
    disconnectService,
    stats,
    refreshServices: loadData,
  };
};
