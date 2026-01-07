import { useState, useEffect } from "react";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { Area, AreasResponse } from "@/app/dashboard/models/Dasboard";

export function useDashboard() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAreas = async () => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        setLoading(false);
        return;
      }
      const response = await api
        .get("areas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json<AreasResponse>();
      if (response.success && response.data) {
        setAreas(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch areas:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAreas();
  }, []);
  return { areas, loading };
}
