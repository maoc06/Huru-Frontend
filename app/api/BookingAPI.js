import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/booking';

const createBookingRequest = async (booking) => {
  return await client.post(endpoint, booking, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default { createBookingRequest };
