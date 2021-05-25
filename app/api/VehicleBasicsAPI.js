import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/car-basics';

const getVehicleModels = async () => {
  return await client.get(`${endpoint}/car-models`);
};

const getVehicleCategory = async () => {
  return await client.get(`${endpoint}/car-category`);
};

const getTransmissions = async () => {
  return await client.get(`${endpoint}/transmissions`);
};

const getOdometerRanges = async () => {
  return await client.get(`${endpoint}/odometer-range`);
};

const getFeaturesOptions = async () => {
  return await client.get(`${endpoint}/features-opts`);
};

const getAdvanceNotices = async () => {
  return await client.get(`${endpoint}/advance-notice`);
};

const getMinTrip = async () => {
  return await client.get(`${endpoint}/min-trip`);
};

const getMaxTrip = async () => {
  return await client.get(`${endpoint}/max-trip`);
};

const getFuelOptions = async () => {
  return await client.get(`${endpoint}/fuel`);
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

const removeCarImage = async (carImageId) => {
  return await client.delete(`${endpoint}/car-image/${carImageId}`, {
    headers: {
      Authorization: `Bearer ${storageAuth.getToken()}`,
    },
  });
};

export default {
  getVehicleModels,
  getVehicleCategory,
  getTransmissions,
  getOdometerRanges,
  getFeaturesOptions,
  getAdvanceNotices,
  getMinTrip,
  getMaxTrip,
  getFuelOptions,
  insertCarFeatures,
  insertCarImage,
  updateOwnerCarImage,
  removeCarImage,
};
