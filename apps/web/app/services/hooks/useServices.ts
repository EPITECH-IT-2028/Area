"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ServiceRequest,
  UserServiceRequest,
} from "@/app/services/models/serviceRequest";
import {
  AboutResponse,
  UserServicesResponse,
} from "@/app/services/models/serviceResponse";
import api from "@/lib/api";
import Cookies from "js-cookie";
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
      const data = await api.get("user-services").json<UserServicesResponse>();
      if (data.success) {
        setUserServices(data.data);
        return data.data;
      }
    } catch (error) {
      console.error("Failed to fetch user services:", error);
      toast.error("Failed to load connected services");
    }
    return [];
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchServices(), fetchUserServices()]);
    setIsLoading(false);
  }, [fetchServices, fetchUserServices]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const isServiceConnected = useCallback(
    (service: ServiceRequest): boolean => {
      if (!service.oauth_url) {
        return true;
      }
      return userServices.some(
        (us) => us.service.name === service.name && us.is_connected,
      );
    },
    [userServices],
  );

  const getServiceDetails = useCallback(
    (serviceName: string): UserServiceRequest | undefined => {
      return userServices.find((us) => us.service.name === serviceName);
    },
    [userServices],
  );

  const connectService = useCallback(
    async (service: ServiceRequest) => {
      if (!service.oauth_url) {
        toast.info("This service doesn't require authentication");
        return;
      }
      if (isServiceConnected(service)) {
        toast.info("Service is already connected");
        return;
      }
      setIsConnecting(service.name);

      try {
        let oauthUrl = service.oauth_url;
        oauthUrl = oauthUrl.replace(
          /\/auth\/([^\/]+)\/callback/,
          "/auth/link/$1",
        );

        const token = Cookies.get("access_token");
        if (token) {
          const separator = oauthUrl.includes("?") ? "&" : "?";
          oauthUrl = `${oauthUrl}${separator}token=${token}`;
        }

        const width = 600;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const popup = window.open(
          oauthUrl,
          "OAuth",
          `width=${width},height=${height},left=${left},top=${top}`,
        );

        if (!popup) {
          toast.error("Please allow popups for OAuth authentication");
          setIsConnecting(null);
          return;
        }

        let handled = false;
        const intervalRef: { current: NodeJS.Timeout | null } = {
          current: null,
        };

        const handleMessage = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;

          if (event.data?.type === "OAUTH_LINK_RESULT") {
            handled = true;
            const { success: isSuccess, message } = event.data;

            if (isSuccess) {
              toast.success(`${service.display_name} connected successfully!`);
            } else {
              toast.error(
                message || `Failed to connect ${service.display_name}`,
              );
            }

            void fetchUserServices();
            cleanup();
          }
        };

        const cleanup = () => {
          if (intervalRef.current) clearInterval(intervalRef.current);
          window.removeEventListener("message", handleMessage);
          setIsConnecting(null);
        };

        window.addEventListener("message", handleMessage);

        intervalRef.current = setInterval(() => {
          if (popup.closed) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setTimeout(async () => {
              if (!handled) {
                handled = true;
                const updatedServices = await fetchUserServices();
                const isNowConnected = updatedServices.some(
                  (us) => us.service.name === service.name && us.is_connected,
                );

                if (isNowConnected) {
                  toast.success(
                    `${service.display_name} connected successfully!`,
                  );
                }
                cleanup();
              }
            }, 1000);
          }
        }, 500);
      } catch (error) {
        console.error("Failed to connect service:", error);
        toast.error("Failed to connect service");
        setIsConnecting(null);
      }
    },
    [isServiceConnected, fetchUserServices],
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
    [fetchUserServices],
  );

  const stats = {
    totalServices: services.length,
    connectedServices: userServices.filter((us) => us.is_connected).length,
    availableServices:
      services.length - userServices.filter((us) => us.is_connected).length,
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
