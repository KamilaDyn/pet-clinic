import { ReactElement, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Home, Services, SignIn, SignUp, Staff } from 'pages';
import { useUser } from 'pages/SignIn/user/useUser';
import { AuthContext } from 'context/user-context';

export function AppRoutes(): ReactElement {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/services' Component={Services} />
      <Route path='/staff' Component={Staff} />
      <Route path='/sign-in' Component={SignIn} />
      <Route path='sign-up' Component={SignUp} />
    </Routes>
  );
}
