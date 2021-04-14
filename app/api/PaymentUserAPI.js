import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/payment-user';

const findPayment = async (id) => {
  return await client.get(`${endpoint}/${id}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findPaymentsByUser = async (uuid) => {
  return await client.get(`${endpoint}/by-user/${uuid}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findDefaultPaymentByUser = async (uuid) => {
  return await client.get(`${endpoint}/default/${uuid}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const updateDefaultPayment = async (data) => {
  return await client.put(`${endpoint}/default`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const updateDisablePayment = async (data) => {
  return await client.patch(`${endpoint}/disable`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default {
  findPayment,
  findPaymentsByUser,
  findDefaultPaymentByUser,
  updateDefaultPayment,
  updateDisablePayment,
};
