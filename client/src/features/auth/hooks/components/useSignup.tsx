import { CredentialResponse } from "@react-oauth/google";
import { UseMutationResult } from "@tanstack/react-query";
import { auth } from "core/store/auth/reducer/auth.reducer";
import { IAuthResponse, ISignup } from "features/auth/types/IAuth";

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
  }: UseMutationResult<IAuthResponse, Error, ISignup> = useSignupUser({});

  useEffect(() => {
    signupData && dispatch(auth());
  }, [signupData]);

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
