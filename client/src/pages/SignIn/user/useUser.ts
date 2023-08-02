import { useQueryClient } from "@tanstack/react-query";
import { User } from "../../../../../shared/types";
import { QueryKeys } from "react-query/constant";

export function useUser() {
  const queryClient = useQueryClient();

  function updateUser(newUser: User): void {
    queryClient.setQueryData([QueryKeys.user], newUser);
  }

  return { updateUser };
}
