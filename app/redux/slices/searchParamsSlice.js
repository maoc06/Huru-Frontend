import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cityLabel: {},
  dates: {},
  startHour: {},
  endHour: {},
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setCityLabel: (state, action) => {
      state.cityLabel = action.payload;
    },
    setDates: (state, action) => {
      state.dates = action.payload;
    },
    setStartHour: (state, action) => {
      state.startHour = action.payload;
    },
    setEndHour: (state, action) => {
      state.endHour = action.payload;
    },
  },
});

export const {
  setCityLabel,
  setDates,
  setStartHour,
  setEndHour,
} = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
