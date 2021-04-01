export default function formatCreditCardNumber(valueInput) {
  let formatter = { formattedValue: '', maxLength: '', brand: '' };

  // remove all non digit characters
  let value = valueInput.replace(/\D/g, '');

  // american express, 15 digits
  if (/^3[47]\d{0,13}$/.test(value)) {
    formatter.formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{6})/, '$1 $2 ');

    formatter.maxLength = 17;

    formatter.brand = 'AMEX';
  } else if (/^4\d{0,15}$/.test(value)) {
    // visa, 16 digits
    formatter.formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');

    formatter.maxLength = 19;

    formatter.brand = 'VISA';
  } else if (/^5\d{0,15}$/.test(value)) {
    // mastercard, 16 digits
    formatter.formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');

    formatter.maxLength = 19;

    formatter.brand = 'MASTERCARD';
  } else if (/^\d{0,16}$/.test(value)) {
    // regular cc number, 16 digits
    formatter.formattedValue = value
      .replace(/(\d{4})/, '$1 ')
      .replace(/(\d{4}) (\d{4})/, '$1 $2 ')
      .replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');

    formatter.maxLength = 19;
  }

  return formatter;
}
