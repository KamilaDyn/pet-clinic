import { axiosInstance } from "axiosInstance";
import { useNavigate } from "react-router-dom";
import { setTokenUser } from "user-storage";
import { useMutation } from "@tanstack/react-query";
import { QueryKeys } from "react-query/constant";

import { useQueryClient } from "@tanstack/react-query";

interface User {
  email: string;
  token: string;
  id: number;
}

async function signIn(email: string, password: string): Promise<User> {
  const response = await axiosInstance({
    url: "/api/signin",
    method: "POST",
    data: { email, password },
    headers: { "Content-Type": "application/json" },
  });

  return response.data.user;
}
export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signInMutation } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      signIn(email, password),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([QueryKeys.user], data);

        setTokenUser(data?.token);
        navigate("/services");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return { signInMutation };
}
