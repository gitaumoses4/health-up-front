import moment from 'moment';
import T from '../../../utils/Translation';

export const currentYear = moment()
  .year();

export const frequencies = [
  {
    name: T.daily,
    value: 'daily',
  },
  {
    name: T.weekly,
    value: 'weekly',
  },
  {
    name: T.monthly,
    value: 'monthly',
  },
  {
    name: T.yearly,
    value: 'yearly',
  },
];
export const weekDays = [
  {
    name: T.monday,
    value: 'monday',
  },
  {
    name: T.tuesday,
    value: 'tuesday',
  },
  {
    name: T.wednesday,
    value: 'wednesday',
  },
  {
    name: T.thursday,
    value: 'thursday',
  },
  {
    name: T.friday,
    value: 'friday',
  },
  {
    name: T.saturday,
    value: 'saturday',
  },
  {
    name: T.sunday,
    value: 'sunday',
  },
];
export const months = [
  {
    name: T.january,
    value: 'january',
  },
  {
    name: T.february,
    value: 'february',
  },
  {
    name: T.march,
    value: 'march',
  },
  {
    name: T.april,
    value: 'april',
  },
  {
    name: T.may,
    value: 'may',
  },
  {
    name: T.june,
    value: 'june',
  },
  {
    name: T.july,
    value: 'july',
  },
  {
    name: T.august,
    value: 'august',
  },
  {
    name: T.september,
    value: 'september',
  },
  {
    name: T.october,
    value: 'october',
  },
  {
    name: T.november,
    value: 'november',
  },
  {
    name: T.december,
    value: 'december',
  },
];
export const ranges = [
  {
    name: T.days,
    value: 'days',
  },
  {
    name: T.weeks,
    value: 'weeks',
  },
  {
    name: T.months,
    value: 'months',
  },
  {
    name: T.years,
    value: 'years',
  },
];
export const monthDays = {
  january: 31,
  february: currentYear % 4 === 0 ? 29 : 28,
  march: 31,
  april: 30,
  may: 31,
  june: 30,
  july: 31,
  august: 31,
  september: 30,
  october: 31,
  november: 30,
  december: 31,
};
export const days = (count = 31) => Array(count)
  .fill(0)
  .map(
    (_, index) => ({
      name: index + 1,
      value: index + 1,
    }),
  );
