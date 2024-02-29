import { axiosInstance } from '@/axiosInstance';
import { QueryKeys } from '@/react-query/constant';
import { Staff } from '@shared/types';
import { useQuery } from '@tanstack/react-query';

const getStaff = async (): Promise<Staff[]> => {
  const { data } = await axiosInstance.get('/staff');
  return data;
};
export const useStaff = () => {
  const fallback: Staff[] = [];

  const { data: staff = fallback } = useQuery({
    queryKey: [QueryKeys.staff],
    queryFn: getStaff,
  });

  return { staff };
};
