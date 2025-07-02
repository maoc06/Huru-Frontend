import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';

import authStorage from '../utils/storageAuth';
import modeStorage from '../utils/storageMode';
import userApi from '../api/UserAPI';
import { setUserAuth } from '../redux/slices/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const logIn = async (authToken) => {
    authStorage.storeToken(authToken);
    const user = jwtDecode(authToken);
    console.log('🔐 Initial user from JWT:', user);
    
    // Fetch complete user profile to get userType and other missing fields
    try {
      const userProfileResponse = await userApi.findUser(user.info.uid);
      console.log('👤 Complete user profile:', userProfileResponse);
      
      if (userProfileResponse && userProfileResponse.data) {
        // Merge JWT user info with complete profile data
        const completeUser = {
          ...user,
          info: {
            ...user.info,
            ...userProfileResponse.data
          }
        };
        console.log('✅ Complete user data:', completeUser);
        
        // Store updated token and dispatch complete user data
        dispatch(setUserAuth(completeUser));
      } else {
        console.log('⚠️ Could not fetch complete profile, using JWT data only');
        dispatch(setUserAuth(user));
      }
    } catch (error) {
      console.error('❌ Error fetching user profile:', error);
      // Fallback to JWT user data if profile fetch fails
      dispatch(setUserAuth(user));
    }
  };

  const logOut = () => {
    authStorage.removeToken();
    if (modeStorage.getMode()) {
      modeStorage.removeMode();
    }
  };

  const refreshUserProfile = async () => {
    const currentUser = authStorage.getUser();
    if (!currentUser) {
      console.log('❌ No user found to refresh');
      return null;
    }

    try {
      console.log('🔄 Refreshing user profile for:', currentUser.info.uid);
      const userProfileResponse = await userApi.findUser(currentUser.info.uid);
      
      if (userProfileResponse && userProfileResponse.data) {
        const updatedUser = {
          ...currentUser,
          info: {
            ...currentUser.info,
            ...userProfileResponse.data
          }
        };
        
        console.log('✅ User profile refreshed:', updatedUser);
        dispatch(setUserAuth(updatedUser));
        return updatedUser;
      }
    } catch (error) {
      console.error('❌ Error refreshing user profile:', error);
      return null;
    }
  };

  return { logIn, logOut, refreshUserProfile };
};

export default useAuth;
