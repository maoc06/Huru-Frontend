import client from './RestClient';

const endpoint = '/auth';

const signUp = (user) => client.post(`${endpoint}/signup`, user);

const signIn = (user) => client.post(`${endpoint}/signin`, user);

const checkEmail = (email) => client.get(`${endpoint}/check-email/${email}`);

const checkDocument = (document) =>
  client.get(`${endpoint}/check-document/${document}`);

const checkPhone = (phone) => client.get(`${endpoint}/check-phone/${phone}`);

export default { signUp, signIn, checkEmail, checkDocument, checkPhone };
