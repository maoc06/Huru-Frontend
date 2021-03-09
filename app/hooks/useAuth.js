import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import authStorage from '../utils/storageAuth';
import { setUserAuth } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = (authToken) => {
    authStorage.storeToken(authToken);
    const user = jwtDecode(authToken);
    dispatch(setUserAuth(user));
  };

  const logOut = () => {
    authStorage.removeToken();
  };

  return { logIn, logOut };
};

export default useAuth;
