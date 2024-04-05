import { Subtitle, Title } from '@/common/atoms';
import dayjs from 'dayjs';
import { useUser } from '@/common/user/useUser';

const UserAppointments = () => {
  const { user } = useUser();
  const upcomingAppointment = user?.appointments?.filter(
    (appointment) => dayjs(appointment.dateTime) >= dayjs(new Date())
  );
  const pastAppointment = user?.appointments?.filter(
    (appointment) => dayjs(appointment.dateTime) < dayjs(new Date())
  );
  return (
    <div className='container mb-16 '>
      <Title>Your Appointments</Title>

      <div className='flex justify-center align-items-center gap-5'>
        {!!upcomingAppointment?.length && (
          <div className='appointments'>
            <Subtitle>Upcoming appointment</Subtitle>
            {pastAppointment ? (
              <ul>
                {upcomingAppointment.map(({ treatmentName, dateTime, id }) => (
                  <li key={id} id={id}>
                    Appointment name: {treatmentName}{' '}
                    <span>
                      time: {dayjs(dateTime).format('DD-MM-YYYY h a')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              'none'
            )}
          </div>
        )}

        {!!pastAppointment?.length && (
          <div className='appointments'>
            <Subtitle>Past appointment</Subtitle>
            {pastAppointment ? (
              <ul>
                {pastAppointment.map(({ treatmentName, dateTime, id }) => (
                  <li key={id} id={id}>
                    Appointment name: {treatmentName}{' '}
                    <span>
                      time: {dayjs(dateTime).format('DD-MM-YYYY h a')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              'none'
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAppointments;
