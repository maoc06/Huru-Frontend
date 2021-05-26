import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/city';

const findCities = async () => {
  return await client.get(endpoint);
};

export default {
  findCities,
};
