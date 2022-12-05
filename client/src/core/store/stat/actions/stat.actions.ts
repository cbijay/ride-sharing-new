import { PayloadAction } from "@reduxjs/toolkit";
import { StatState } from "core/store/stat/reducer/stat.reducer";
import { IDashboardStat } from "features/dashboard/types/IDashboardStat";

export const statActions = {
  fetchStat: (state: StatState, action: PayloadAction<IDashboardStat>) => {
    state.pendingCount = action.payload.pendingCount;
    state.completedCount = action.payload.completedCount;
    state.cancelledCount = action.payload.cancelledCount;
  },
};
