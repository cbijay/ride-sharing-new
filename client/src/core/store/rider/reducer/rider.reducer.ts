import { createSlice } from "@reduxjs/toolkit";
import { riderActions } from "core/store/rider/actions/rider.actions";
import { IBookingRider } from "features/booking/types/IBookingRider";

export type RiderState = {
  riders: IBookingRider[];
};

export const initialState: RiderState = {
  riders: [],
};

const riderSlice = createSlice({
  name: "rider",
  initialState: initialState,
  reducers: riderActions,
});

export const { getRiders } = riderSlice.actions;

export default riderSlice.reducer;
