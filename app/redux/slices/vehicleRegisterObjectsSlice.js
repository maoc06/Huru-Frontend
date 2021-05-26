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
  citiesOptions: [],
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
        citiesOptions,
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
      state.citiesOptions = citiesOptions;
    },
  },
});

export const { setVehicleOptions } = vehicleRegisterObjectsSlice.actions;

export default vehicleRegisterObjectsSlice.reducer;
