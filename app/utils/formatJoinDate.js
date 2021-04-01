export default function formatJoinDate(arg) {
  const date = new Date(arg);

  let month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  month = month.toString().charAt(0).toUpperCase() + month.toString().slice(1);

  return `${month} ${year}`;
}
