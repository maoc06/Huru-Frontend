import axios from 'axios';

const baseUri = 'https://graph.facebook.com';
const fields = 'first_name,last_name,middle_name,email';

const getUserInfo = ({ accessToken, userID }) =>
  axios.get(`${baseUri}/${userID}`, {
    params: { fields, access_token: accessToken },
  });

export default { getUserInfo };
