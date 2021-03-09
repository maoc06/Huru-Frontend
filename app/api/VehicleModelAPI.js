import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/car-model';

const getByMaker = (makerId) =>
  client.get(`${endpoint}/by-maker/${makerId}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });

export default { getByMaker };
