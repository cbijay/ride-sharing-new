import { PayloadAction } from "@reduxjs/toolkit";
import { RiderState } from "core/store/rider/reducer/rider.reducer";
import { IBookingRider } from "features/booking/types/IBookingRider";

export const riderActions = {
  getRiders: (state: RiderState, action: PayloadAction<IBookingRider[]>) => {
    state.riders = action.payload;
  },
};
