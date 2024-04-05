import dayjs from 'dayjs';
import { Appointment } from '@shared/types';
import { useLoginData } from '@/auth/AuthContext';
import { useAppointment } from '@/pages/Calendar/hooks/useAppointment';

interface InfoModalProps {
  appointment: Appointment;
}
const InfoModal = ({ appointment }: InfoModalProps) => {
  const { openModal } = useLoginData();

  if (!appointment) {
    return null;
  }

  if (!openModal) return null;
  const { treatmentName, dateTime } = appointment;
  const { addAppointment } = useAppointment();
  const time = dayjs(dateTime).format('h a');
  const { toggleModal } = useLoginData();
  return (
    <div className='absolute top-1/2 left-1/2 translate-y-1/2 translate-x-1/2 w-60 h-60 bg-sky-50 flex flex-col justify-center'>
      <h2 className='text-sky-900'>
        Do you want to register to: {treatmentName} at
        <span className='bold text-red-800'> {time} </span> ?
      </h2>
      <div className='flex gap-2 justify-center mt-5'>
        <button
          onClick={() => addAppointment(appointment)}
          className='bg-sky-600 text-white'
        >
          register me
        </button>
        <button onClick={() => toggleModal()} className='bg-red-500 text-white'>
          cancel
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
