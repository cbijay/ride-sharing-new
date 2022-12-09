import api from "core/lib/api";
import { IAuthResponse, ILogin } from "../types/IAuthResponse";

export const login = async ({ credential }: ILogin) => {
  const response: IAuthResponse = await api.post(
    `${process.env.REACT_APP_BASE_URL!}/auth/login`,
    {
      credential: credential,
    }
  );

  return response;
};
