import AppProvider from "core/providers/AppProvider";
import AppRouter from "core/routes/AppRouter";

import "core/styles/app.scss";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <AppRouter />
      </Router>
    </AppProvider>
  );
};

export default App;
