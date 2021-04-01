import client from './RestClient';

const endpoint = '/user';

const findUser = (uuid) => client.get(`${endpoint}/${uuid}`);

export default {
  findUser,
};
