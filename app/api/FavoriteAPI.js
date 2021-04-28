import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/favorite';

const findByUser = (userId) =>
  client.get(`${endpoint}/by-user/${userId}`, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });

const createFavorite = async (data) => {
  return await client.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

const removeFavorite = async ({ addedBy, carId }) => {
  return await client.delete(`${endpoint}/${addedBy}/${carId}`, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

export default { findByUser, createFavorite, removeFavorite };
