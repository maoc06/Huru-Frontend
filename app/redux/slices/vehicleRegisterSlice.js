import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vin: '',
  maker: {},
  model: {},
  year: {},
  transmission: {},
  odometer: {},
  features: [],
  description: '',
  licensePlate: '',
  photos: [],
  price: 0,
  advanceNotice: {},
  minTripDuration: {},
  maxTripDuration: {},
  fuel: {},
};

export const vehicleRegisterSlice = createSlice({
  name: 'vehicleRegister',
  initialState,
  reducers: {
    setVIN: (state, action) => {
      const { vin } = action.payload;
      state.vin = vin;
    },
    setBasicData: (state, action) => {
      const { maker, model, year, transmission, odometer } = action.payload;
      state.maker = maker;
      state.model = model;
      state.year = year;
      state.transmission = transmission;
      state.odometer = odometer;
    },
    setFeatures: (state, action) => {
      state.features = action.payload;
    },
    setFuel: (state, action) => {
      console.log('fuel selected', action.payload);
      state.fuel = action.payload;
    },
    setDescription: (state, action) => {
      const { description } = action.payload;
      state.description = description;
    },
    setLicensePlate: (state, action) => {
      const { licensePlate } = action.payload;
      state.licensePlate = licensePlate;
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setPrice: (state, action) => {
      // const { price } = action.payload;
      state.price = action.payload;
    },
    setAdvanceNotice: (state, action) => {
      state.advanceNotice = action.payload;
    },
    setMinTripDuration: (state, action) => {
      state.minTripDuration = action.payload;
    },
    setMaxTripDuration: (state, action) => {
      state.maxTripDuration = action.payload;
    },
  },
});

export const {
  setVIN,
  setBasicData,
  setFeatures,
  setFuel,
  setDescription,
  setLicensePlate,
  setPhotos,
  setPrice,
  setAdvanceNotice,
  setMinTripDuration,
  setMaxTripDuration,
} = vehicleRegisterSlice.actions;

export default vehicleRegisterSlice.reducer;
