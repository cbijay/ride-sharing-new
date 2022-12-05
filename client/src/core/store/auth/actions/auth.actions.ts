import { getUser, removeUser } from "core/lib/cookie";
import { AuthState } from "core/store/auth/reducer/auth.reducer";

export const authActions = {
  auth: (state: AuthState) => {
    const user = getUser();

    state.userId = user?.userId;
    state.name = user?.name;
    state.email = user?.email;

    state.profilePic = user?.profilePic;
    state.role = user?.role;
    state.isLoggedIn = true;
  },
  logout: (state: AuthState) => {
    removeUser();

    state.userId = "";
    state.name = "";
    state.email = "";
    state.profilePic = "";
    state.role = "";
    state.isLoggedIn = false;
  },
};
