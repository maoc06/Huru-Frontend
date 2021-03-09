import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import userRegisterReducer from '../slices/userRegisterSlice';
import vehicleRegisterReducer from '../slices/vehicleRegisterSlice';
import vehicleRegisterObjectsReducer from '../slices/vehicleRegisterObjectsSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    userRegister: userRegisterReducer,
    vehicleRegister: vehicleRegisterReducer,
    vehicleRegisterObjects: vehicleRegisterObjectsReducer,
  },
});
