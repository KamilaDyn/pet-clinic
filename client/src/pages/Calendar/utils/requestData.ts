import { AppointmentDateMap } from '@shared/types';

import { getJWTHeader } from '@/axiosInstance';
import { axiosInstance } from '@/axiosInstance';
export async function getAppointment(
  year: string,
  month: string,
  token: string
): Promise<AppointmentDateMap> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`, {
    headers: getJWTHeader(token),
  });

  return data;
}
