import { QueryClient } from "@tanstack/react-query";
import { getUser } from "core/lib/cookie";
import { auth } from "core/store/auth/reducer/auth.reducer";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useAppProvider = () => {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
  const user: any = getUser();
  const dispatch = useDispatch();

  useEffect(() => {
    user && dispatch(auth(user));
  }, [user]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: twentyFourHoursInMs,
      },
    },
  });

  return { queryClient };
};

export default useAppProvider;
