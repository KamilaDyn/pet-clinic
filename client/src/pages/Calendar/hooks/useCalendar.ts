import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { getMonthOfYear, getNewMonthOfYear } from '../utils/getMonthYear';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/react-query/constant';
import { axiosInstance } from '@/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useLoginData } from '@/auth/AuthContext';
import {
  Appointment as AppointmentType,
  AppointmentDateMap,
  Appointment,
} from '@shared/types';
import { getJWTHeader } from '@/axiosInstance';

async function getAppointment(
  year: string,
  month: string,
  token: string
): Promise<Appointment[]> {
  const { data } = await axiosInstance.get(`/appointments/${year}/${month}`, {
    headers: getJWTHeader(token),
  });

  return data;
}

export const useCalendar = () => {
  const currentMonthOfYear = getMonthOfYear(dayjs());
  const { userId, userToken } = useLoginData();
  const [monthYear, setMonthOfYear] = useState(currentMonthOfYear);
  const [showAll, setShowAll] = useState(true);

  const selectFn = useCallback(
    (data: Appointment[], showAllEl: boolean) => {
      const availableAppointments = data.filter(
        (appointment) => !appointment.reserved
      );
      if (showAllEl) return data;
      return availableAppointments;
    },
    [userId]
  );

  function updateMonthOfYear(monthIncrement: number): void {
    setMonthOfYear((prevData) => getNewMonthOfYear(prevData, monthIncrement));
  }

  // prefetch 5min
  const queryClient = useQueryClient();
  useEffect(() => {
    const nextMonthOfYear = getNewMonthOfYear(monthYear, 1);

    queryClient.prefetchQuery({
      queryKey: [
        QueryKeys.appointments,
        nextMonthOfYear.year,
        nextMonthOfYear.month,
      ],
      queryFn: () =>
        getAppointment(nextMonthOfYear.year, nextMonthOfYear.month, userToken),
      ...{ staleTime: 0, gcTime: 30000 },
    });
  }, [queryClient, monthYear]);

  const fallback: Appointment[] | [] = [];

  const { data: appointments = fallback } = useQuery({
    queryKey: [QueryKeys.appointments, monthYear.year, monthYear.month],
    queryFn: () => getAppointment(monthYear.year, monthYear.month, userToken),
    select: (data) => selectFn(data, showAll),
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
    ...{ staleTime: 0, gcTime: 30000 },
  });

  return { appointments, monthYear, updateMonthOfYear, showAll, setShowAll };
};
