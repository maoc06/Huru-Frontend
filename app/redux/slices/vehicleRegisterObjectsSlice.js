import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  makers: [],
  vehicleModels: [],
  transmissions: [],
  odometerRanges: [],
  featuresOptions: [],
  advanceNotices: [],
  minTripOptions: [],
  maxTripOptions: [],
  fuelOptions: [],
};

export const vehicleRegisterObjectsSlice = createSlice({
  name: 'vehicleRegisterObjects',
  initialState,
  reducers: {
    setVehicleOptions: (state, action) => {
      const {
        makers,
        vehicleModels,
        transmissions,
        odometerRanges,
        featuresOptions,
        advanceNotices,
        minTripOptions,
        maxTripOptions,
        fuelOptions,
      } = action.payload;

      state.makers = makers;
      state.vehicleModels = vehicleModels;
      state.transmissions = transmissions;
      state.odometerRanges = odometerRanges;
      state.featuresOptions = featuresOptions;
      state.advanceNotices = advanceNotices;
      state.minTripOptions = minTripOptions;
      state.maxTripOptions = maxTripOptions;
      state.fuelOptions = fuelOptions;
    },
  },
});

export const { setVehicleOptions } = vehicleRegisterObjectsSlice.actions;

export default vehicleRegisterObjectsSlice.reducer;
