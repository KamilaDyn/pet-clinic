import dayjs from 'dayjs';
import type { Appointment as AppointmentType } from '@shared/types';
import { useLoginData } from '@/auth/AuthContext';
import { useEffect, useMemo } from 'react';
interface AppointmentProps {
  getCurrentAppointment: (appointment: AppointmentType | null) => void;
  appointment: AppointmentType;
}

interface DayProps {
  gridCol?: string;
  appointments: AppointmentType[];
  dayName: string;
  getCurrentAppointment: (appointment: AppointmentType | null) => void;
}

const Appointment = ({
  appointment,
  getCurrentAppointment,
}: AppointmentProps) => {
  const { userId } = useLoginData();

  const isReservedByUser = appointment.reserved && appointment.user === userId;
  const isReserver = appointment.reserved && appointment.user !== userId;
  const isReservedClassName = isReservedByUser
    ? 'bg-sky-900 cursor-pointer'
    : isReserver
    ? ' bg-red-900 cursor-not-allowed'
    : ' bg-green-900 cursor-pointer';
  const isDisabled = isReservedByUser ? 'false' : isReserver ? 'true' : 'false';

  return (
    <div
      className={isReservedClassName}
      role='button'
      aria-label='appointment'
      aria-disabled={isDisabled}
      onClick={() => !isReserver && getCurrentAppointment(appointment)}
    >
      <h2>
        <span> {dayjs(appointment.dateTime).format('h a')} </span>
        {appointment.treatmentName}
      </h2>
    </div>
  );
};
const Day = ({
  gridCol,
  appointments,
  dayName,
  getCurrentAppointment,
}: DayProps) => {
  return (
    <div
      className={`relative h-36 rounded-md shadow-md w-full ${gridCol || ''}`}
    >
      <div className='absolute right-0 top-0  text-sky-900'>{dayName}</div>
      <div className='appointments mt-6'>
        {!!appointments?.length &&
          appointments.map((appointment) => (
            <div className='my-1' key={appointment.id}>
              <Appointment
                appointment={appointment}
                getCurrentAppointment={getCurrentAppointment}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Day;
