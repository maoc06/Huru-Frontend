import client from './RestClient';

const endpoint = '/search';

const findCarsByCity = async (query, checkIn, checkOut) => {
  return await client.get(
    `${endpoint}/by-city/${query}/${checkIn}/${checkOut}`
  );
};

export default { findCarsByCity };
