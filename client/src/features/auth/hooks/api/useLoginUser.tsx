import { useMutation } from "@tanstack/react-query";
import { setCookie } from "core/lib/cookie";

import { login } from "features/auth/api/login";
import { IAuthResponse, ILogin } from "features/auth/types/IAuthResponse";

export const useLoginUser = ({ onSuccess, onError }: any) => {
  return useMutation<IAuthResponse, Error, ILogin>(
    ["login"],
    ({ credential }) => login({ credential }),
    {
      onSuccess: (data, variables) => {
        if (data) setCookie(data?.accessToken);

        onSuccess && onSuccess(data, variables);
      },
      onError: (error: Error, _variables, _context) => {
        onError && onError(error);
      },
    }
  );
};
