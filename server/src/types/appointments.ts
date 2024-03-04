export interface Appointment {
  id: number | string;
  dateTime: string;
  treatmentName: string;
  user?: number | string;
}

export interface NewAppointment {
  dateTime: string;
  treatmentName: string;
}
