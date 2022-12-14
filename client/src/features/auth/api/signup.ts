import api from "core/lib/api";
import { IAuthResponse, ISignup } from "features/auth/types/IAuthResponse";

export const signup = async ({ credential, lat, long }: ISignup) => {
  const response: IAuthResponse = await api.post(
    `${process.env.REACT_APP_BASE_URL}/auth/signup`,
    {
      credential: credential,
      lat: lat,
      long: long,
    }
  );

  return response;
};
