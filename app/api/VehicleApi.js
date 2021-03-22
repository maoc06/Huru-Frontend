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

export default { create, findCar, findByVin, findByLicensePlate };
