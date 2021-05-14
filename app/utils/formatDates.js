import { DateTime } from 'luxon';

Date.shortMonths = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

const options = { includeOffset: false, includeZone: false };

const calcYearsOld = ({ birthday }) => {
  const date = DateTime.fromJSDate(new Date(birthday));

  const yearsOld = date.diffNow('years').toObject();

  return Math.floor(Math.abs(yearsOld.years));
};

const convertTo = ({ date, type = 'ISO' }) => {
  let rawDate = '';

  if (type === 'ISO') {
    rawDate = DateTime.fromISO(date);
  } else if (type === 'SQL') {
    rawDate = DateTime.fromSQL(date);
  } else if (type === 'JS') {
    rawDate = DateTime.fromJSDate(date);
  } else {
    return;
  }

  return rawDate;
};

const convertToCompound = ({ dateOne, dateTwo, type = 'ISO' }) => {
  let start = dateOne;
  let end = dateTwo;

  if (type !== 'ISO') {
    start = convertTo({ date: dateOne, type }).toISO();
    end = convertTo({ date: dateTwo, type }).toISO();
  }

  const res = {
    raw: { start, end },
    format: {
      startDate: formatDate({ date: start, type: 'ISO' }),
      endDate: formatDate({ date: end, type: 'ISO' }),
      startHour: formatTime({ date: start, type: 'ISO' }),
      endHour: formatTime({ date: end, type: 'ISO' }),
    },
  };

  return res;
};

const changeSelectedRawHour = (raw, selected) => {
  if (raw !== undefined && selected !== undefined) {
    const date = new Date(raw);
    const splitedTime = selected.split(':');

    date.setHours(parseInt(splitedTime[0]), parseInt(splitedTime[1]));

    return date;
  }
  return '00:00';
};

const defaultDates = () => {
  const today = DateTime.now().plus({ days: 2 }).toSQL(options);
  const upcoming = DateTime.now().plus({ days: 4 }).toSQL(options);

  const res = {
    raw: { start: today, end: upcoming },
    format: {
      startDate: formatDate({ date: today }),
      endDate: formatDate({ date: upcoming }),
      startHour: formatTime({ date: today }),
      endHour: formatTime({ date: upcoming }),
    },
  };

  return res;
};

const diffDays = ({ dateOne, dateTwo, type = 'ISO' }) => {
  const i1 = convertTo({ date: dateOne, type });
  const i2 = convertTo({ date: dateTwo, type });

  const calcDiff = i2.diff(i1, 'days').toObject();

  return Math.floor(Math.abs(calcDiff.days));
};

const formatDate = ({ date, type = 'SQL' }) => {
  const rawDate = convertTo({ date, type });

  const month = rawDate.toLocaleString({ month: 'numeric' });
  const day = rawDate.toLocaleString({ day: '2-digit' });

  return `${day} ${Date.shortMonths[month - 1]}`;
};

const formatTime = ({ date, type = 'SQL' }) => {
  const rawDate = convertTo({ date, type });

  const hours = rawDate.toFormat('hh');
  const minutes = rawDate.toFormat('mm');
  const meridiem = rawDate.toFormat('a');

  return `${hours}:${minutes} ${meridiem}`;
};

const formatMonthYear = (date) => {
  const rawDate = new Date(date);

  let month = rawDate.toLocaleString('default', { month: 'long' });
  const year = rawDate.getFullYear();

  month = month.toString().charAt(0).toUpperCase() + month.toString().slice(1);

  return `${month} ${year}`;
};

const formatMonthDayYear = ({ date, type = 'SQL' }) => {
  const rawDate = convertTo({ date, type });

  const format = rawDate.setLocale('co').toFormat("dd LLL ',' y");

  return `${format}`;
};

const formatFullDate = ({ date, type = 'SQL', outputFormat = 'simple' }) => {
  const formattedDate = formatDate({ date, type });
  const formattedTime = formatTime({ date, type });

  switch (outputFormat) {
    case 'simple':
      return `${formattedDate} - ${formattedTime}`;
    case 'compound':
      return { date: formattedDate, time: formattedTime };
    default:
      return `${formattedDate} - ${formattedTime}`;
  }
};

const formatExpiryDate = (valueInput) => {
  let formatter = valueInput;

  // remove all non digit characters
  let value = valueInput.replace(/\D/g, '');

  if (/^[2-9]$/.test(value)) {
    formatter = `0${value}`;
  }

  if (value.length === 2) {
    formatter = `${value}/`;
  } else if (formatter.length === 2) {
    formatter = `${formatter}/`;
  }

  return formatter;
};

const todayDate = () => DateTime.now().toSQL(options);

const lastDay = ({ days = 1, date, type = 'SQL', outputFormat = 'simple' }) => {
  const rawDate = convertTo({ date, type });

  const lastDate = rawDate.minus({ days }).toISO();

  return formatFullDate({ date: lastDate, type: 'ISO', outputFormat });
};

export {
  calcYearsOld,
  convertTo,
  convertToCompound,
  changeSelectedRawHour,
  defaultDates,
  diffDays,
  formatDate,
  formatFullDate,
  formatTime,
  formatMonthYear,
  formatMonthDayYear,
  formatExpiryDate,
  todayDate,
  lastDay,
};
