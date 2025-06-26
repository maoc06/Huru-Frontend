import jwtDecode from 'jwt-decode';

const key = 'accessToken';

const storeToken = (authToken) => {
  try {
    localStorage.setItem(key, JSON.stringify(authToken));
  } catch (error) {
    console.error('Error storing the token', error);
  }
};

const getToken = () => {
  try {
    const token = localStorage.getItem(key);
    console.log('👉 token', JSON.parse(token));
    return JSON.parse(token);
  } catch (error) {
    console.error('Error getting the token', error);
  }
};

const getUser = () => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = () => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing the token', error);
  }
};

export default { getUser, getToken, storeToken, removeToken };
