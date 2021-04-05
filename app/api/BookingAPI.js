import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/booking';

const findBooking = async (id) => {
  return await client.get(`${endpoint}/${id}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findBookingRequests = async (uuid) => {
  return await client.get(`${endpoint}/by-owner/${uuid}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const createBookingRequest = async (booking) => {
  return await client.post(endpoint, booking, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const confirmBookingRequest = async (confirm) => {
  return await client.put(`${endpoint}/confirm`, confirm, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default { createBookingRequest, findBooking, findBookingRequests, confirmBookingRequest };
