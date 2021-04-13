import formatShortDate from './formatShortDate';
import formatAMPM from './formatAMPM';

function getDayBefore(arg) {
  if (arg === undefined) return '';

  const params = arg.split('T');

  const date = new Date(params[0]);
  const dayBefore =
    date.getFullYear() +
    '-' +
    (date.getMonth() + 1) +
    '-' +
    (date.getDate() - 1);

  return `${formatShortDate(dayBefore)} - ${formatAMPM(params[1]).format}`;
}

function getDiffDates(argOne, argTwo) {
  const dateIn = new Date(argOne);
  const dateOut = new Date(argTwo);

  const diffTime = dateOut.getTime() - dateIn.getTime();
  const diffDays = Math.abs(Math.floor(diffTime / (1000 * 3600 * 24)));

  return diffDays;
}

function getTodayDateTime() {
  const today = new Date();

  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  return date + ' ' + time;
}

function changeSelectedRawHour(raw, selected) {
  if (raw !== undefined && selected !== undefined) {
    const date = JSON.parse(raw).toString();

    if (date.includes('T')) {
      const splited = date.split('T');
      return `${splited[0]}T${selected}:00.000Z`;
    }
  }
  return '00:00';
}

function formatSimpleFullDate(arg) {
  if (arg === undefined) return '';

  const localDate = new Date(arg).toLocaleString('es-CO', {
    timeZone: 'America/Bogota',
    hour12: false,
  });

  const splited = localDate.split(',');

  let date = splited[0].split('/').reverse().join('-');
  date = formatShortDate(date, 1);

  let hour = splited[1].slice(0, splited[1].length - 3).trim();
  hour = formatAMPM(hour).format;

  return `${date} - ${hour}`;
}

function formatCompoundFullDate({ checkin, checkout }) {
  const paramsIn = checkin.split('T');
  const paramsOut = checkout.split('T');

  return {
    raw: { start: checkin, end: checkout },
    format: {
      startDate: formatShortDate(paramsIn[0]),
      endDate: formatShortDate(paramsOut[0]),
      startHour: formatAMPM(paramsIn[1]).format,
      endHour: formatAMPM(paramsOut[1]).format,
    },
  };
}

export {
  getDayBefore,
  getDiffDates,
  getTodayDateTime,
  changeSelectedRawHour,
  formatSimpleFullDate,
  formatCompoundFullDate,
};
