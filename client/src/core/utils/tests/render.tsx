import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import { store } from "core/store";
import { createTestQueryClient } from "core/utils/tests/client";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

export const renderWithProvider = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();

  const { rerender, ...result } = render(
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
          <Router>{ui}</Router>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <Provider store={store}>
          <QueryClientProvider client={testQueryClient}>
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            >
              <Router>{rerenderUi}</Router>
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </Provider>
      ),
  };
};
