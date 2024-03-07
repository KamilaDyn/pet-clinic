import { useCalendar } from './useCalendar';
import dayjs from 'dayjs';

import { AvailableAppointmentsCheckbox, Header } from './components';
import type { Appointment as AppointmentType } from '@shared/types';

interface DayProps {
  date: number;
  gridCol?: string;
  appointments?: AppointmentType[];
}
const Day = ({ date, gridCol, appointments = [] }: DayProps) => {
  // const appointmentHour = dayjs(appointments?.dateTime).format('h a');

  return (
    <div
      className={`relative h-36 rounded-md shadow-md w-full ${gridCol || ''} `}
    >
      <div className='absolute right-0 top-0'> {date}</div>
      {!!appointments?.length &&
        appointments.map(({ id, treatmentName, dateTime }) => (
          <div className='' key={id}>
            <span>{dayjs(dateTime).format('h a')}</span>
            <h2>{treatmentName}</h2>
            <h2></h2>
          </div>
        ))}
    </div>
  );
};

const Calendar = () => {
  const { appointments, monthYear, updateMonthOfYear, showAll, setShowAll } =
    useCalendar();

  const filterObjectsByDay = (
    inputArray: AppointmentType[],
    targetDay: number
  ) => {
    return inputArray.filter((item) => {
      const itemDate = new Date(item.dateTime);
      return itemDate.getUTCDate() === targetDay;
    });
  };

  return (
    <div className='container '>
      <AvailableAppointmentsCheckbox
        setShowAll={setShowAll}
        showAll={showAll}
      />
      <Header updateMonth={updateMonthOfYear}>
        <h1>
          {monthYear.monthName} {monthYear.year}
        </h1>
      </Header>
      <div className='calendar pt-16 grid gap-5 mx-2 grid-cols-7'>
        <Day
          date={1}
          gridCol={`col-start-${monthYear.firstDayOfWeek + 1}`}
          appointments={appointments[1]}
        />
        {[...Array(monthYear.endDate)].map((_, i) =>
          i > 0 ? (
            <Day
              appointments={filterObjectsByDay(appointments, i + 1)}
              date={i + 1}
              key={i}
            />
          ) : null
        )}
      </div>
    </div>
  );
};
export default Calendar;
