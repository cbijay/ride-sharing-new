import { createSlice } from "@reduxjs/toolkit";
import { sidebarActions } from "core/store/sidebar/actions/sidebar.actions";

export type SidebarState = {
  isShowSidebar: boolean;
};

export const initialState: SidebarState = {
  isShowSidebar: false,
};

const sidebarSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: sidebarActions,
});

export const { toggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
