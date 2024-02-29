import { useLoginData } from '@/auth/AuthContext';
import { Appointment as AppointmentType } from '@shared/types';
import dayjs from 'dayjs';

const Appointment = ({
  appointmentData,
}: {
  appointmentData?: AppointmentType;
}) => {
  const { userId } = useLoginData();

  const appointmentHour = dayjs(appointmentData?.dateTime).format('h a');

  console.log(appointmentHour);

  return (
    <div className='container'>
      <ul>
        <li>
          <span>{appointmentHour}</span>
        </li>
      </ul>
    </div>
  );
};

export default Appointment;
