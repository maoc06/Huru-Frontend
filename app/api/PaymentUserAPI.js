import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/payment-user';

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

export default { findPaymentsByUser, findDefaultPaymentByUser };
