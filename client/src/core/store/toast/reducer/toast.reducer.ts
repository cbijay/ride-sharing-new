import { createSlice } from "@reduxjs/toolkit";
import { toastActions } from "core/store/toast/actions/toast.actions";
import { TToast } from "core/types/components/toast/TToast";

export type ToastState = {
  data: Array<TToast>;
};

export const initialState: ToastState = {
  data: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState: initialState,
  reducers: toastActions,
});

export const { addNotification, removeNotification } = toastSlice.actions;

export default toastSlice.reducer;
