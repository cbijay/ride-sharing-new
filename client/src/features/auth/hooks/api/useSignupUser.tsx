import { useMutation } from "@tanstack/react-query";
import { setCookie } from "core/lib/cookie";

import { signup } from "features/auth/api/signup";
import { IAuthResponse, ISignup } from "features/auth/types/IAuth";

export const useSignupUser = ({ onSuccess, onError }: any) => {
  return useMutation<IAuthResponse, Error, ISignup>(
    ["signup"],
    ({ credential, lat, long }) => signup({ credential, lat, long }),
    {
      onSuccess: (data, variables) => {
        if (data) setCookie(data?.accessToken);

        onSuccess && onSuccess(data, variables);
      },
      onError: (error: Error) => {
        onError && onError(error);
      },
    }
  );
};
