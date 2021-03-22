export default function addDays(date, days) {
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}
