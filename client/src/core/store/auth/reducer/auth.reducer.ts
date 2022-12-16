import { createSlice } from "@reduxjs/toolkit";
import { authActions } from "core/store/auth/actions/auth.actions";

export type AuthState = {
  name: string;
  email: string;
  profilePic: string;
  userId: string;
  isLoggedIn?: boolean;
  role: string;
};

export const initialState: AuthState = {
  name: "",
  email: "",
  profilePic: "",
  userId: "",
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: authActions,
});

export const { auth, logout } = authSlice.actions;

export default authSlice.reducer;
