import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  makers: [{ makerId: 1, name: 'audi' }],
  vehicleModels: [
    {
      modelId: 1,
      makerId: 1,
      name: 'a3 sportback',
      numOfSeats: 5,
      transmissionId: 1,
    },
  ],
  transmissions: [
    { transmissionId: 1, name: 'manual' },
    { transmissionId: 2, name: 'automático' },
  ],
  odometerRanges: [
    { odometerRangeId: 1, range: '0-50k Km' },
    { odometerRangeId: 2, range: '50k-100k Km' },
    { odometerRangeId: 3, range: '100k-130k Km' },
    { odometerRangeId: 4, range: '130k+ Km' },
  ],
  featuresOptions: [],
  advanceNotices: [
    { id: 1, name: 'reserva inmediata' },
    { id: 2, name: '6 horas' },
    { id: 3, name: '12 horas' },
    { id: 4, name: '1 día' },
  ],
  minTripOptions: [
    { id: 1, name: '1 día' },
    { id: 2, name: '2 días' },
    { id: 3, name: '3 días' },
    { id: 4, name: '4 días' },
    { id: 5, name: '5 días' },
  ],
  maxTripOptions: [
    { id: 1, name: '5 días' },
    { id: 2, name: '1 semana' },
    { id: 3, name: '2 semanas' },
    { id: 4, name: '1 mes' },
    { id: 5, name: '3 meses' },
    { id: 6, name: 'cualquiera' },
  ],
  fuelOptions: [
    { fuelId: 1, name: 'corriente' },
    { fuelId: 2, name: 'extra' },
    { fuelId: 3, name: 'ACPM' },
    { fuelId: 4, name: 'gas natural' },
    { fuelId: 5, name: 'eléctrico' },
  ],
  citiesOptions: [
    { cityId: 1, name: 'bogotá' },
    { cityId: 2, name: 'medellín' },
    { cityId: 3, name: 'barranquilla' },
    { cityId: 4, name: 'cali' },
    { cityId: 5, name: 'cartagena' },
  ],
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
