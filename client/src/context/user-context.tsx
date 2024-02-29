import { useState } from 'react';
import { createContext } from 'react';
import { User } from '../../../shared/types';
interface UserContext {
  user: User | null;
  getCurrentUser: (user: User | null) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<UserContext>({
  user: null,
  getCurrentUser: () => {},
  logoutUser: () => {},
});

function AuthContextProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);

  function getCurrentUser(user: User | null) {
    setUser(user);
  }
  function logoutUser() {
    setUser(null);
  }
  const value = {
    user: user,
    getCurrentUser: getCurrentUser,
    logoutUser: logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
