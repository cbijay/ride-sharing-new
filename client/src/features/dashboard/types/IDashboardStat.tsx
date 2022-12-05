import { IResponse } from "core/types/global/IResponse";

export interface IDashboardStat extends IResponse {
  pendingCount: number;
  completedCount: number;
  cancelledCount: number;
}
