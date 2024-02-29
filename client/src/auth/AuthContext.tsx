import {
  Dispatch,
  createContext,
  useContext,
  useState,
  SetStateAction,
} from 'react';

import { getTokenUser, setTokenUser, clearTokenUser } from '@/user-storage';

import { LoginData } from './types';
type Alert = {
  title: string;
  type: 'danger' | 'warning' | 'success' | null;
};

type AuthContextValue = {
  userId: number;
  userToken: string;
  setLoginData: (loginData: LoginData) => void;
  clearLoginData: () => void;
  alert: Alert | null;
  setAlert: Dispatch<SetStateAction<Alert | null>>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
  const authValue = useContext(AuthContext);
  if (!authValue) {
    throw new Error(
      'Error! AuthContext called from outside the AuthContextProvider'
    );
  }

  return authValue;
};

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [loginData, setLoginDataRaw] = useState<LoginData | null>(() =>
    getTokenUser()
  );
  const [alert, setAlert] = useState<Alert | null>(null);

  // can't destructure since loginData might be null
  const userId = loginData?.userId as number;
  const userToken = loginData?.userToken as string;

  const setLoginData = ({ userId, userToken }: LoginData) => {
    setLoginDataRaw({ userId, userToken });
    setTokenUser({ userId, userToken });
  };

  const clearLoginData = () => {
    setLoginDataRaw(null);
    clearTokenUser();
  };

  const providerValue = {
    userId,
    userToken,
    clearLoginData,
    setLoginData,
    alert,
    setAlert,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};
