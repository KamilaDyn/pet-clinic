import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Home,
  SignIn,
  User,
  Staff,
  Treatments,
  Calendar,
  UserAppointment,
} from '@/pages';
import { AuthContextProvider } from './auth/AuthContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryClient } from '@/react-query/queryClient';
import { Header } from './common/molecules';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-w-full min-h-screen container bg-gradient-to-r from-slate-300 to-slate-400'>
        <AuthContextProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/user/:id' element={<User />} />
              <Route path='/staff' element={<Staff />} />
              <Route path='/treatments' element={<Treatments />} />
              <Route path='/calendar' element={<Calendar />} />
              <Route path='/user/appointments' element={<UserAppointment />} />
            </Routes>
          </BrowserRouter>
        </AuthContextProvider>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
