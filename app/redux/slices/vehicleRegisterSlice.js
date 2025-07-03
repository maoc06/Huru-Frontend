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
  licensePlateCity: '',
  photos: [],
  price: 0,
  advanceNotice: {},
  minTripDuration: {},
  maxTripDuration: {},
  fuel: {},
  city: {},
  currentStep: 1,
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
      state.fuel = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setDescription: (state, action) => {
      const { description } = action.payload;
      state.description = description;
    },
    setLicensePlate: (state, action) => {
      const licensePlate = action.payload;
      state.licensePlate = licensePlate;
    },
    setLicensePlateCity: (state, action) => {
      const city = action.payload;
      state.licensePlateCity = city;
    },
    setPhotos: (state, action) => {
      state.photos = action.payload;
    },
    setPrice: (state, action) => {
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
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetVehicleRegister: (state) => {
      return initialState;
    },
  },
});

export const {
  setVIN,
  setBasicData,
  setFeatures,
  setFuel,
  setCity,
  setDescription,
  setLicensePlate,
  setLicensePlateCity,
  setPhotos,
  setPrice,
  setAdvanceNotice,
  setMinTripDuration,
  setMaxTripDuration,
  setCurrentStep,
  resetVehicleRegister,
} = vehicleRegisterSlice.actions;

export default vehicleRegisterSlice.reducer;
