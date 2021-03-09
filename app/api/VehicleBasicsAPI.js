import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/car-basics';

const getVehicleModels = async () => {
  return await client.get(`${endpoint}/car-models`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getTransmissions = async () => {
  return await client.get(`${endpoint}/transmissions`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getOdometerRanges = async () => {
  return await client.get(`${endpoint}/odometer-range`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getFeaturesOptions = async () => {
  return await client.get(`${endpoint}/features-opts`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getAdvanceNotices = async () => {
  return await client.get(`${endpoint}/advance-notice`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getMinTrip = async () => {
  return await client.get(`${endpoint}/min-trip`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const getMaxTrip = async () => {
  return await client.get(`${endpoint}/max-trip`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const insertCarFeatures = async (data) => {
  return await client.post(`${endpoint}/set-car-features`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const insertCarImage = async (data) => {
  return await client.post(`${endpoint}/set-car-image`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const updateOwnerCarImage = async (data) => {
  return await client.put(`${endpoint}/set-owner-car-image`, data, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

export default {
  getVehicleModels,
  getTransmissions,
  getOdometerRanges,
  getFeaturesOptions,
  getAdvanceNotices,
  getMinTrip,
  getMaxTrip,
  insertCarFeatures,
  insertCarImage,
  updateOwnerCarImage,
};
