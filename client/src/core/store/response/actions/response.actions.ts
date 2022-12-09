import { PayloadAction } from "@reduxjs/toolkit";
import { ResponseState } from "core/store/response/reducer/response.reducer";
import { IResponse } from "core/types/global/IResponse";

export const responseActions = {
  setLoading: (state: ResponseState, action: PayloadAction<boolean>) => {
    state.isLoading = action.payload;
  },
  setError: (state: ResponseState, action: PayloadAction<IResponse>) => {
    state.error.name = action.payload.type ?? "";
    state.error.message = action.payload.message ?? "";
  },
};
