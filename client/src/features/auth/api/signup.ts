import { ISignup } from "../types/IAuth";

export const signup = async ({ credential, lat, long }: ISignup) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL!}/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential: credential,
        lat: lat,
        long: long,
      }),
    }
  );

  return response.json();
};
