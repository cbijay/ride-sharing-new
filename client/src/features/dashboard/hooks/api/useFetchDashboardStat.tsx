import { useQuery } from "@tanstack/react-query";
import { dashboardStat } from "features/dashboard/api/dashboard";
import { IDashboardStat } from "features/dashboard/types/IDashboardStat";

export const useFetchDashboardStat = () => {
  return useQuery<IDashboardStat, ErrorConstructor>(["dashboardStat"], () =>
    dashboardStat()
  );
};
