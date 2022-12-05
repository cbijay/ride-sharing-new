import { createSlice } from "@reduxjs/toolkit";
import { formActions } from "core/store/form/actions/form.actions";

export type FormState = {
  success: boolean;
  error: {};
};

export const initialState: FormState = {
  success: false,
  error: {},
};

const formSlice = createSlice({
  name: "form",
  initialState: initialState,
  reducers: formActions,
});

export const { validatePickup, validateDestination } = formSlice.actions;

export default formSlice.reducer;
