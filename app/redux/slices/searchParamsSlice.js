import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: {},
  dates: {},
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setPlace: (state, action) => {
      state.place = action.payload;
    },
    setDates: (state, action) => {
      const { raw, format } = JSON.parse(action.payload);

      state.dates = { raw, format };
    },
  },
});

export const { setPlace, setDates } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
