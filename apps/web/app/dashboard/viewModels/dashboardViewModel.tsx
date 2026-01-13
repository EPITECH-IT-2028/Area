import { useMemo } from "react";
import { useDashboard } from "@/app/dashboard/hooks/useDashboard";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-500";
    case "failed":
    case "error":
      return "bg-red-500";
    case "pending":
      return "bg-yellow-500";
    default:
      return "bg-gray-500";
  }
};

export function useDashboardViewModel() {
  const { areas, loading } = useDashboard();

  const stats = useMemo(() => {
    const totalAreas = areas.length;
    const activeAreas = areas.filter((a) => a.is_active).length;

    const connectedServices = new Set<string>();
    areas.forEach((area) => {
      connectedServices.add(area.action.service.name);
      connectedServices.add(area.reaction.service.name);
    });

    return {
      totalAreas,
      activeAreas,
      executionsToday: 0,
      connectedServicesCount: connectedServices.size,
    };
  }, [areas]);

  return {
    areas,
    loading,
    stats,
    getStatusColor,
  };
}
