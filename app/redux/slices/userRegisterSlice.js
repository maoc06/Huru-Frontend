import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  about: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  identityDocument: '',
  dateOfBirth: '',
  phone: '',
  profilePhoto: '',
  isPhoneVerified: false,
};

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState,
  reducers: {
    setAbout: (state, action) => {
      state.about = action.payload;
    },
    setEmailPassword: (state, action) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPersonalData: (state, action) => {
      const { name, lastname, birth, cc } = action.payload;
      state.firstName = name;
      state.lastName = lastname;
      state.dateOfBirth = birth;
      state.identityDocument = cc;
    },
    setIdentityDocument: (state, action) => {
      state.identityDocument = action.payload;
    },
    setPhone: (state, action) => {
      const { phoneNumber } = action.payload;
      state.phone = phoneNumber;
    },
    setPhoneVerified: (state, action) => {
      state.isPhoneVerified = action.payload;
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },
  },
});

export const {
  setAbout,
  setEmailPassword,
  setEmail,
  setPersonalData,
  setPhone,
  setPhoneVerified,
  setProfilePhoto,
  setIdentityDocument,
} = userRegisterSlice.actions;

export default userRegisterSlice.reducer;
