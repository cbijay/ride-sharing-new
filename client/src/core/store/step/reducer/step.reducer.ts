import { createSlice } from "@reduxjs/toolkit";
import { stepActions } from "core/store/step/actions/step.actions";

export type StepState = {
  activeStep: number;
};

export const initialState: StepState = {
  activeStep: 0,
};

const stepSlice = createSlice({
  name: "rider",
  initialState: initialState,
  reducers: stepActions,
});

export const { setActiveStep } = stepSlice.actions;

export default stepSlice.reducer;
