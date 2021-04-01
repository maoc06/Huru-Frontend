import client from './RestClient';
import storageAuth from '../utils/storageAuth';

const endpoint = '/payment';

const savePaymentSourceCard = async (card) => {
  return await client.post(`${endpoint}/source-card`, card, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

const savePaymentSourceNequi = async (nequi) => {
  return await client.post(`${endpoint}/source-nequi`, nequi, {
    headers: { Authorization: `Bearer ${storageAuth.getToken()}` },
  });
};

export default { savePaymentSourceCard, savePaymentSourceNequi };
