import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToastContainer from "core/components/toast/container/ToastContainer";

import useAppProvider from "core/hooks/provider/useAppProvider";

import { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const { queryClient } = useAppProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
        <ToastContainer variant="top_right" />
        {children}
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;
