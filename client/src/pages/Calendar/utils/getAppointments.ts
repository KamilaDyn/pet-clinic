import { AppointmentDateMap, Appointment } from '@shared/types';
import dayjs from 'dayjs';

export const appointmentInPast = (appointmentData: Appointment): boolean => {
  const now = dayjs();
  return dayjs(appointmentData.dateTime) < now;
};

export function getAvailableAppointments(
  appointments: AppointmentDateMap,
  userId: string | null
) {
  const filteredAppointments = { ...appointments };

  Object.keys(filteredAppointments).forEach((date) => {
    const dateNumber = Number(date);
    filteredAppointments[dateNumber] = filteredAppointments[dateNumber].filter(
      (appointment: Appointment) =>
        (!appointment.userId || appointment.userId === userId) &&
        !appointmentInPast(appointment)
    );
  });
  return filteredAppointments;
}
