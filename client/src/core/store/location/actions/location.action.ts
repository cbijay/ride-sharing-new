import { PayloadAction } from "@reduxjs/toolkit";
import { LocationState } from "core/store/location/reducer/location.reducer";

export const locationActions = {
  storeCurrentLocation: (
    state: LocationState,
    action: PayloadAction<GeolocationCoordinates>
  ) => {
    const { latitude, longitude } = action.payload;

    state.latitude = latitude;
    state.longitude = longitude;
  },

  locationError: (state: LocationState, action: PayloadAction<string>) => {
    state.error = action.payload;
  },
};
