import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { Home, Services, SignIn, SignUp, Staff } from "pages";

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/services" Component={Services} />
      <Route path="/staff" Component={Staff} />
      <Route path="/sign-in" Component={SignIn} />
      <Route path="sign-up" Component={SignUp} />
    </Routes>
  );
}
