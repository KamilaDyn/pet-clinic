import { useCalendar } from './hooks/useCalendar';
import { getDayName, filterObjectsByDay } from './utils/getDayName';
import { AvailableAppointmentsCheckbox, Header, Day } from './components';
import { InfoModal } from '@/common/molecules';
import { useAppointment } from './hooks/useAppointment';
import { Appointment } from '@shared/types';

const Calendar = () => {
  const { appointments, monthYear, updateMonthOfYear, showAll, setShowAll } =
    useCalendar();
  const { getCurrentAppointment, appointment } = useAppointment();

  return (
    <div className='relative'>
      <div className='container m-auto '>
        <AvailableAppointmentsCheckbox
          setShowAll={setShowAll}
          showAll={showAll}
        />
        <div className='colors flex justify-end items-end gap-3'>
          <div className='flex items-center gap-3'>
            <div className='box w-4 h-4 bg-red-900'></div> reserved appointment
          </div>
          <div className='flex items-center gap-3'>
            <div className='box w-4 h-4 bg-green-900'></div>available
            appointment
          </div>
          <div className='flex items-center gap-3'>
            <div className='box w-4 h-4 bg-sky-900'></div>your appointment
          </div>
        </div>
        <Header updateMonth={updateMonthOfYear}>
          <h1>
            {monthYear.monthName} {monthYear.year}
          </h1>
        </Header>
        <div className='calendar pt-16 grid gap-5 mx-2 grid-cols-7 '>
          <Day
            getCurrentAppointment={getCurrentAppointment}
            dayName={getDayName(monthYear.dayName, 1)}
            gridCol={`col-start-${
              monthYear.firstDayOfWeek === 0
                ? monthYear.firstDayOfWeek + 1
                : monthYear.firstDayOfWeek
            }`}
            appointments={appointments[1]}
          />
          {[...Array(monthYear.endDate)].map((_, i) =>
            i > 0 ? (
              <Day
                getCurrentAppointment={getCurrentAppointment}
                dayName={getDayName(monthYear.dayName, i + 1)}
                appointments={filterObjectsByDay(appointments, i + 1)}
                key={i}
              />
            ) : null
          )}
        </div>
      </div>
      <InfoModal appointment={appointment as Appointment} />
    </div>
  );
};
export default Calendar;
