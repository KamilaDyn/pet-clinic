import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useLoginData } from '@/auth/AuthContext';
import { axiosInstance } from '@/axiosInstance';
import { getJWTHeader } from '@/axiosInstance';
import { QueryKeys } from '@/react-query/constant';
import { Appointment } from '@shared/types';
import { getMonthOfYear, getNewMonthOfYear } from '../utils/getMonthYear';
import { getAppointment } from '../utils/requestData';
async function patchAppointmentOnServer(
  userId: string,
  token: string,
  appointmentId: string | undefined
): Promise<Appointment | null> {
  // send patched data to the server
  const { data } = await axiosInstance.put(
    `/appointments/${appointmentId}`,
    { user: userId },
    {
      headers: getJWTHeader(token),
    }
  );
  return data.user;
}

async function patchUserOnServer(
  userId: string,
  token: string,
  appointmentId: string | undefined
): Promise<Appointment | null> {
  // send patched data to the server
  const { data } = await axiosInstance.put(
    `/users/${userId}`,
    { appointmentsId: appointmentId },
    {
      headers: getJWTHeader(token),
    }
  );

  return data.user;
}

export const useAppointment = () => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const queryClient = useQueryClient();
  const { userId, userToken, setAlert, toggleModal } = useLoginData();

  const getCurrentAppointment = (appointmentData: Appointment | null) => {
    setAppointment(appointmentData);
  };

  useEffect(() => {
    if (appointment) {
      toggleModal();
    }
  }, [appointment]);

  const { mutate: addAppointment } = useMutation({
    mutationKey: ['edit-user', 'edit-appointment'],
    mutationFn: async (appointmentData: Appointment | null) => {
      await patchUserOnServer(userId, userToken, appointmentData?.id);
      await patchAppointmentOnServer(userId, userToken, appointmentData?.id);
    },

    onSuccess: (error) => {
      setAlert({ title: 'User updated', type: 'success' });
      toggleModal();
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: () => {
      const monthYear = getMonthOfYear(dayjs(appointment?.dateTime));
      const nextMonthOfYear = getNewMonthOfYear(monthYear, 1);
      const currentMonthOfYear = getMonthOfYear(dayjs(appointment?.dateTime));

      queryClient.invalidateQueries({
        queryKey: [
          QueryKeys.appointments,
          nextMonthOfYear.year,
          currentMonthOfYear.month,
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.user, userId],
      });
    },
  });

  return {
    getCurrentAppointment,
    addAppointment,
    appointment,
  };
};
