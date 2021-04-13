export default function formatAMPM(date) {
  const arr = date.split(':');
  const res = {
    raw: date,
    format: { hours: arr[0], minutes: arr[1], range: 'AM' },
  };

  const hour = parseInt(arr[0]);
  const minutes = arr[1];

  if (hour >= 12) {
    res.format.hours = (arr[0] % 12).toString();
    if (res.format.hours.length === 1) {
      res.format.hours = '0' + res.format.hours;
    }
    res.format.range = 'PM';
  }
  if (hour === 12) {
    res.format.hours = '12';
  }
  if (hour === 0) {
    res.format.hours = '12';
  }
  if (minutes.length === 1) {
    res.format.minutes = '0' + res.format.minutes;
  }
  return {
    raw: date,
    format: `${res.format.hours}:${res.format.minutes} ${res.format.range}`,
  };
}
