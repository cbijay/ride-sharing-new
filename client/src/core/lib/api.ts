import Axios from "axios";
import { getCookie, removeUser } from "core/lib/cookie";

const api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL!,
  timeout: 20000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

//add token to all request
api.interceptors.request.use(function (config: any) {
  const token: any = getCookie();

  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      removeUser();
    } else if (error.response && error.response.data) {
      if (error.response.data) {
        return Promise.reject(error.response.data);
      } else return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        message: "Some unusual error occured, please try again",
      });
    }
  }
);

export default api;
