import { PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "core/store/form/reducer/form.reducer";

export const formActions = {
  validatePickup: (state: FormState, action: PayloadAction<string>) => {
    let error: any = new Object();
    error["pickup"] = action.payload;
    state.error = { ...state.error, pickup: error.pickup };
  },
  validateDestination: (state: FormState, action: PayloadAction<string>) => {
    let error: any = new Object();
    error["destination"] = action.payload;
    state.error = { ...state.error, destination: error.destination };
  },
};
