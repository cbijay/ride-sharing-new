import { ILogin } from "../types/IAuth";

export const login = async ({ credential }: ILogin) => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL!}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        credential: credential,
      }),
    }
  );

  return response.json();
};
