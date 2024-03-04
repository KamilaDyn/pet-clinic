import appointments from '../../db/appointments';
import { Appointment, NewAppointment } from '../types/appointments';
import { v1 as uuid } from 'uuid';

const id = uuid();

const appointmentsData: Appointment[] = appointments;
const getAppointments = (): Appointment[] => {
  return appointmentsData;
};

const findAppointmentById = (id: string): Appointment | undefined => {
  const appointment = appointments.find((appointment) => appointment.id === id);
  return appointment;
};
const addAppointment = (appointment: NewAppointment) => {
  const newAppointment = {
    id: id,
    ...appointment,
  };
  console.log(newAppointment);

  if (appointment) {
    appointments.push(newAppointment);
    return newAppointment;
  }
  return null;
};

const deleteAppointment = (id: string) => {
  const appointment = appointments.find(
    (appointment) => String(appointment.id) === id
  );
  console.log(appointment);

  if (appointment) {
    appointments.filter((appoitment) => appoitment.id !== id);
    return appointments;
  }
  return null;
};

export default {
  getAppointments,
  findAppointmentById,
  addAppointment,
  deleteAppointment,
};
