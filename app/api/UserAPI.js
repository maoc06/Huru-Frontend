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

const updateData = async (data) => {
  return await client.put(`${endpoint}/`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

const updatePassword = async (data) => {
  return await client.patch(`${endpoint}/password`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

const updatePhone = async (data) => {
  return await client.patch(`${endpoint}/phone`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

const updateProfilePic = async (data) => {
  return await client.patch(`${endpoint}/pic`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const uploadProfilePic = (data) => client.post(`${endpoint}/profile-pic`, data);

export default {
  findUser,
  findUserReviews,
  getAlreadyReviewed,
  createUserReview,
  updateData,
  updatePassword,
  updatePhone,
  updateProfilePic,
  uploadProfilePic,
};
