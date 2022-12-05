import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const cookieName = "ride_sharing";

export const setCookie = (token: any) => {
  Cookies.set(cookieName, token, { expires: 7 });
};

export const getCookie = () => {
  return Cookies.get(cookieName);
};

export const getUser = () => {
  const token: any = Cookies.get(cookieName);

  if (token) {
    const decodeToken: any = jwtDecode(token);
    const { name, email, userId, role, profilePic } = decodeToken;

    return { isLoggedIn: true, name, email, userId, role, profilePic };
  }
};

export const removeUser = () => {
  Cookies.remove(cookieName);
};
