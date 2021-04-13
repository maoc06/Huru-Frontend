export default function formatShortDate(arg, deltaDate = 0) {
  const date = new Date(arg);

  const dateBase = new Date(
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - deltaDate}`
  );

  const day = dateBase.getDate() + 1;
  const shortMonth = dateBase.toLocaleString('default', { month: 'short' });

  // return `${day} ${shortMonth.slice(0, -1)}`;
  return `${day} ${shortMonth.replace(/[.]/, '')}`;
}
