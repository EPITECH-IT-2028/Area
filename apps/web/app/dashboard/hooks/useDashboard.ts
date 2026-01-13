import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Area, AreasResponse } from "@/app/dashboard/models/Dasboard";

export function useDashboard() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { logout } = useAuth();

  const fetchAreas = async () => {
    try {
      const token = Cookies.get("access_token");
      if (!token) {
        const storedUser = Cookies.get("user");
        if (storedUser) {
          toast.error("Session expired. Please log in again.");
          logout();
          router.push("/login");
        }
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
      toast.error("Failed to load your automations. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAreas();
  }, []);
  return { areas, loading };
}
