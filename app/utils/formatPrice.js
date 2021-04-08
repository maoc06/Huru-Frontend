export default function formatPrice({
  price,
  locale = 'es-CO',
  currency = 'COP',
  currencyDisplay = 'code',
}) {
  price = price.toString().replace(/[\D\s\._\-]+/g, '');
  price = price ? parseInt(price, 10) : 0;
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  const res = formatter.format(price);

  return res.replace(/\./g, ',');
}
