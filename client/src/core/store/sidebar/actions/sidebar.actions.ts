import { PayloadAction } from "@reduxjs/toolkit";
import { SidebarState } from "core/store/sidebar/reducer/sidebar.reducer";

export const sidebarActions = {
  toggleSidebar: (state: SidebarState, action: PayloadAction<boolean>) => {
    state.isShowSidebar = action.payload;
  },
};
