import type { Appointment as AppointmentType } from '@shared/types';

export const getDayName = (startDay: string, index: number) => {
  const totalDays = 31;
  const daysArray = [];

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const startIndex = daysOfWeek.indexOf(startDay);

  for (let i = 1; i <= totalDays; i++) {
    const dayIndex = (startIndex + i - 1) % 7;
    const dayName = daysOfWeek[dayIndex];
    const formattedDay =
      i === 1 ? `${dayName.substring(0, 2)}, ${i}` : `${dayName}, ${i}`;
    daysArray.push(formattedDay);
  }
  return daysArray[index - 1];
};
export const filterObjectsByDay = (
  inputArray: AppointmentType[],
  targetDay: number
) => {
  return inputArray.filter((item) => {
    const itemDate = new Date(item.dateTime);
    return itemDate.getUTCDate() === targetDay;
  });
};
