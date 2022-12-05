import api from "core/lib/api";
import { IDashboardStat } from "features/dashboard/types/IDashboardStat";

export const dashboardStat = async () => {
  const response: IDashboardStat = await api.get(
    `${process.env.REACT_APP_BASE_URL!}/dashboard/stat`
  );

  return response;
};
