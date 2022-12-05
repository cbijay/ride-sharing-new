import { PayloadAction } from "@reduxjs/toolkit";
import { StepState } from "../reducer/step.reducer";

export const stepActions = {
  setActiveStep: (state: StepState, action: PayloadAction<number>) => {
    state.activeStep = action.payload;
  },
};
