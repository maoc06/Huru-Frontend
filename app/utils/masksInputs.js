const maskPrice = (price) => {
  const currency = 'COP';

  // Add currency symbol at last
  const priceCurrency = `${price} ${currency}`;
  return priceCurrency;
};

const maskLicensePlate = (license) => {
  const regexFormat = /^(.{3})/g;

  // Add middle space
  const result = license.replace(regexFormat, '$1 $2');
  return result;
};

export { maskPrice, maskLicensePlate };
