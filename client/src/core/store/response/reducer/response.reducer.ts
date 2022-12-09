import { createSlice } from "@reduxjs/toolkit";
import { responseActions } from "core/store/response/actions/response.actions";

export type ResponseState = {
  isLoading: boolean;
  error: Error;
};

export const initialState: ResponseState = {
  isLoading: false,
  error: {
    name: "",
    message: "",
  },
};

const responseSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: responseActions,
});

export const { setLoading, setError } = responseSlice.actions;

export default responseSlice.reducer;
