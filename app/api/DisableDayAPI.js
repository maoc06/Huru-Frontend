import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/disable-day';

const addDisableDay = (disableDay) =>
  client.post(endpoint, disableDay, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });

const removeDisableDay = ({ carId, disableDay }) => {
  client.delete(`${endpoint}/${carId}/${disableDay}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const listByCar = (carId) =>
  client.get(`${endpoint}/by-car/${carId}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });

export default {
  addDisableDay,
  removeDisableDay,
  listByCar,
};
