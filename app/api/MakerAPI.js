import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/maker';

const getMakers = async () => {
  return await client.get(endpoint, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default { getMakers };
