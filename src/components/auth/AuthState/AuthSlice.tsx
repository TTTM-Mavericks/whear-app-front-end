import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string;
  password: string;
  isOpen: boolean;
}

const initialState: AuthState = {
  email: '',
  password: '',
  isOpen: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    moveToForgotPassword: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    setEmailSignIned: (state, action: PayloadAction<{ email: string }>) => {
      state.email = action.payload.email;
    },
    setOpenPolicy: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { signIn, moveToForgotPassword, setEmailSignIned } = authSlice.actions;
export default authSlice.reducer;
