import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './Routes';
import Navbar from './Navbar';
import Theme from 'theme';
import { queryClient } from 'react-query/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthContextProvider from 'context/user-context';

function App() {
  // const isDevelopmentEnv = process.env.NODE_ENV === "development";

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Theme>
          <Router>
            <Navbar />
            <AppRoutes />
          </Router>
        </Theme>
      </AuthContextProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
