import { configureStore } from "@reduxjs/toolkit";
import userReducer from "core/store/auth/reducer/auth.reducer";
import bookingReducer from "core/store/booking/reducer/booking.reducer";

import locationReducer from "core/store/location/reducer/location.reducer";
import riderReducer from "core/store/rider/reducer/rider.reducer";
import statReducer from "core/store/stat/reducer/stat.reducer";

import formReducer from "core/store/form/reducer/form.reducer";
import stepReducer from "core/store/step/reducer/step.reducer";
import toastReducer from "core/store/toast/reducer/toast.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    location: locationReducer,
    rider: riderReducer,
    step: stepReducer,
    toast: toastReducer,
    stat: statReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
