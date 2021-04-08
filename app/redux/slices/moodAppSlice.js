import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hostMoodEnabled: false,
};

export const moodAppSlice = createSlice({
  name: 'moodApp',
  initialState,
  reducers: {
    switchMood: (state, action) => {
      state.hostMoodEnabled = action.payload;
    },
  },
});

export const { switchMood } = moodAppSlice.actions;

export default moodAppSlice.reducer;
