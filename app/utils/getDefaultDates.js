import addDays from './addDays';
import formatAMPM from './formatAMPM';
import formatShortDate from './formatShortDate';

export default function getDefaultDates() {
  const today = new Date();
  const upcoming = addDays(today, 2);
  const time = `${today.getHours() + 1}:${today.getMinutes()}`;

  const res = {
    raw: { start: today, end: upcoming },
    format: {
      startDate: formatShortDate(today),
      endDate: formatShortDate(upcoming),
      startHour: formatAMPM(time).format,
      endHour: formatAMPM(time).format,
    },
  };

  return res;
}
