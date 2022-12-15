import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "core/store/auth/reducer/auth.reducer";
import bookingReducer from "core/store/booking/reducer/booking.reducer";
import locationReducer from "core/store/location/reducer/location.reducer";

import formReducer from "core/store/form/reducer/form.reducer";
import riderReducer from "core/store/rider/reducer/rider.reducer";
import statReducer from "core/store/stat/reducer/stat.reducer";

import sidebarReducer from "core/store/sidebar/reducer/sidebar.reducer";
import stepReducer from "core/store/step/reducer/step.reducer";
import toastReducer from "core/store/toast/reducer/toast.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  booking: bookingReducer,
  location: locationReducer,
  rider: riderReducer,
  step: stepReducer,
  toast: toastReducer,
  stat: statReducer,
  form: formReducer,
  sidebar: sidebarReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store;
