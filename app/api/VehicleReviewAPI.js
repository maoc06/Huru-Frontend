import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/car-review';

const getReviews = async (carId) => {
  return await client.get(`${endpoint}/${carId}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getAlreadyReviewed = async (bookingId) => {
  return await client.get(`${endpoint}/already-reviewed/${bookingId}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getAllReviewsByUser = (userId) =>
  client.get(`${endpoint}/all-by-user/${userId}`);

const insert = async (data) => {
  return await client.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

export default {
  getReviews,
  getAlreadyReviewed,
  getAllReviewsByUser,
  insert,
};
