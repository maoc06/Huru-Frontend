import client from './RestClient';

const endpoint = '/auth';

const signUp = (user) => client.post(`${endpoint}/signup`, user);

const signIn = (user) => client.post(`${endpoint}/signin`, user);

const signUpGoogle = (token) => client.post(`${endpoint}/signup-google`, token);

const signInGoogle = (token) => client.post(`${endpoint}/signin-google`, token);

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
  checkEmail,
  checkDocument,
  checkPhone,
  sendSms,
  verifySmsCode,
  verifyEmail,
};
