import { QueryKeys } from "react-query/constant";
import { axiosInstance } from "axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Staff } from "../../../../shared/types";

async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get("/api/staff");
  return data;
}

export function useStaff(): Staff[] {
  const fallback: [] = [];
  const { data = fallback } = useQuery({
    queryKey: [QueryKeys.staff],
    queryFn: getStaff,
  });
  return data;
}
