import { axiosInstance } from '@/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { setTokenUser } from '@/user-storage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/react-query/constant';
import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useLoginData } from './AuthContext';

import { User } from '@shared/types';
import { useUser } from '@/common/user/useUser';

type UserResponse = {
  token: string;
  name: string;
  id: string;
};
type ErrorResponse = {
  message: string;
};
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuth() {
  const { setAlert, setLoginData, clearLoginData } = useLoginData();
  const { updateUser, clearUser } = useUser();
  async function authServerCall(
    urlEndpoint: string,
    username: string,
    password: string
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> =
        await axiosInstance({
          url: urlEndpoint,
          method: 'POST',
          data: { username, password },
          headers: { 'Content-Type': 'application/json' },
        });

      if (status === 400) {
        const title = 'message' in data ? data.message : 'Unauthorized';
        setAlert({ title: title, type: 'danger' });
        return;
      }

      if ('id' in data && 'token' in data) {
        console.log('data', data);
      }

      if (status === 200 && 'id' in data && 'token' in data) {
        updateUser(data);
        setLoginData({ userId: data.id, userToken: data.token });
        setAlert(null);
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) &&
        errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : 'server error';
      setAlert({ title: title, type: 'danger' });
    }
  }
  async function signin(email: string, password: string): Promise<void> {
    authServerCall('/login', email, password);
  }

  function signout(): void {
    // clear user from stored user data
    clearUser();
    clearLoginData();
    setAlert({
      title: 'Logged out!',
      type: 'success',
    });
  }

  //   const { mutate: signInMutation } = useMutation(
  //     ({ email, password }: { email: string; password: string }) =>
  //       signIn(email, password),
  //     {
  //       onSuccess: (data) => {
  //         queryClient.setQueryData([QueryKeys.user], data);

  //         setTokenUser(data?.token);
  //         navigate("/services");
  //       },
  //       onError: (error) => {
  //         console.log(error);
  //       },
  //     }
  //   );

  return { signin, signout };
}
