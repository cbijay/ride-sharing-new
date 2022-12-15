import { PayloadAction } from "@reduxjs/toolkit";
import { BookingState } from "core/store/booking/reducer/booking.reducer";
import { IBooking } from "features/booking/types/IBooking";
import { IPlace } from "features/booking/types/IPlace";
import { IUser } from "features/booking/types/IUser";

export const bookingActions = {
  storePickup: (state: BookingState, action: PayloadAction<IPlace>) => {
    const { label, raw }: IPlace = action.payload;

    state.booking.startLocation.address = label;
    state.booking.startLocation.coordinates = [
      Number(raw?.lat),
      Number(raw?.lon),
    ];
  },

  storeDestination: (state: BookingState, action: PayloadAction<IPlace>) => {
    const { label, raw }: IPlace = action.payload;

    state.booking.endLocation.address = label;
    state.booking.endLocation.coordinates = [
      Number(raw?.lat),
      Number(raw?.lon),
    ];
  },

  calculateDistance: (state: BookingState, action: PayloadAction<number>) => {
    state.booking.totalDistance = action.payload;
  },

  calculateTime: (state: BookingState, action: PayloadAction<number>) => {
    state.booking.estimatedTime = action.payload;
  },

  setLoading: (state: BookingState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },

  storeBookingId: (
    state: BookingState,
    action: PayloadAction<string | undefined>
  ) => {
    state.booking._id = action.payload;
  },

  updateStatus: (state: BookingState, action: PayloadAction<string>) => {
    state.booking.status = action.payload;
  },

  storeBookingUser: (state: BookingState, action: PayloadAction<IUser>) => {
    state.booking.user = action.payload;
  },

  setError: (state: BookingState, action: PayloadAction<Error>) => {
    state.error.name = action.payload.name;
    state.error.message = action.payload.message;
  },

  setDisabled: (state: BookingState, action: PayloadAction<boolean>) => {
    state.isDisabled = action.payload;
  },

  setButtonDisable: (state: BookingState, action: PayloadAction<number>) => {
    let disabled: any = [];
    disabled = [...disabled, action.payload];

    state.disabled = disabled;
  },

  fetchBookings: (state: BookingState, action: PayloadAction<IBooking[]>) => {
    state.bookings = action.payload;
  },
};
