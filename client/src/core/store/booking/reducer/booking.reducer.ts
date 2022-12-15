import { createSlice } from "@reduxjs/toolkit";
import { bookingActions } from "core/store/booking/actions/booking.actions";

import { IBooking } from "features/booking/types/IBooking";
import { IRiderBooking } from "features/booking/types/IRiderBooking";

export type BookingState = {
  booking: IRiderBooking;
  bookings: IBooking[];
  isLoading: boolean;
  error: Error;
  isDisabled: boolean;
  disabled: [number];
};

export const initialState: BookingState = {
  booking: {
    startLocation: {
      address: "",
      coordinates: [0, 0],
    },
    endLocation: {
      address: "",
      coordinates: [0, 0],
    },
    totalDistance: 0,
    estimatedTime: 0,
    status: "",
    user: {
      name: "",
      profilePic: "",
      role: "",
    },
  },
  bookings: [],
  isLoading: false,
  error: {
    name: "",
    message: "",
  },
  isDisabled: false,
  disabled: [0],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialState,
  reducers: bookingActions,
});

export const {
  storePickup,
  storeDestination,
  calculateDistance,
  calculateTime,
  setLoading,
  storeBookingId,
  updateStatus,
  storeBookingUser,
  setError,
  setDisabled,
  setButtonDisable,
  fetchBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
