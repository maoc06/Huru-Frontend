import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: '',
  lastname: '',
  email: '',
  password: '',
  identityDocument: '',
  dateOfBirth: '',
  phone: '',
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
      const { phone } = action.payload;
      state.phone = phone;
    },
  },
});

export const {
  setEmailPassword,
  setPersonalData,
  setPhone,
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
