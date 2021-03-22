export default function formatPrice(price, locale = 'es-CO', currency = 'COP') {
  price = price.replace(/[\D\s\._\-]+/g, '');
  price = price ? parseInt(price, 10) : 0;
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
  });
  const res = formatter.format(price);
  return res;
}
