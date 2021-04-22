import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/car';

const create = async (data) => {
  return await client.post(`${endpoint}`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findCar = async (carId) => {
  return await client.get(`${endpoint}/${carId}`);
};

const findByOwner = async (uid) => {
  return await client.get(`${endpoint}/by-user/${uid}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findByVin = async (vin) => {
  return await client.get(`${endpoint}/by-vin/${vin}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findByLicensePlate = async (licensePlate) => {
  return await client.get(`${endpoint}/by-license/${licensePlate}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const updateBookingTerms = async (data) => {
  return await client.patch(`${endpoint}/booking-terms`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const updateDisable = async (data) => {
  return await client.patch(`${endpoint}/disable`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const updateFeatures = async (data) => {
  return await client.put(`${endpoint}/features`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const updateVisibility = async (data) => {
  return await client.patch(`${endpoint}/visibility`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default {
  create,
  findCar,
  findByOwner,
  findByVin,
  findByLicensePlate,
  updateBookingTerms,
  updateDisable,
  updateFeatures,
  updateVisibility,
};
