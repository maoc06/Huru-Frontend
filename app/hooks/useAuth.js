import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import authStorage from '../utils/storageAuth';
import modeStorage from '../utils/storageMode';
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
    if (modeStorage.getMode()) {
      modeStorage.removeMode();
    }
  };

  return { logIn, logOut };
};

export default useAuth;
