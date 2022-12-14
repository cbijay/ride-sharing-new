import { store } from "core/store";
import { createTestQueryClient } from "core/utils/tests/client";
import { ReactNode } from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

export const createClientWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
      <QueryClientProvider client={testQueryClient}>
        <Router>{children}</Router>
      </QueryClientProvider>
    </Provider>
  );
};
