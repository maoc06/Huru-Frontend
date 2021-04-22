import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/user';

const findUser = (uuid) => client.get(`${endpoint}/${uuid}`);

const findUserReviews = (userId) =>
  client.get(`${endpoint}/reviews/${userId}`, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });

const getAlreadyReviewed = async (bookingId) => {
  return await client.get(`${endpoint}/already-reviewed/${bookingId}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const createUserReview = async (data) => {
  return await client.post(`${endpoint}/review`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

export default {
  findUser,
  findUserReviews,
  getAlreadyReviewed,
  createUserReview,
};
