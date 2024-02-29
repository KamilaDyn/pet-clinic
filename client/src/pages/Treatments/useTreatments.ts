import { axiosInstance } from '@/axiosInstance';
import { QueryKeys } from '@/react-query/constant';
import { Treatment } from '@shared/types';
import { useQuery } from '@tanstack/react-query';

const getTreatments = async (): Promise<Treatment> => {
  const { data } = await axiosInstance.get('/treatments');
  return data;
};
export const useTreatments = () => {
  const fallback: Treatment[] = [];

  const { data = fallback } = useQuery({
    queryKey: [QueryKeys.treatments],
    queryFn: getTreatments,
  });

  return data;
};
