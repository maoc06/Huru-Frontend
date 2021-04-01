export default function formatExpiryDate(valueInput) {
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
}
