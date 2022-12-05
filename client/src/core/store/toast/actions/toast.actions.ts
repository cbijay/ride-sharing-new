import { PayloadAction } from "@reduxjs/toolkit";
import { ToastState } from "core/store/toast/reducer/toast.reducer";
import { TToast } from "core/types/components/toast/TToast";
import { uuidv4 } from "core/utils/uuid";

const DEFAULT_INTERVAL = 2500;

export const toastActions = {
  addNotification: (state: ToastState, action: PayloadAction<TToast>) => {
    const { message, type, lifetime, truncate } = action.payload;
    if (message) {
      const new_item: TToast = {
        id: uuidv4(),
        message: message,
        type: type,
        lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
      };

      let toastData = [];
      toastData = [...state.data, new_item];
      state.data = toastData;
    }
  },

  removeNotification: (state: ToastState, action: PayloadAction<string>) => {
    let newData = [...state.data];
    newData = state.data.filter((toast) => toast.id !== action.payload);
    state.data = newData;
  },
};
