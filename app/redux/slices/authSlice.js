import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  exp: '',
  iat: '',
  info: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      const { exp, iat, info } = action.payload;
      state.exp = exp;
      state.iat = iat;
      state.info = info;
    },
  },
});

export const { setUserAuth } = authSlice.actions;

export default authSlice.reducer;
