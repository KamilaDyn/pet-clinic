import { Dispatch, SetStateAction } from 'react';
interface AvailableAppointmentsCheckboxProps {
  showAll: boolean;
  setShowAll: Dispatch<SetStateAction<boolean>>;
}
const AvailableAppointmentsCheckbox = ({
  showAll,
  setShowAll,
}: AvailableAppointmentsCheckboxProps) => {
  return (
    <div className='flex w-full  justify-end pt-3 items-center'>
      <label className='text-red-950' htmlFor='allAppointments'>
        Show all appointments
      </label>
      <input
        className='h-4 w-4 ml-2'
        type='checkbox'
        name='allAppointments'
        checked={showAll}
        onChange={() => setShowAll((prevValue) => !prevValue)}
      />
    </div>
  );
};

export default AvailableAppointmentsCheckbox;
