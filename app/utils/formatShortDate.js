export default function formatShortDate(date) {
  const day = date.getDate();
  const shortMonth = date.toLocaleString('default', { month: 'short' });

  // return `${day} ${shortMonth.slice(0, -1)}`;
  return `${day} ${shortMonth.replace(/[.]/, '')}`;
}
