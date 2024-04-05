import { useUser } from '@/common/user/useUser';
import type { User } from '@shared/types';
import jsonpatch from 'fast-json-patch';
import { axiosInstance, getJWTHeader } from '@/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoginData } from '@/auth/AuthContext';
import { QueryKeys } from '@/react-query/constant';
// for when we need a server function

export const MUTATION_KEY = 'edit-user';

async function patchUserOnServer(
  newData: User | null,
  originalData: User | undefined
): Promise<User | null> {
  if (!newData || !originalData) return null;
  // create a patch for the difference between newData and originalData
  const patch = jsonpatch.compare(originalData, newData);

  // send patched data to the server
  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token),
    }
  );
  return data.user;
}

export const useInfoUser = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { setAlert } = useLoginData();

  const { mutate: editUser } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (newData: User) => patchUserOnServer(newData, user),
    onSuccess: () => {
      setAlert({ title: 'User updated', type: 'success' });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [QueryKeys.user] });
    },
  });

  return editUser;
};
