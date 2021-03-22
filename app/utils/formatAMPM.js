export default function formatAMPM(date) {
  const arr = date.split(':');
  const res = {
    raw: date,
    format: { hours: arr[0], minutes: arr[1], range: 'AM' },
  };

  if (arr[0] >= '12') {
    res.format.hours = (arr[0] % 12).toString();
    if (res.format.hours.length === 1) {
      res.format.hours = '0' + res.format.hours;
    }
    res.format.range = 'PM';
  }
  if (arr[0] === '12') {
    res.format.hours = '12';
  }
  if (arr[0] === '00') {
    res.format.hours = '12';
  }
  if (arr[1].length === 1) {
    res.format.minutes = '0' + res.format.minutes;
  }
  return res;
}
