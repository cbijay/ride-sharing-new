import { createSlice } from "@reduxjs/toolkit";
import { locationActions } from "core/store/location/actions/location.action";

export type LocationState = {
  latitude: number;
  longitude: number;
  error: string;
};

export const initialState: LocationState = {
  latitude: 0,
  longitude: 0,
  error: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState: initialState,
  reducers: locationActions,
});

export const { storeCurrentLocation, locationError } = locationSlice.actions;

export default locationSlice.reducer;
