import { BrowserRouter as Router, Link } from "react-router-dom";
import { AppRoutes } from "./Routes";
import Navbar from "./Navbar";
import Theme from "theme";
import { queryClient } from "react-query/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const isDevelopmentEnv = process.env.NODE_ENV === "development";

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Theme>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </Theme>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
