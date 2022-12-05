import { CredentialResponse } from "@react-oauth/google";
import { UseMutationResult } from "@tanstack/react-query";
import { useLoginUser } from "features/auth/hooks/api/useLoginUser";

import { auth } from "core/store/auth/reducer/auth.reducer";
import { IAuthResponse, ILogin } from "features/auth/types/IAuth";

import { addNotification } from "core/store/toast/reducer/toast.reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLogin = (isLogin: boolean) => {
  const dispatch = useDispatch();

  const {
    mutate: loginMutate,
    data: loginData,
  }: UseMutationResult<IAuthResponse, Error, ILogin> = useLoginUser({});

  useEffect(() => {
    if (loginData) {
      dispatch(auth());
      dispatch(
        addNotification({
          type: "Success",
          message: loginData?.message,
        })
      );
    }
  }, [loginData]);

  const handleLogin = async (response: CredentialResponse) => {
    const formValues = {
      credential: response.credential,
    };

    loginMutate(formValues);
  };

  return { handleLogin };
};

export default useLogin;
