import axios from 'axios';
import client from './RestClient';

const endpoint = '/auth';

const signUp = async (user) => {
  console.log('user signup - auth api', user);
  const token = await client.post(`${endpoint}/signup`, user);
  await axios.post('/api/verifyRequest/user', { token: { data: token.data } });
  return token;
};

const signIn = (user) => client.post(`${endpoint}/signin`, user);

const signUpGoogle = (token) => client.post(`${endpoint}/signup-google`, token);

const signInGoogle = (token) => client.post(`${endpoint}/signin-google`, token);

const signInFacebook = (email) =>
  client.post(`${endpoint}/signin-facebook`, email);

const checkEmail = (email) => client.get(`${endpoint}/check-email/${email}`);

const checkDocument = (document) =>
  client.get(`${endpoint}/check-document/${document}`);

const checkPhone = (phone) => client.get(`${endpoint}/check-phone/${phone}`);

const sendSms = (phone) => client.get(`${endpoint}/send-verify-sms/${phone}`);

const verifySmsCode = (phone, code) =>
  client.get(`${endpoint}/check-verify-code/${phone}/${code}`);

const verifyEmail = (token) =>
  client.get(`${endpoint}/check-verify-email/${token}`);

export default {
  signUp,
  signIn,
  signUpGoogle,
  signInGoogle,
  signInFacebook,
  checkEmail,
  checkDocument,
  checkPhone,
  sendSms,
  verifySmsCode,
  verifyEmail,
};
