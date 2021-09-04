import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  place: {},
  dates: {},
};

const isClient = typeof window !== 'undefined';

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setPlace: (state, action) => {
      state.place = action.payload;
      if (isClient)
        localStorage.setItem('place', JSON.stringify(action.payload));
    },
    setDates: (state, action) => {
      const { raw, format } = JSON.parse(action.payload);
      state.dates = { raw, format };
      if (isClient) localStorage.setItem('dates', action.payload);
    },
  },
});

export const { setPlace, setDates } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
