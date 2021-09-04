import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';

import authReducer from '../slices/authSlice';
import userRegisterReducer from '../slices/userRegisterSlice';
import vehicleRegisterReducer from '../slices/vehicleRegisterSlice';
import vehicleRegisterObjectsReducer from '../slices/vehicleRegisterObjectsSlice';
import searchParamsReducer from '../slices/searchParamsSlice';
import filterSearchReducer from '../slices/filterSearchSlice';
import moodAppSlice from '../slices/moodAppSlice';

// const reducers = combineReducers({
//   auth: authReducer,
//   userRegister: userRegisterReducer,
//   vehicleRegister: vehicleRegisterReducer,
//   vehicleRegisterObjects: vehicleRegisterObjectsReducer,
//   searchParams: searchParamsReducer,
//   filterSearch: filterSearchReducer,
//   moodApp: moodAppSlice,
// });

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

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// export default configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }),
// });
