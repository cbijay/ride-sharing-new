import { CredentialResponse } from "@react-oauth/google";
import { UseMutationResult } from "@tanstack/react-query";
import { IAuthResponse, ISignup } from "features/auth/types/IAuthResponse";

import { auth } from "core/store/auth/reducer/auth.reducer";
import { addNotification } from "core/store/toast/reducer/toast.reducer";
import { useSignupUser } from "features/auth/hooks/api/useSignupUser";
import useGeoLocation from "features/auth/hooks/components/useGeoLocation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useSignup = () => {
  const { latitude, longitude } = useGeoLocation();
  const dispatch = useDispatch();

  const {
    mutate: signupMutate,
    data: signupData,
    error,
    isError,
  }: UseMutationResult<IAuthResponse, Error, ISignup> = useSignupUser({});

  useEffect(() => {
    if (signupData) {
      dispatch(auth());
      dispatch(
        addNotification({
          type: "Success",
          message: signupData?.message,
        })
      );
    }

    isError &&
      dispatch(
        addNotification({
          type: "Error",
          message: error?.message,
        })
      );
  }, [signupData, isError]);

  const handleSignup = async (response: CredentialResponse) => {
    const formValues = {
      lat: latitude,
      long: longitude,
      credential: response.credential,
    };

    signupMutate(formValues);
  };
  return { handleSignup };
};

export default useSignup;
