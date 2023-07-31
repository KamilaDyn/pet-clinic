import { BrowserRouter as Router, Link } from "react-router-dom";
import { AppRoutes } from "./Routes";
import Navbar from "./Navbar";
import Theme from "theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "react-query/queryClient";
function App() {
  return (
    <Theme>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <AppRoutes />
        </Router>
      </QueryClientProvider>
    </Theme>
  );
}

export default App;
