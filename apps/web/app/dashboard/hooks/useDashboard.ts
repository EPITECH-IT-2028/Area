import { useCallback, useEffect, useState } from "react";

import { Area, AreasResponse } from "@/app/dashboard/models/areasResponse";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";

function useDashboard() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useAuth();

  const fetchAreas = useCallback(async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.get("areas/user").json<AreasResponse>();
      if (response.success && response.data && response.data.length > 0) {
        setAreas(response.data);
      } else {
        setAreas([]);
      }
    } catch (error) {
      console.error("Failed to fetch areas:", error);
      toast.error("Failed to load your automations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void fetchAreas();
  }, [fetchAreas]);

  const deleteArea = useCallback(
    async (id: string) => {
      try {
        await api.delete(`areas/${id}`).json();
        toast.success("Automation deleted successfully");
        await fetchAreas();
      } catch (error) {
        console.error("Failed to delete area:", error);
        toast.error("Failed to delete automation. Please try again.");
      }
    },
    [fetchAreas],
  );

  const updateArea = useCallback(
    async (
      id: string,
      data: { name?: string; description?: string; is_active?: boolean },
    ) => {
      try {
        if (data.name) {
          await api.patch(`areas/${id}/name`, { json: { name: data.name } });
        }
        if (data.description) {
          await api.patch(`areas/${id}/description`, {
            json: { description: data.description },
          });
        }
        if (data.is_active !== undefined) {
          await api.patch(`areas/${id}/status`, {
            json: { is_active: data.is_active },
          });
        }
        toast.success("Automation updated successfully");
        await fetchAreas();
      } catch (error) {
        console.error("Failed to update area:", error);
        toast.error("Failed to update automation. Please try again.");
      }
    },
    [fetchAreas],
  );

  return { areas, isLoading, refetch: fetchAreas, deleteArea, updateArea };
}

export default useDashboard;
