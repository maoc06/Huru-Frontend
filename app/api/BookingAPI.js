import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/booking';

const findBooking = async (id) => {
  return await client.get(`${endpoint}/${id}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findUpcomingBookings = async (uuid) => {
  return await client.get(`${endpoint}/upcoming/${uuid}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findBookingsHistory = async (uuid) => {
  return await client.get(`${endpoint}/history/${uuid}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const findBookingRequests = async ({ uuid, limit }) => {
  return await client.get(`${endpoint}/by-owner/${uuid}/${limit}`, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const countCompletedTrips = async (userId) =>
  client.get(`${endpoint}/count-completed-trips/${userId}`);

const countCompletedTripsByCar = async (carId) =>
  client.get(`${endpoint}/count-completed-trips-by-car/${carId}`);

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

const cancelBooking = async (data) => {
  return await client.put(`${endpoint}/cancel`, data, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default {
  createBookingRequest,
  findBooking,
  findUpcomingBookings,
  findBookingsHistory,
  findBookingRequests,
  countCompletedTrips,
  countCompletedTripsByCar,
  confirmBookingRequest,
  cancelBooking,
};
