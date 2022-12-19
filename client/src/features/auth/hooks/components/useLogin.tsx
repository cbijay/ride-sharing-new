import { CredentialResponse } from "@react-oauth/google";
import { UseMutationResult } from "@tanstack/react-query";
import { useLoginUser } from "features/auth/hooks/api/useLoginUser";

import { auth } from "core/store/auth/reducer/auth.reducer";
import { addNotification } from "core/store/toast/reducer/toast.reducer";
import { IAuthResponse, ILogin } from "features/auth/types/IAuthResponse";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLogin = () => {
  const dispatch = useDispatch();

  const {
    mutate: loginMutate,
    data: loginData,
    isError,
    error,
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

    if (isError) {
      dispatch(
        addNotification({
          type: "Error",
          message: error?.message,
        })
      );
    }
  }, [loginData, isError]);

  const handleLogin = async (response: CredentialResponse) => {
    const formValues = {
      credential: response.credential,
    };

    loginMutate(formValues);
  };

  return { handleLogin };
};

export default useLogin;
