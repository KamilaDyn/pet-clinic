import { ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Services, Staff } from "pages";

export function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/services" Component={Services} />
      <Route path="/staff" Component={Staff} />
    </Routes>
  );
}
