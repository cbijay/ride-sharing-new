import { createSlice } from "@reduxjs/toolkit";
import { statActions } from "core/store/stat/actions/stat.actions";

export type StatState = {
  pendingCount: number;
  completedCount: number;
  cancelledCount: number;
};

export const initialState: StatState = {
  pendingCount: 0,
  completedCount: 0,
  cancelledCount: 0,
};

const statSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: statActions,
});

export const { fetchStat } = statSlice.actions;

export default statSlice.reducer;
