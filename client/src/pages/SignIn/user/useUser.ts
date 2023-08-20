import { useQueryClient, useQuery } from "@tanstack/react-query";
import { User } from "../../../../../shared/types";
import { axiosInstance, getJWTHeader } from "axiosInstance";
import { useEffect, useContext } from "react";

import { QueryKeys } from "react-query/constant";
import { clearTokenUser, getTokenUser } from "user-storage";
import { AuthContext } from "context/user-context";
interface LoggedUser {
  email: string;
  id: number;
  iat: number;
}

async function getUser(): Promise<LoggedUser | null> {
  const token = getTokenUser();
  if (token) {
    const config = { headers: getJWTHeader(token) };

    const { data } = await axiosInstance.get("/api/me", config);
    return data;
  }
  return null;
}

export function useUser() {
  const queryClient = useQueryClient();
  const { getCurrentUser } = useContext(AuthContext);

  function loginUser(newUser: User): void {
    queryClient.setQueryData([QueryKeys.me], newUser);
  }
  function logoutUser(): void {
    clearTokenUser();
    queryClient.removeQueries({ queryKey: [QueryKeys.user] });
    getCurrentUser(null);
  }

  const { data, isLoading } = useQuery<User | null>(
    [QueryKeys.user],
    async (): Promise<User | null> => getUser()
  );
  useEffect(() => {
    if (data && !isLoading) {
      getCurrentUser(data);
    }
  }, [data, isLoading, getCurrentUser]);

  return { loginUser, logoutUser, isLoading };
}
