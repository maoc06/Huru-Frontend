import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: { Accept: 'application/json' },
});

export default apiClient;
