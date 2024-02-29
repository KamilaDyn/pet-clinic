import dayjs from 'dayjs';

export interface MonthYear {
  startDate: dayjs.Dayjs;
  firstDayOfWeek: number;
  endDate: number;
  monthName: string;
  month: string;
  year: string;
}
