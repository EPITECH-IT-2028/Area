import { useEffect, useState } from "react";

import { Area, AreasResponse } from "@/app/dashboard/models/areasResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";

function useDashboard() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();

  useEffect(() => {
    async function fetchAreas() {
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("areas").json<AreasResponse>();
        if (response.success && response.data && response.data.length > 0) {
          setAreas(response.data.map((area) => ({ ...area, is_active: true })));
        }
      } catch (error) {
        console.error("Failed to fetch areas:", error);
        toast.error("Failed to load your automations. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    void fetchAreas();
  }, [accessToken]);
  return { areas, isLoading };
}

export default useDashboard;
