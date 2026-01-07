import { useMemo } from "react";
import { useDashboard } from "@/app/dashboard/hooks/useDashboard";
import { HookLog } from "@/app/dashboard/models/Dasboard";

export function useDashboardViewModel() {
  const { areas, loading } = useDashboard();

  const stats = useMemo(() => {
    const totalAreas = areas.length;
    const activeAreas = areas.filter((a) => a.is_active).length;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const executionsToday = areas.reduce((count, area) => {
      const todayLogs =
        area.hook_logs?.filter((log) => new Date(log.created_at) >= today) ||
        [];
      return count + todayLogs.length;
    }, 0);

    const connectedServices = new Set<string>();
    areas.forEach((area) => {
      connectedServices.add(area.action.service.name);
      connectedServices.add(area.reaction.service.name);
    });

    return {
      totalAreas,
      activeAreas,
      executionsToday,
      connectedServicesCount: connectedServices.size,
    };
  }, [areas]);

  const allLogs = useMemo(() => {
    const logs: (HookLog & { areaName: string })[] = [];
    areas.forEach((area) => {
      area.hook_logs?.forEach((log) => {
        logs.push({ ...log, areaName: area.name });
      });
    });
    logs.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return logs;
  }, [areas]);

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

  return {
    areas,
    loading,
    stats,
    allLogs,
    getStatusColor,
  };
}
