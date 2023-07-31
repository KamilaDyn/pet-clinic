import { QueryKeys } from "react-query/constant";
import { axiosInstance } from "axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { Services } from "../../../../shared/types";

async function getServices(): Promise<Services[]> {
  const { data } = await axiosInstance.get("/api/services");
  return data;
}

export function useServices(): Services[] {
  const fallback: [] = [];
  const { data = fallback } = useQuery({
    queryKey: [QueryKeys.services],
    queryFn: getServices,
  });
  return data;
}
