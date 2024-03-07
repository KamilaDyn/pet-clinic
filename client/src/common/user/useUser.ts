import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import { User } from '@shared/types';

import { useLoginData } from '@/auth/AuthContext';
import { axiosInstance, getJWTHeader } from '@/axiosInstance';
import { QueryKeys } from '@/react-query/constant';
import { generateUserKey } from '@/react-query/key-factories';

// query function
async function getUser(userId: string, token: string) {
  const { data }: AxiosResponse<User> = await axiosInstance.get(
    `/users/${userId}`,
    {
      headers: getJWTHeader(token),
    }
  );

  return data;
}

export function useUser() {
  const queryClient = useQueryClient();

  // get details on the userId
  const { userId, userToken } = useLoginData();

  // call useQuery to update user data from server
  const { data: user } = useQuery<User>({
    enabled: !!userId,
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  // meant to be called from useAuth
  function updateUser(newUser: User): void {
    queryClient.setQueryData(
      generateUserKey(newUser.id, newUser.token),
      newUser
    );
  }

  // meant to be called from useAuth
  function clearUser() {
    // remove user profile data
    queryClient.removeQueries({ queryKey: [QueryKeys.user] });

    // remove user appointments data
    // queryClient.removeQueries({
    //   queryKey: [QueryKeys.appointments, QueryKeys.user],
    // });
  }

  return { user, updateUser, clearUser };
}
