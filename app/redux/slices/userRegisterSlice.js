import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastname: '',
  email: '',
  password: '',
  identityDocument: '',
  dateOfBirth: '',
  phone: '',
  isPhoneVerified: false,
};

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    setEmailPassword: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    setPersonalData: (state, action) => {
      const { name, lastname, birth, cc } = action.payload;
      state.firstName = name;
      state.lastName = lastname;
      state.dateOfBirth = birth;
      state.identityDocument = cc;
    },
    setPhone: (state, action) => {
      const { phoneNumber } = action.payload;
      state.phone = phoneNumber;
    },
    setPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
  },
});

export const {
  setEmailPassword,
  setPersonalData,
  setPhone,
  setPhoneVerified,
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
