import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/authSlice';
import userRegisterReducer from '../slices/userRegisterSlice';
import vehicleRegisterReducer from '../slices/vehicleRegisterSlice';
import vehicleRegisterObjectsReducer from '../slices/vehicleRegisterObjectsSlice';
import searchParamsReducer from '../slices/searchParamsSlice';
import filterSearchReducer from '../slices/filterSearchSlice';
import moodAppSlice from '../slices/moodAppSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    userRegister: userRegisterReducer,
    vehicleRegister: vehicleRegisterReducer,
    vehicleRegisterObjects: vehicleRegisterObjectsReducer,
    searchParams: searchParamsReducer,
    filterSearch: filterSearchReducer,
    moodApp: moodAppSlice,
  },
});
